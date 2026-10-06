const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

class InstagramApiError extends Error {
  constructor(reason) {
    super(reason);
    this.name = "InstagramApiError";
  }
}

function safeUrl(value, allowedDomains) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    const allowed = allowedDomains.some(
      (domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    );
    return url.protocol === "https:" && !url.username && !url.password && !url.port && allowed
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function normalizeMedia(item) {
  if (!item || typeof item.id !== "string" || !/^\d+$/.test(item.id)) return null;
  if (!["IMAGE", "CAROUSEL_ALBUM", "VIDEO"].includes(item.media_type)) return null;
  const imageUrl = safeUrl(
    item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
    ["cdninstagram.com", "fbcdn.net"]
  );
  const permalink = safeUrl(item.permalink, ["instagram.com"]);
  if (!imageUrl || !permalink) return null;
  return {
    media_id: item.id,
    media_type: item.media_type,
    caption: typeof item.caption === "string" ? item.caption : "",
    timestamp: typeof item.timestamp === "string" && Number.isFinite(Date.parse(item.timestamp))
      ? new Date(item.timestamp).toISOString()
      : null,
    permalink,
    imageUrl,
  };
}

async function fetchMedia({ accessToken, accountId, apiVersion = "v25.0", limit = 15, timeoutMs = 10000 }, request = fetch) {
  if (!accessToken) throw new InstagramApiError("не задан INST_ACCESS_TOKEN");
  if (!/^\d+$/.test(accountId || "")) {
    throw new InstagramApiError("не задан корректный INSTAGRAM_ACCOUNT_ID или INSTAGRAM_ID");
  }
  if (!/^v\d+\.\d+$/.test(apiVersion) || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new InstagramApiError("некорректные параметры API");
  }
  const media = new Map();
  const cursors = new Set();
  let after;
  // Follow cursors, never the API's paging.next URL: it can contain the token.
  for (let page = 0; page < 10; page += 1) {
    const url = new URL(`https://graph.facebook.com/${apiVersion}/${accountId}/media`);
    url.searchParams.set("fields", FIELDS);
    url.searchParams.set("limit", String(Math.min(limit, 100)));
    if (after) url.searchParams.set("after", after);
    let response;
    let body;
    try {
      response = await request(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: AbortSignal.timeout(timeoutMs),
        redirect: "error",
      });
      body = await response.json();
    } catch {
      throw new InstagramApiError("сеть недоступна, истёк таймаут или ответ API не является JSON");
    }
    if (body?.error || !response.ok) {
      const code = body?.error?.code;
      if (code === 190 || response.status === 401) {
        throw new InstagramApiError("токен недействителен или истёк; обновите INST_ACCESS_TOKEN");
      }
      if (code === 10 || code === 200 || response.status === 403) {
        throw new InstagramApiError("нет доступа к аккаунту; проверьте права токена и связь Instagram со страницей Facebook");
      }
      throw new InstagramApiError("Meta API вернул ошибку; проверьте ID аккаунта, права и ограничения API");
    }
    if (!Array.isArray(body?.data)) throw new InstagramApiError("неожиданный формат ответа Meta API");
    for (const item of body.data) {
      const normalized = normalizeMedia(item);
      if (normalized) media.set(normalized.media_id, normalized);
      if (media.size >= limit) break;
    }
    if (media.size >= limit || !body.paging?.next) break;
    after = body.paging?.cursors?.after;
    if (typeof after !== "string" || !after || cursors.has(after)) {
      throw new InstagramApiError("некорректная пагинация Meta API");
    }
    cursors.add(after);
  }
  return [...media.values()].slice(0, limit);
}

module.exports = { fetchMedia, InstagramApiError };
