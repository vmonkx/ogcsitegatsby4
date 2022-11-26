import React from "react";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import Layout from "../../components/Layout";
import PromoSingle from "../../components/PromoSingle";

import { SectionMain } from "../../components/Styled/Section";
import Seo from "../../components/Seo";

function promo({ data, location }) {
  return (
    <Layout>
      <SectionMain>
        <PromoSingle promo={data.strapiPromo} />
      </SectionMain>
    </Layout>
  );
}

export default promo;

export const query = graphql`
  query ($slug: String!) {
    strapiPromo(slug: { eq: $slug }) {
      name
      slug
      id
      article {
        data {
          childMarkdownRemark {
            html
          }
        }
      }

      image {
        id
        mime
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              aspectRatio: 1
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      seo {
        description
        title
        shareImage {
          id
          mime
          url
          localFile {
            childImageSharp {
              resize(width: 1200, quality: 90) {
                src
              }
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
          "@id": `${data.site.siteMetadata?.url}/promo`,
          name: "Все акции клиники",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${data.site.siteMetadata?.url}${location.pathname}`,
          name: `${data.strapiPromo.name}`,
        },
      },
    ],
  };

  return (
    <Seo
      title={data.strapiPromo.seo?.title}
      description={data.strapiPromo.seo?.description}
      cover={getSrc(data.strapiPromo.seo?.shareImage.localFile)}
      breadCrumbSchema={breadCrumbSchema}
      pathname={location.pathname}
    />
  );
};
