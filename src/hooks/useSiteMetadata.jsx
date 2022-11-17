import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetaData = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          url
          lang
          locale
          themeColor
          telephone
          yandexVerf
          facebookVerf
        }
      }
      strapiGlobal {
        siteName
        defaultSeo {
          description
          lang
          title
          shareImage {
            id
            mime
            url
            localFile {
              id
              childImageSharp {
                resize(width: 1200, quality: 90) {
                  src
                }
              }
            }
          }
          meta {
            id
            name
            content
          }
        }
      }
    }
  `);

  return { siteMetadata: data.site.siteMetadata, strapi: data.strapiGlobal };
};
