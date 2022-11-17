import React from "react";
import { graphql } from "gatsby";
import Container from "../components/Container";
import HeaderService from "../components/HeaderService";
import Layout from "../components/Layout";

import CategoryList from "../components/CategoryList";

import CategoryItem from "../components/CategoryItem";
import { SectionMain } from "../components/Styled/Section";
import NavigationBack from "../components/NavigationBack";
import Seo from "../components/Seo";
import { getImage } from "gatsby-plugin-image";

function ServicesPage({ data: { allStrapiCategory }, pathname }) {
  const categories = allStrapiCategory.edges;

  return (
    <Layout>
      <SectionMain>
        <Container>
          <NavigationBack to={`/`} title="Главной странице" />
          <HeaderService title="Наши услуги" />
          <CategoryList>
            {categories.map(({ node }) => (
              <CategoryItem
                key={node.id}
                name={node.name}
                cover={getImage(node.cover?.localFile)}
                coverColor={node.coverColor}
                slug={`/category/${node.slug}`}
              />
            ))}
          </CategoryList>
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default ServicesPage;

export const query = graphql`
  query {
    allStrapiCategory(sort: { fields: name, order: ASC }) {
      edges {
        node {
          id
          name
          slug
          cover {
            id
            mime
            url
            localFile {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  aspectRatio: 1.6
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

export const Head = () => (
  <Seo
    title="Наши услуги"
    description="Широкий перечень услуг косметологии в Казани, дерматологии, услуги аппаратной косметологии, услуги эстетической косметологии, уникальные авторские методики, а также лабораторные исследования."
  />
);
