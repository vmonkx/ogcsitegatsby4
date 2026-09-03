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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type StrapiPromo implements Node @infer {
      name: String
      slug: String
      featured: Boolean
      description: StrapiPromoDescription
      article: StrapiPromoArticle
      image: StrapiPromoImage
      seo: StrapiPromoSeo
    }

    type StrapiPromoDescription {
      data: StrapiPromoDescriptionData
    }

    type StrapiPromoDescriptionData {
      data: String
      childMarkdownRemark: MarkdownRemark
    }

    type StrapiPromoArticle {
      data: StrapiPromoArticleData
    }

    type StrapiPromoArticleData {
      data: String
      childMarkdownRemark: MarkdownRemark
    }

    type StrapiPromoImage {
      id: ID
      mime: String
      url: String
      localFile: File @link(by: "id", from: "localFile___NODE")
    }

    type StrapiPromoSeo {
      title: String
      description: String
      shareImage: StrapiPromoImage
      meta: [StrapiPromoSeoMeta]
    }

    type StrapiPromoSeoMeta {
      id: ID
      name: String
      content: String
    }
  `;

  createTypes(typeDefs);
};

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

exports.onPostBuild = async ({ graphql }) => {
  const fs = require('fs');
  const path = require('path');
  const siteUrl = process.env.SITE_URL || 'https://www.ogcclinic.ru';

  // Получаем список популярных услуг из Strapi
  const result = await graphql(`
    {
      allStrapiService(
        filter: { featured: { eq: true } }
        sort: { updatedAt: DESC }
      ) {
        edges {
          node {
            name
            slug
            seo {
              description
            }
          }
        }
      }
    }
  `);

  let popularServicesText = "";
  if (result.data && result.data.allStrapiService) {
    popularServicesText = "## Популярные процедуры\n";
    result.data.allStrapiService.edges.forEach(({ node }) => {
      const description = node.seo && node.seo.description ? `: ${node.seo.description}` : "";
      popularServicesText += `- [${node.name}](${siteUrl}/services/${node.slug}/)${description}\n`;
    });
  }

  const llmsContent = `# OGC Clinic (Клиника доктора Горчаковой)

> Косметологическая клиника экспертного уровня в Казани. Инъекционные и аппаратные технологии премиум-класса, современная диагностика кожи и эстетическая косметология.

## Основные разделы сайта

- [Все услуги](${siteUrl}/services/): Полный каталог процедур аппаратной, инъекционной и эстетической косметологии.
- [Врачи клиники](${siteUrl}/about/): Команда сертифицированных специалистов с высшим медицинским образованием.
- [Цены](${siteUrl}/price/): Актуальный прайс-лист на все виды услуг клиники.
- [Акции](${siteUrl}/promo/): Текущие спецпредложения, скидки на процедуры и подарки для новых пациентов.
- [Отзывы](${siteUrl}/reviews/): Реальные отзывы и оценки процедур от наших пациентов.

${popularServicesText}
## Специализация

- [Аппаратная косметология](${siteUrl}/category/apparatnaya-kosmetologiya/): SMAS-лифтинг (Ulthera System), криолиполиз, лазерное омоложение, микроигольчатый RF-лифтинг, лазерная эпиляция.
- [Инъекционная косметология](${siteUrl}/category/inekcionnaya-kosmetologiya/): Контурная пластика (коррекция и увеличение губ в Казани), ботулинотерапия, биоревитализация, мезотерапия.
- [Эстетическая косметология](${siteUrl}/category/esteticheskaya-kosmetologiya/): Уходы премиум-класса, пилинги, чистки лица.
- [Инновационные методы](${siteUrl}/services/): Укрепление мышц тазового дна на аппарате BTL Emsella, безоперационная коррекция фигуры.

## Ключевые факты

- Отрасль: Медицинская косметология, эстетическая медицина
- Расположение: Казань, Республика Татарстан, Россия
- Лицензия: Официальная медицинская лицензия на осуществление деятельности
- Оборудование: Только оригинальные сертифицированные аппараты мировых брендов (США, Европа) одобренные FDA
- Врачи: Сертифицированные врачи-косметологи с высшим медицинским образованием
- Подход: Сочетание аппаратных и инъекционных методик для естественного омоложения без эффекта «маски»

## Контакты

- Веб-сайт: ${siteUrl}
- Телефон: +7 (843) 206-07-07
- Адрес: Россия, Республика Татарстан, г. Казань, ул. Николая Ершова, 57г
- Социальные сети: Telegram (t.me/ogcclinic), ВКонтакте (vk.com/ogcclinic)
`;

  fs.writeFileSync(path.join(__dirname, 'public', 'llms.txt'), llmsContent);
  console.log("✅ Successfully generated llms.txt in public/ folder with dynamic popular services");
};
