import React from "react";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import HeaderService from "../../components/HeaderService";
import ContentService from "../../components/ContentService";
import ServiceAdvantage from "../../components/ServiceAdvantage";
import ServiceCompareResults from "../../components/ServiceCompareResults";
import { SectionMain, Section } from "../../components/Styled/Section";
import QuickOrder from "../../components/QuickOrder";

import ServiceVideoSection from "../../components/ServiceVideoSection";
import ServicePrice from "../../components/ServicePrice";
import ServiceResults from "../../components/ServiceResults";

import NavigationBack from "../../components/NavigationBack";
import Seo from "../../components/Seo";
import { HeaderSectionStyled } from "../../components/Styled/HeaderStyled";

function ServicePageTemplate({ location, pageContext, data }) {
  const {
    category,
    name,
    advancedContent,
    compareSection,
    resultSection,
    video,
    prices,
  } = data.strapiService;

  return (
    <Layout>
      <SectionMain>
        <Container>
          <NavigationBack
            to={`/category/${category.slug}`}
            title={category.name}
          />
          <HeaderService title={name} />
          <ContentService content={data.strapiService}></ContentService>
          {advancedContent &&
            advancedContent.map((advantage) => (
              <ServiceAdvantage content={advantage} />
            ))}
          <Section>
            {compareSection || resultSection ? (
              <HeaderSectionStyled>
                Результаты процедуры {name}:
              </HeaderSectionStyled>
            ) : null}

            {compareSection && (
              <ServiceCompareResults content={compareSection} title={name} />
            )}
            {resultSection && <ServiceResults content={resultSection} />}
          </Section>

          {video?.map((video, index) => (
            <ServiceVideoSection
              key={video.id}
              content={video}
              right={index % 2 !== 0}
            />
          ))}
          {prices && <ServicePrice content={prices} />}
          <QuickOrder textMessage={`Хочу записаться на процедуру "${name}"`} />
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default ServicePageTemplate;

export const query = graphql`
  query ($slug: String!) {
    strapiService(slug: { eq: $slug }) {
      id
      name
      slug
      article {
        id
        subtitle
        text {
          data {
            text
          }
        }
        image {
          id
          mime
          url
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
      advancedContent {
        title
        listAdvantage {
          id
          text
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
                width: 400
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
      compareSection {
        description
        id
        after {
          id
          mime
          url
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                width: 600
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        before {
          id
          mime
          url
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                width: 600
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
      resultSection {
        description
        id
        image {
          id
          mime
          url
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                width: 600
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }

      video {
        description
        id
        title
        url
      }
      prices {
        id
        title
        priceItem {
          description
          code
          duration
          id
          name
          price
        }
      }
      seo {
        lang
        description
        title
        meta {
          id
          content
          name
        }
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
      category {
        name
        slug
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
  const { strapiService } = data;
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
          name: `${strapiService.name}`,
        },
      },
    ],
  };

  return (
    <Seo
      title={strapiService.seo?.title}
      description={strapiService.seo?.description}
      pathname={location.pathname}
      meta={strapiService.seo?.meta}
      cover={getSrc(strapiService.seo?.shareImage.localFile)}
      breadCrumbSchema={breadCrumbSchema}
    />
  );
};
