import React from "react";
import { graphql } from "gatsby";
import Container from "../components/Container";
import HeaderService from "../components/HeaderService";
import Layout from "../components/Layout";
import PromoList from "../components/PromoList";
import PromoEmptyState from "../components/PromoEmptyState";

import { SectionMain } from "../components/Styled/Section";
import NavigationBack from "../components/NavigationBack";
import Seo from "../components/Seo";

function promo({ data }) {
  const promos = data?.allStrapiPromo?.edges || [];
  const featuredServices = data?.allStrapiService?.edges?.map((e) => e.node) || [];
  return (
    <Layout>
      <SectionMain>
        <Container>
          <NavigationBack to={`/`} title="Главной странице" />
          <HeaderService title="Акции" />
          {promos.length > 0 ? (
            <PromoList promos={promos} />
          ) : (
            <PromoEmptyState services={featuredServices} />
          )}
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default promo;

export const query = graphql`
  query {
    allStrapiPromo {
      edges {
        node {
          name
          slug
          id
          description {
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
                  formats: [AUTO, WEBP, AVIF]
                  width: 600
                )
              }
            }
          }
        }
      }
    }
    allStrapiService(
      filter: { featured: { eq: true } }
      sort: { updatedAt: DESC }
    ) {
      edges {
        node {
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
                  width: 300
                  height: 200
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
      }
    }
  }
`;

export const Head = ({ location }) => (
  <Seo
    title="Специальные предложения"
    description="Специальные предложения, акции для пациентов клиники доктора Горчаковой - OGC clinic"
    pathname={location.pathname}
  />
);
