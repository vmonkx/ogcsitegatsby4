import { useStaticQuery, graphql } from "gatsby";
import React from "react";
import Container from "./Container";

import InstagramList from "./InstagramList";
import { ButtonSecondary } from "./Styled/Button";
import { HeaderSectionStyled } from "./Styled/HeaderStyled";
import { Section } from "./Styled/Section";
import { WrapperActionSection } from "./Styled/WrapperActionSection";

function InstagramSection() {
  const data = useStaticQuery(query);
  const { allInstagramContent } = data;
  return (
    <Section>
      <Container>
        <HeaderSectionStyled>OGC clinic в социальных сетях</HeaderSectionStyled>
        <InstagramList posts={allInstagramContent.edges} />
        <WrapperActionSection>
          <div className="button-container">
            <a
              href="https://www.instagram.com/ogcclinic/"
              target="_blank"
              rel="noopener noreferrer"
              title="Подписаться"
            >
              <ButtonSecondary>Подписаться</ButtonSecondary>
            </a>
          </div>
        </WrapperActionSection>
      </Container>
    </Section>
  );
}

export default InstagramSection;

const query = graphql`
  query {
    allInstagramContent {
      edges {
        node {
          id
          permalink
          caption
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                aspectRatio: 1
              )
            }
          }
        }
      }
    }
  }
`;
