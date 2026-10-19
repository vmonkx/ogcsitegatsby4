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
  assert.match(types, /OgcInstagramContent implements Node @dontInfer/);
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
  assert.equal(downloads[0].parentNodeId, `ogc-instagram-media-${options.accountId}-1`);
  assert.equal(gatsby.nodes[0].localFile___NODE, "file-1");
  assert.equal(gatsby.nodes[0].internal.type, "OgcInstagramContent");
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


test("sources posts with the legacy type ownership restored from a build cache", async () => {
  const { typeOwnersReducer } = require("gatsby/dist/redux/reducers/type-owners");
  const owner = "gatsby-source-instagram-facebook";
  for (const previousOwner of ["gatsby-source-instagram-all", owner]) {
    let state = {
      pluginsToTypes: new Map([[previousOwner, new Set(["InstagramContent"])]]),
      typesToPlugins: new Map([["InstagramContent", previousOwner]]),
    };
    const gatsby = context();
    gatsby.actions.createNode = (node) => {
      state = typeOwnersReducer(state, {
        type: "CREATE_NODE",
        plugin: { name: owner },
        payload: { ...node, internal: { ...node.internal, owner } },
      });
      gatsby.nodes.push(node);
    };
    await sourceNodes(gatsby, options, {
      fetchMedia: async () => [{ media_id: "1", imageUrl: "https://scontent.fbcdn.net/1.jpg" }],
      createRemoteFileNode: async () => ({ id: "file-1" }),
    });
    assert.equal(gatsby.nodes.length, 1);
    assert.equal(state.typesToPlugins.get("InstagramContent"), previousOwner);
    assert.equal(state.typesToPlugins.get("OgcInstagramContent"), owner);
    assert.ok(gatsby.nodes[0].id.startsWith("ogc-instagram-media-"));
  }
});

test("waits for Gatsby to finish creating a node before completing the source lifecycle", async () => {
  const gatsby = context();
  gatsby.actions.createNode = (node) => new Promise((resolve) => {
    setImmediate(() => { gatsby.nodes.push(node); resolve(); });
  });
  await sourceNodes(gatsby, options, {
    fetchMedia: async () => [{ media_id: "1", imageUrl: "https://scontent.fbcdn.net/1.jpg" }],
    createRemoteFileNode: async () => ({ id: "file-1" }),
  });
  assert.equal(gatsby.nodes.length, 1);
});

test("Gatsby configuration never puts the Instagram credential into plugin options", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  const vm = require("node:vm");
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, "../../gatsby-config.js"), "utf8"), {
    module,
    process: { env: { INST_ACCESS_TOKEN: options.accessToken } },
    require(name) {
      if (name === "dotenv") return { config() {} };
      throw new Error(`Unexpected module: ${name}`);
    },
  });
  const source = module.exports.plugins.find((plugin) => plugin.resolve === "gatsby-source-instagram-facebook");
  assert.ok(source);
  assert.equal(Object.hasOwn(source.options, "accessToken"), false);
  assert.equal(JSON.stringify(source.options).includes(options.accessToken), false);
});
