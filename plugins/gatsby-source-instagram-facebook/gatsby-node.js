const { sourceNodes } = require("./source");

exports.pluginOptionsSchema = ({ Joi }) => Joi.object({
  accessToken: Joi.string().allow("").optional(),
  accountId: Joi.string().allow("").optional(),
  apiVersion: Joi.string().pattern(/^v\d+\.\d+$/).default("v25.0"),
  limit: Joi.number().integer().min(1).max(100).default(15),
  timeoutMs: Joi.number().integer().min(1).max(60000).default(10000),
});

exports.createSchemaCustomization = ({ actions }) => {
  // An optional feed must keep its schema even with no token, no posts, or an API outage.
  actions.createTypes(`
    type InstagramContent implements Node @dontInfer {
      media_id: String
      media_type: String
      permalink: String
      caption: String
      timestamp: Date @dateformat
      localFile: File @link(by: "id", from: "localFile___NODE")
    }
  `);
};

exports.sourceNodes = (gatsby, options) => sourceNodes(gatsby, options, {
  createRemoteFileNode: require("gatsby-source-filesystem").createRemoteFileNode,
});
