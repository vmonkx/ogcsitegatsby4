/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

/* module.exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type === "StrapiArticle") {
    console.log("NODE", node.MainAdvantage)
    const newPost = {
      ...node,
      id: node.id + "-markdown",
      parent: node.id,
      children: [],
      internal: {
        type: "newPost",
        mediaType: "text/markdown",
        content: node.content,
        contentDigest: crypto
          .createHash(`md5`)
          .update(node.content || " ")
          .digest(`hex`),
      },
    }
    actions.createNode(newPost)
    actions.createParentChildLink({
      parent: node,
      child: newPost,
    })
  }
} */

/* exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  // Type definitions can be provided in SDL
  const typeDefs = `
    type CoverGradient {
      gradientStart: String!
      gradientEnd: String!
    }
  `;
  createTypes(typeDefs);
}; */

/* exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    StrapiCategory: {
      coverColor: {
        type: `CoverGradient`,
        async resolve(source, args, context, info) {
          const color = await getAverageColor(source.cover.url, { width: 50 });

          const colorEnd = [].concat(color.value.slice(0, 3), 0).join(",");
          return {
            gradientStart: color.rgba,
            gradientEnd: `rgba(${colorEnd})`,
          };
        },
      },
    },
    StrapiService: {
      coverColor: {
        type: `CoverGradient`,
        async resolve(source, args, context, info) {
          const color = await getAverageColor(source.cover.url, { width: 50 });

          const colorEnd = [].concat(color.value.slice(0, 3), 0).join(",");
          return {
            gradientStart: color.rgba,
            gradientEnd: `rgba(${colorEnd})`,
          };
        },
      },
    },
    StrapiCategoryServices: {
      coverColor: {
        type: `CoverGradient`,
        async resolve(source, args, context, info) {
          const color = await getAverageColor(source.cover.url, { width: 50 });

          const colorEnd = [].concat(color.value.slice(0, 3), 0).join(",");
          return {
            gradientStart: color.rgba,
            gradientEnd: `rgba(${colorEnd})`,
          };
        },
      },
    },
  });
};
 */
const path = require(`path`);

async function turnArticleIntoPages({ graphql, actions }) {
  const result = await graphql(`
    query {
      allStrapiArticle {
        totalCount
      }
    }
  `);

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(
    result.data.allStrapiArticle.totalCount / pageSize
  );

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/blog/${i + 1}`,
      component: path.resolve(`./src/pages/blog.js`),

      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await turnArticleIntoPages({ graphql, actions });
};
