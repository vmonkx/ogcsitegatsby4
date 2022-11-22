import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

import MainAdvantages from "../components/MainAdvantages";
import LastNews from "../components/LastNews";
import FeaturedServices from "../components/FeaturedServices";
import FeaturedPromo from "../components/FeaturedPromo";

import Seo from "../components/Seo";

import VideoHero from "../components/VideoHero";
import { getSrc } from "gatsby-plugin-image";
/* import LazyComponent from "../components/LazyComponent"; */

const IndexPage = ({ data: { strapiMainPage } }) => {
  const { MainAdvantage, videoHero, hero } = strapiMainPage;

  return (
    <Layout>
      <VideoHero
        poster={getSrc(hero.cover.localFile)}
        videoSrc={videoHero.localFile.publicURL}
      />
      <MainAdvantages advantages={MainAdvantage} />
      <FeaturedServices />
      <FeaturedPromo />
      <LastNews />
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
      videoHero {
        localFile {
          publicURL
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
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;

export const Head = () => <Seo />;
