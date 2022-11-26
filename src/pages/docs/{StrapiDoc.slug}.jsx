import { graphql } from "gatsby";
import React from "react";
import DocContent from "../../components/DocContent";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import NavigationBack from "../../components/NavigationBack";
import Container from "../../components/Container";
import { SectionMain } from "../../components/Styled/Section";

function DocPageTemplate({ data }) {
  return (
    <Layout>
      <SectionMain>
        <Container>
          <NavigationBack to="/" title="главной странице" />
          <DocContent doc={data.strapiDoc} />
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default DocPageTemplate;

export const query = graphql`
  query ($slug: String!) {
    strapiDoc(slug: { eq: $slug }) {
      id
      slug
      title
      content {
        data {
          childMarkdownRemark {
            html
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
  return <Seo title={data.strapiDoc?.title} pathname={location.pathname} />;
};
