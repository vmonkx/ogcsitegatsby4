import React from "react";
import Container from "./Container";
import HeaderService from "./HeaderService";
import MarkdownArticle from "./MarkdownArticle";
import { Section } from "./Styled/Section";

function DocContent({ doc }) {
  return (
    <Section>
      <Container>
        <HeaderService title={doc.title} />
        <MarkdownArticle article={doc.content.data.childMarkdownRemark.html} />
      </Container>
    </Section>
  );
}

export default DocContent;
