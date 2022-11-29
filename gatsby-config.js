require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    FAST_DEV: true,
    DEV_SSR: true,
  },
  siteMetadata: {
    title: `Клиника доктора Горчаковой - OGC clinic`,
    description: `OGC clinic—косметологическая клиника экспертного уровня в Казани,мировые инъекционные и аппаратные технологии премиум-класса (лифтинг),современная диагностика кожи,эстетическая косметология,3D-визуализация`,
    author: `Vladislav`,
    url: process.env.SITE_URL,
    lang: "ru",
    locale: "ru_RU",
    themeColor: "#e30277",
    telephone: process.env.GATSBY_PHONE,
    siteUrl: process.env.SITE_URL,
    yandexVerf: process.env.YANDEX_VERF,
    facebookVerf: process.env.FB_VERF,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `OGCclinic site`,
        short_name: `OGCclinic`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#e30277`,
        display: `minimal-ui`,
        icon: `src/images/ogc-icon.png`, // This path is relative to the root of the site.
        icon_options: {
          purpose: `any maskable`,
        },
        cache_busting_mode: "none",
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.API_URL || `http://localhost:1337`,
        accessToken: process.env.API_TOKEN,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [
          `article`,
          `doc`,
          `navigation`,
          `price`,
          {
            singularName: `personal`,
            queryParams: {
              populate: {
                retraining: `*`,
                certificates: `*`,
                stateCertificate: `*`,
                courses: `*`,
                miniature: `*`,
                cover: `*`,
                avatar: `*`,
                services: {
                  populate: `*`,
                },
                seo: {
                  populate: `*`,
                },
              },
            },
          },
          {
            singularName: `promo`,
            queryParams: {
              populate: {
                seo: {
                  populate: `*`,
                },
                image: `*`,
              },
            },
          },
          {
            singularName: `category`,
            queryParams: {
              populate: {
                seo: {
                  populate: `*`,
                },
                coverColor: {
                  populate: `*`,
                },
                cover: {
                  populate: `*`,
                },
                services: {
                  populate: `*`,
                },
              },
            },
          },
          {
            singularName: `service`,
            queryParams: {
              populate: {
                category: {
                  populate: `*`,
                },
                article: {
                  populate: `*`,
                },
                advancedContent: {
                  populate: `*`,
                },
                resultSection: {
                  populate: `*`,
                },
                compareSection: {
                  populate: `*`,
                },
                video: {
                  populate: `*`,
                },
                prices: {
                  populate: `*`,
                },
                seo: {
                  populate: `*`,
                },
                coverColor: {
                  populate: `*`,
                },
                cover: {
                  populate: `*`,
                },
              },
            },
          },
        ],
        singleTypes: [
          {
            singularName: "global",
            queryParams: {
              populate: {
                defaultSeo: {
                  populate: "*",
                },
              },
            },
          },
          `about-page`,
          {
            singularName: `main-page`,
            queryParams: {
              populate: {
                hero: {
                  populate: `*`,
                },
                MainAdvantage: {
                  populate: `*`,
                },
                videoHero: `*`,
              },
            },
          },
        ],
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token: process.env.INSTAGRAM_TOKEN,
        limit: 15,
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "pages",
        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",
        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: {
          profile: "speed",
          // Partial search moving forward

          split: /\s+/,
          tokenize: "reverse",
          encode: function (str) {
            var regexp_replacements = {
              a: /[àáâãäå]/g,
              e: /[èéêë]/g,
              i: /[ìíîï]/g,
              o: /[òóôõöő]/g,
              u: /[ùúûüű]/g,
              y: /[ýŷÿ]/g,
              n: /ñ/g,
              c: /[ç]/g,
              s: /ß/g,
              " ": /[-/]/g,
              "": /['!"#$%&\\()\*+,-./:;<=>?@[\]^_`{|}~]/g,
              " ": /\s+/g,
            };
            str = str.toLowerCase();
            for (var key of Object.keys(regexp_replacements)) {
              str = str.replace(regexp_replacements[key], key);
            }
            return str === " " ? "" : str;
          },
        },
        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          query {
            allStrapiService {
              edges {
                node {
                  id
                  name
                  slug
                  cover {
                    id
                    mime
                    url
                    localFile {
                      childImageSharp {
                        gatsbyImageData(
                          layout: CONSTRAINED
                          placeholder: BLURRED
                          aspectRatio: 1.6
                          formats: [AUTO, WEBP, AVIF]
                        )
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "slug",
        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ["name"],
        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ["slug", "name", "cover", "id"],
        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allStrapiService.edges.map(({ node }) => {
            return {
              name: node.name,
              slug: node.slug,
              cover: node.cover,
              id: node.id,
            };
          }),
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/",
        excludes: [`${process.env.SITE_URL}/test/`],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              // Use cacheFirst since these don't need to be revalidated (same RegExp
              // and same reason as above)
              urlPattern: /(\.js$|\.css$|static\/)/,
              handler: `CacheFirst`,
            },
            {
              // page-data.json files, static query results and app-data.json
              // are not content hashed
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: `NetworkFirst`,
            },
            {
              // Add runtime caching of various other page resources
              urlPattern:
                /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: `StaleWhileRevalidate`,
            },
            {
              // Google Fonts CSS (doesn't end in .css so we need to specify it)
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: `StaleWhileRevalidate`,
            },
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GA_TRACKING_ID,

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: process.env.SITE_URL,
        stripQueryString: true,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: process.env.SITE_URL,
        sitemap: `${process.env.SITE_URL}/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-htaccess",
      options: {
        https: true,
        www: true,

        host: `www.${process.env.SITE}`, // if 'www' is set to 'false', be sure to also remove it here!
        redirect: [
          "RewriteRule ^not-existing-url/?$ /existing-url [R=301,L,NE]",
          {
            from: "gorchakova-clinic.ru",
            to: process.env.SITE,
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
