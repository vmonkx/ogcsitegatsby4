import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import ArticleList from "./ArticleList";
import Container from "./Container";

import { ButtonSecondary } from "./Styled/Button";
import { Section } from "./Styled/Section";
import { HeaderSectionStyled } from "./Styled/HeaderStyled";

const WrapperAction = styled.div`
  display: flex;
  justify-content: center;
  .button-container {
    display: block;
  }
`;

function LastNews() {
  const { allStrapiArticle } = useStaticQuery(query);
  const articles = allStrapiArticle.edges;
  return (
    <Section>
      <Container>
        <HeaderSectionStyled>Последние новости OGCclinic</HeaderSectionStyled>
        <ArticleList articles={articles} />
        <WrapperAction>
          <div className="button-container">
            <Link to="/blog" title="Все новости">
              <ButtonSecondary>Все новости</ButtonSecondary>
            </Link>
          </div>
        </WrapperAction>
      </Container>
    </Section>
  );
}

export default LastNews;

const query = graphql`
  query {
    allStrapiArticle(sort: { fields: publishedAt, order: DESC }, limit: 3) {
      edges {
        node {
          id
          description
          slug
          title
          publishedAt
          image {
            id
            mime
            url
            localFile {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  aspectRatio: 1.2
                  transformOptions: { fit: COVER }
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
          personal {
            name
            specialty
            miniature {
              id
              mime
              url
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    width: 200
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;
