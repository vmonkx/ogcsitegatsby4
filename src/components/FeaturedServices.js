import React from "react";
import { graphql } from "gatsby";
import Container from "./Container";
import { Section } from "./Styled/Section";
import styled from "styled-components";
import { Link, useStaticQuery } from "gatsby";
import CategoryList from "./CategoryList";
import CategoryItem from "./CategoryItem";
import { ButtonSecondary } from "./Styled/Button";
import { WrapperActionSection } from "./Styled/WrapperActionSection";
import { HeaderSectionStyled } from "./Styled/HeaderStyled";

const FeaturedContainer = styled.div`
  .swiper-container {
    padding: 10px 0;
  }

  .swiper-pagination {
    padding: 5px 0;
  }
  .swiper-pagination-bullet-active {
    background: ${(props) => props.theme.secondary};
  }
`;

function FeaturedServices() {
  const { allStrapiService } = useStaticQuery(getFeaturedServices);
  const services = allStrapiService.edges;
  return (
    <Section>
      <Container>
        <HeaderSectionStyled>
          Популярные процедуры OGCclinic
        </HeaderSectionStyled>

        <FeaturedContainer>
          <CategoryList>
            {services.map(({ node }) => (
              <CategoryItem
                key={node.id}
                name={node.name}
                cover={node.cover.localFile.childImageSharp.gatsbyImageData}
                coverColor={node.coverColor}
                slug={`/services/${node.slug}`}
              />
            ))}
          </CategoryList>
          <WrapperActionSection>
            <div className="button-container">
              <Link to="/services" title="Все процедуры">
                <ButtonSecondary>Все процедуры</ButtonSecondary>
              </Link>
            </div>
          </WrapperActionSection>
        </FeaturedContainer>
      </Container>
    </Section>
  );
}

export default FeaturedServices;

const getFeaturedServices = graphql`
  query {
    allStrapiService(
      filter: { featured: { eq: true } }
      sort: { fields: updatedAt, order: DESC }
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
