import React from "react";
import { graphql } from "gatsby";
import ArticleList from "../components/ArticleList";
import Container from "../components/Container";
import HeaderService from "../components/HeaderService";
import Layout from "../components/Layout";

import { SectionMain } from "../components/Styled/Section";
import Pagination from "../components/Pagination";
import NavigationBack from "../components/NavigationBack";
import Seo from "../components/Seo";

function BlogPage({ data: { allStrapiArticle }, pageContext }) {
  const articles = allStrapiArticle.edges;
  const { totalCount } = allStrapiArticle;

  return (
    <Layout>
      <SectionMain>
        <Container>
          <NavigationBack to={`/`} title="Главной странице" />
          <HeaderService title="Блог" />
          <ArticleList articles={articles} />
          <Pagination
            pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
            totalCount={totalCount}
            currentPage={pageContext.currentPage || 1}
            skip={pageContext.skip}
            base="/blog"
          />
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default BlogPage;

export const query = graphql`
  query ($skip: Int = 0, $pageSize: Int = 5) {
    allStrapiArticle(skip: $skip, limit: $pageSize) {
      totalCount
      edges {
        node {
          id
          description
          slug
          title
          publishedAt
          image {
            id
            url
            mime
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

export const Head = () => (
  <Seo
    title="Блог OGC clinic"
    description="Новости и главные события OGC clinic - Клиники доктора Горчаковой"
  />
);
