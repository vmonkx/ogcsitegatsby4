const test = require("node:test");
const assert = require("node:assert/strict");
const { fetchMedia, InstagramApiError } = require("./client");

const options = { accessToken: "EAA-test-secret", accountId: "17841400000000000" };
const post = (id, extra = {}) => ({
  id,
  media_type: "IMAGE",
  caption: "OGC Clinic",
  timestamp: "2026-10-07T09:00:00+0000",
  permalink: `https://www.instagram.com/p/${id}/`,
  media_url: `https://scontent.cdninstagram.com/${id}.jpg`,
  ...extra,
});
const reply = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });

test("uses Facebook API and a header token; follows cursors, deduplicates and limits posts", async () => {
  const requests = [];
  const results = [
    { data: [post("1")], paging: { next: "https://attacker.example/?access_token=secret", cursors: { after: "cursor-1" } } },
    { data: [post("1"), post("2"), post("3")] },
  ];
  const posts = await fetchMedia({ ...options, limit: 2 }, async (url, init) => {
    requests.push({ url, init });
    return reply(results.shift());
  });
  assert.equal(requests.length, 2);
  for (const { url, init } of requests) {
    assert.equal(url.origin, "https://graph.facebook.com");
    assert.equal(url.pathname, `/v25.0/${options.accountId}/media`);
    assert.equal(url.searchParams.has("access_token"), false);
    assert.equal(init.headers.Authorization, `Bearer ${options.accessToken}`);
    assert.equal(init.redirect, "error");
    assert.ok(init.signal instanceof AbortSignal);
  }
  assert.equal(requests[1].url.searchParams.get("after"), "cursor-1");
  assert.deepEqual(posts.map((item) => item.media_id), ["1", "2"]);
  assert.equal(posts[0].timestamp, "2026-10-07T09:00:00.000Z");
});

test("uses video thumbnails and supports carousel covers and missing captions", async () => {
  const data = [
    post("1", { media_type: "VIDEO", media_url: "https://scontent.cdninstagram.com/1.mp4", thumbnail_url: "https://scontent.fbcdn.net/1.jpg", caption: null }),
    post("2", { media_type: "CAROUSEL_ALBUM", timestamp: "invalid", unexpected: options.accessToken }),
  ];
  const posts = await fetchMedia(options, async () => reply({ data }));
  assert.equal(posts[0].imageUrl, "https://scontent.fbcdn.net/1.jpg");
  assert.equal(posts[0].caption, "");
  assert.equal(posts[1].timestamp, null);
  assert.equal(posts[1].media_type, "CAROUSEL_ALBUM");
  assert.equal(JSON.stringify(posts).includes(options.accessToken), false);
});

test("rejects unsafe media and permalinks before any download", async () => {
  const data = [
    post("1", { media_url: "http://127.0.0.1/private" }),
    post("2", { media_url: "https://cdninstagram.com.attacker.example/file.jpg" }),
    post("3", { media_url: "https://user:password@scontent.fbcdn.net/file.jpg" }),
    post("4", { permalink: "javascript:alert(1)" }),
    post("5", { media_type: "VIDEO", thumbnail_url: null }),
    null,
  ];
  assert.deepEqual(await fetchMedia(options, async () => reply({ data })), []);
});

test("empty accounts return an empty list", async () => {
  assert.deepEqual(await fetchMedia(options, async () => reply({ data: [] })), []);
});

test("invalid credentials or configuration do not make requests", async () => {
  for (const config of [{ accessToken: "" }, { accountId: "../me" }, { apiVersion: "https://example.com" }, { limit: 101 }]) {
    await assert.rejects(fetchMedia({ ...options, ...config }, () => assert.fail("must not request")), InstagramApiError);
  }
});

test("authorization, permission, HTTP and network errors never expose credentials", async () => {
  for (const [code, status] of [[190, 400], [10, 403], [200, 403], [4, 429]]) {
    await assert.rejects(
      fetchMedia(options, async () => reply({ error: { code, message: options.accessToken } }, status)),
      (error) => error instanceof InstagramApiError && !error.message.includes(options.accessToken)
    );
  }
  await assert.rejects(fetchMedia(options, async () => { throw new Error(options.accessToken); }),
    (error) => error instanceof InstagramApiError && !error.message.includes(options.accessToken));
  await assert.rejects(fetchMedia(options, async () => reply({ data: {} })), InstagramApiError);
});

test("repeated or missing pagination cursors cannot loop forever", async () => {
  for (const after of [undefined, "repeated"]) {
    let calls = 0;
    await assert.rejects(fetchMedia(options, async () => {
      calls += 1;
      return reply({ data: [], paging: { next: "https://graph.facebook.com/next", cursors: { after } } });
    }), InstagramApiError);
    assert.ok(calls <= 2);
  }
});
