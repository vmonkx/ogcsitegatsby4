import React from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion } from "framer-motion";
import { animationBannerVariant } from "../animations/animations";

const HeroContainer = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.3));

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  opacity: 1 !important;
  display: grid;
  overflow: hidden;
  align-content: center;
  padding-top: 60px;

  .wrapper {
    margin-bottom: 1rem;
    // By using the same grid area for both, they are stacked on top of each other
    grid-area: 1/1;
    position: relative;
    // This centers the other elements inside the hero component
    place-items: end center;
    display: grid;
  }

  .banner {
    text-align: center;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
    border-radius: 30px;
  }

  .banner h1.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .banner .visible-title {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    line-height: 1;
    text-align: center;
    margin: 5px auto;
  }

  .banner p {
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    color: #fff;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    margin: 5px auto;
  }

  @media ${(props) => props.theme.media.medium} {
    .banner {
      padding: 0.8rem 1.2rem;
    }

    .banner .visible-title {
      font-size: 24px;
      line-height: 1;
      margin: 10px auto;
    }

    .banner p {
      font-size: 20px;
      line-height: 23px;
      margin: 10px auto;
    }
  }

  @media screen and (min-width: 812px) {
    .banner {
      padding: 0.8rem 1.2rem;
    }

    .banner .visible-title {
      font-size: 24px;
      line-height: 1;
    }
  }

  @media ${(props) => props.theme.media.large} {
    .banner {
      padding: 0.8rem 1.2rem;
      margin-bottom: 5rem;
    }

    .banner .visible-title {
      font-size: 30px;

      line-height: 30px;
    }

    .banner p {
      font-size: 25px;

      line-height: 28px;
    }
  }
`;

const Img = styled(GatsbyImage)`
  max-height: calc(75vh);

  grid-area: 1/1;

  @media ${(props) => props.theme.media.medium} {
    max-height: calc(100vh);
  }

  @media screen and (min-width: 812px) {
    max-height: calc(100vh);
  }

  @media ${(props) => props.theme.media.extraLarge} {
    max-height: calc(90vh);
  }

  @media ${(props) => props.theme.media.retina} {
    max-height: calc(100vh);
  }
`;

function BackgroundHero({ image, title, info }) {
  return (
    <HeroContainer role="banner">
      <Img image={image} alt={`Клиника OGC - ${title} ${info}`} loading="eager" />
      <div className="wrapper">
        <motion.div
          className="banner"
          initial="hidden"
          animate="visible"
          variants={animationBannerVariant}
        >
          <h1 className="visually-hidden">Косметологическая клиника премиум-класса в Казани | OGC Clinic — передовые технологии. {title}</h1>
          <div className="visible-title" aria-hidden="true">{title}</div>
          <p>{info}</p>
        </motion.div>
      </div>
    </HeroContainer>
  );
}

export default BackgroundHero;
