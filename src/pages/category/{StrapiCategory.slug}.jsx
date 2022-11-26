import React from "react";
import { graphql } from "gatsby";
import { getImage, getSrc } from "gatsby-plugin-image";
import Container from "../../components/Container";
import CategoryList from "../../components/CategoryList";
import CategoryItem from "../../components/CategoryItem";
import Layout from "../../components/Layout";
import { SectionMain } from "../../components/Styled/Section";

import NavigationBack from "../../components/NavigationBack";
import Seo from "../../components/Seo";
import HeaderSection from "../../components/HeaderSection";

function CategoryPageTemplate({ pageContext, data }) {
 
  return (
    <Layout>
      <SectionMain>
        <Container>
          <NavigationBack to="/services" title="услугам" />
          <HeaderSection
            title={data.strapiCategory.name}
            descr={data.strapiCategory.description}
          />
          <CategoryList>
            {data.strapiCategory.services.map((service) => (
              <CategoryItem
                key={service.id}
                name={service.name}
                cover={getImage(service.cover.localFile)}
                coverColor={service.coverColor}
                slug={`/services/${service.slug}`}
              />
            ))}
          </CategoryList>
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default CategoryPageTemplate;

export const query = graphql`
  query ($slug: String!) {
    strapiCategory(slug: { eq: $slug }) {
      id
      name
      description
      slug
      services {
        id
        slug
        name
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
        coverColor {
          gradientStart
          gradientEnd
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
          "@id": `${data.site.siteMetadata?.url}/services`,
          name: "Услуги клиники",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${data.site.siteMetadata?.url}${location.pathname}`,
          name: `${data.strapiCategory.name}`,
        },
      },
    ],
  };

  return (
    <Seo
      title={data.strapiCategory.seo?.title}
      description={data.strapiCategory.seo?.description}
      meta={data.strapiCategory.seo?.meta}
      cover={getSrc(data.strapiCategory.seo?.shareImage.localFile)}
      breadCrumbSchema={breadCrumbSchema}
      pathname={location.pathname}
    />
  );
};
