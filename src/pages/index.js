import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

import MainAdvantages from "../components/MainAdvantages";
import LastNews from "../components/LastNews";
import FeaturedServices from "../components/FeaturedServices";
import FeaturedPromo from "../components/FeaturedPromo";

import BackgroundHero from "../components/BackgroundHero";
import Seo from "../components/Seo";
import { getImage } from "gatsby-plugin-image";
import LazyComponent from "../components/LazyComponent";

const IndexPage = ({ data: { strapiMainPage } }) => {
  const { hero, MainAdvantage } = strapiMainPage;

  return (
    <Layout>
      <BackgroundHero
        image={getImage(hero.cover.localFile)}
        title={hero.title}
        info={hero.info}
      />
      <MainAdvantages advantages={MainAdvantage} />
      <FeaturedServices />
      <FeaturedPromo />
      <LastNews />
      <LazyComponent />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    strapiMainPage {
      hero {
        info
        title
        cover {
          id
          mime
          url
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                quality: 90
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
      MainAdvantage {
        title
        id
        content {
          data {
            content
            childMarkdownRemark {
              html
            }
          }
        }
        numbersAdvantage {
          strapi_json_value {
            descr
            number
          }
        }
        image {
          id
          mime
          url
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
                aspectRatio: 1.6
                breakpoints: [750, 1080, 1366, 1920]
                transformOptions: { fit: COVER, cropFocus: ENTROPY }
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;

export const Head = () => <Seo />;
