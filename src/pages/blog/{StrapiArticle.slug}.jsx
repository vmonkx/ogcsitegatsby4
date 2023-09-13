import React from "react";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import ArticleBlog from "../../components/ArticleBlog";
import Layout from "../../components/Layout";

import Seo from "../../components/Seo";

function ArticleBlogTemplate({ data, pageContext, location }) {
  return (
    <Layout>
      <ArticleBlog article={data.strapiArticle} />
    </Layout>
  );
}

export default ArticleBlogTemplate;

export const query = graphql`
  query ($slug: String!) {
    strapiArticle(slug: { eq: $slug }) {
      content {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      description
      id
      slug
      title
      image {
        id
        mime
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              aspectRatio: 1.6
              breakpoints: [750, 1080, 1366, 1920]
              transformOptions: { fit: COVER, cropFocus: ENTROPY }
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      personal {
        description
        specialty
        name
        miniature {
          id
          mime
          url
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                width: 300
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        url
      }
    }
  }
`;

export const Head = ({ location, params, data, pageContext }) => {
  const breadCrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${data.site.siteMetadata?.url}/blog`,
          name: "Новости клиники",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${data.site.siteMetadata?.url}${location.pathname}`,
          name: `${data.strapiArticle.title}`,
        },
      },
    ],
  };

 

  return (
    <Seo
      title={data.strapiArticle.title}
      cover={getSrc(data.strapiArticle.image.localFile)}
      description={data.strapiArticle.description}
      breadCrumbSchema={breadCrumbSchema}
      ogtype="article"
      pathname={location.pathname}
    />
  );
};
