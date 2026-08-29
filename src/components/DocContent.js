import React from "react";
import styled, { keyframes } from "styled-components";
import Container from "./Container";
import HeaderService from "./HeaderService";
import MarkdownArticle from "./MarkdownArticle";
import { Section } from "./Styled/Section";

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DocsWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;

  article {
    /* Stagger children */
    > * {
      opacity: 0;
      animation: ${fadeSlideUp} 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }
    
    ${Array.from({ length: 40 })
      .map(
        (_, i) => `
      > *:nth-child(${i + 1}) {
        animation-delay: ${i * 0.05}s;
      }
    `
      )
      .join("")}

    h2 {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #8c8f9b;
      text-align: left;
      background: none;
      -webkit-text-fill-color: initial;
      margin-top: 3rem;
      margin-bottom: 0.5rem;
    }

    h2:first-child {
      margin-top: 0;
    }

    p {
      text-align: left;
      font-size: 1.15rem;
      color: #1a1a1e;
      line-height: 1.6;
      margin-bottom: 0;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    p:last-child {
      border-bottom: none;
    }
  }
`;

function DocContent({ doc }) {
  return (
    <Section>
      <Container>
        <HeaderService title={doc.title} />
        <DocsWrapper>
          <MarkdownArticle article={doc.content.data.childMarkdownRemark.html} />
        </DocsWrapper>
      </Container>
    </Section>
  );
}

export default DocContent;
