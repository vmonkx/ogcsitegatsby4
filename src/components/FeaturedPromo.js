import React from "react";
import { graphql } from "gatsby";
import Container from "./Container";

import { Section } from "./Styled/Section";

import { Link, useStaticQuery } from "gatsby";

import { ButtonSecondary } from "./Styled/Button";
import { WrapperActionSection } from "./Styled/WrapperActionSection";
import PromoSliderList from "./PromoSliderList";
import { HeaderSectionStyled } from "./Styled/HeaderStyled";

function FeaturedPromo() {
  const { allStrapiPromo } = useStaticQuery(getFeaturedServices);
  const promos = allStrapiPromo.edges;
  return (
    <Section>
      <Container>
        <HeaderSectionStyled>
          Специальные предложения OGC clinic
        </HeaderSectionStyled>

        <PromoSliderList promotions={promos} />
        <WrapperActionSection>
          <div className="button-container">
            <Link to="/promo" title="Посмотреть все акции">
              <ButtonSecondary>Посмотреть все акции</ButtonSecondary>
            </Link>
          </div>
        </WrapperActionSection>
      </Container>
    </Section>
  );
}

export default FeaturedPromo;

const getFeaturedServices = graphql`
  query {
    allStrapiPromo(filter: { featured: { eq: true } }) {
      edges {
        node {
          name
          slug
          id
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
      }
    }
  }
`;
