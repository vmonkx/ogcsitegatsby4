const test = require("node:test");
const assert = require("node:assert/strict");
const { sourceNodes } = require("./source");
const { InstagramApiError } = require("./client");
const { createSchemaCustomization } = require("./gatsby-node");

const options = { accessToken: "EAA-test-secret", accountId: "17841400000000000" };
function context() {
  const nodes = [], warnings = [], messages = [];
  return {
    nodes, warnings, messages,
    actions: { createNode: (node) => nodes.push(node) },
    createNodeId: (value) => value,
    createContentDigest: (value) => JSON.stringify(value),
    getCache: () => ({}),
    reporter: { warn: (value) => warnings.push(value), info: (value) => messages.push(value) },
  };
}

test("keeps the GraphQL schema queryable when the API returns no nodes", () => {
  let types;
  createSchemaCustomization({ actions: { createTypes: (value) => { types = value; } } });
  assert.match(types, /InstagramContent implements Node @dontInfer/);
  assert.match(types, /timestamp: Date/);
  assert.match(types, /localFile: File @link/);
});

test("creates existing UI-compatible nodes with downloaded covers and no credentials", async () => {
  const gatsby = context();
  const downloads = [];
  const media = [{ media_id: "1", media_type: "IMAGE", caption: "", permalink: "https://www.instagram.com/p/1/", timestamp: null, imageUrl: "https://scontent.fbcdn.net/1.jpg" }];
  await sourceNodes(gatsby, options, {
    fetchMedia: async () => media,
    createRemoteFileNode: async (args) => { downloads.push(args); return { id: "file-1" }; },
  });
  assert.equal(downloads[0].parentNodeId, `instagram-media-${options.accountId}-1`);
  assert.equal(gatsby.nodes[0].localFile___NODE, "file-1");
  assert.equal(gatsby.nodes[0].internal.type, "InstagramContent");
  assert.equal(gatsby.nodes[0].imageUrl, undefined);
  assert.equal(JSON.stringify(gatsby.nodes).includes(options.accessToken), false);
  assert.equal(gatsby.warnings.length, 0);
});

test("API failures keep the build running without exposing raw errors", async () => {
  for (const error of [new Error(options.accessToken), new InstagramApiError("токен истёк")]) {
    const gatsby = context();
    await sourceNodes(gatsby, options, {
      fetchMedia: async () => { throw error; },
      createRemoteFileNode: () => assert.fail("must not download"),
    });
    assert.equal(gatsby.nodes.length, 0);
    assert.equal(gatsby.warnings.length, 1);
    assert.equal(gatsby.warnings.join("").includes(options.accessToken), false);
  }
});

test("one failed download skips that post and keeps the remaining posts", async () => {
  const gatsby = context();
  await sourceNodes(gatsby, options, {
    fetchMedia: async () => ["1", "2"].map((media_id) => ({ media_id, imageUrl: `https://scontent.fbcdn.net/${media_id}.jpg` })),
    createRemoteFileNode: async ({ url }) => {
      if (url.endsWith("1.jpg")) throw new Error(options.accessToken);
      return { id: "file-2" };
    },
  });
  assert.equal(gatsby.nodes.length, 1);
  assert.equal(gatsby.nodes[0].media_id, "2");
  assert.equal(gatsby.warnings.join("").includes(options.accessToken), false);
});
