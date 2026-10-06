const { fetchMedia, InstagramApiError } = require("./client");

async function sourceNodes(gatsby, options, dependencies) {
  const { actions, createNodeId, createContentDigest, getCache, reporter } = gatsby;
  let media;
  try {
    media = await (dependencies.fetchMedia || fetchMedia)(options);
  } catch (error) {
    // Do not log raw errors, request URLs, or API payloads: they may contain credentials.
    const reason = error instanceof InstagramApiError ? error.message : "не удалось получить посты";
    reporter.warn(`[Instagram] ${reason}. Сайт будет собран без ленты Instagram.`);
    return;
  }
  let created = 0;
  for (const { imageUrl, ...post } of media) {
    const id = createNodeId(`instagram-media-${options.accountId}-${post.media_id}`);
    let file;
    try {
      file = await dependencies.createRemoteFileNode({
        url: imageUrl,
        parentNodeId: id,
        getCache,
        createNode: actions.createNode,
        createNodeId,
      });
    } catch {
      reporter.warn(`[Instagram] Не удалось загрузить обложку поста ${post.media_id}; пост пропущен.`);
      continue;
    }
    if (!file) continue;
    const content = { ...post, localFile___NODE: file.id };
    actions.createNode({
      ...content,
      id,
      parent: null,
      children: [],
      internal: {
        type: "InstagramContent",
        contentDigest: createContentDigest(content),
      },
    });
    created += 1;
  }
  reporter.info(`[Instagram] Загружено постов: ${created}.`);
}

module.exports = { sourceNodes };
