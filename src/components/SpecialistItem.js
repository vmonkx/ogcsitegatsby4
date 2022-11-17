import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { LinkStyl } from "./Styled/Link";
import { motion } from "framer-motion";
import { animationSpecialistCard } from "../animations/animations";

const SpecialistItemStyled = styled(motion.div)`
  grid-column: span 12;
  max-height: 530px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px 8px;
  border-radius: 30px;
  box-shadow: 0 0 33px rgba(0, 0, 0, 0.09);
  position: relative;
  transform-origin: 10% 60%;
  @media screen and (min-width: 753px) {
    grid-column: span 6;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    min-height: 257px;
  }

  .personal-image {
    position: relative;
    height: 230px;
    width: 100%;
    @media screen and (min-width: 753px) {
      flex-basis: 40%;
      flex-shrink: 0;
      width: 100%;
    }
  }
  .avatar-wrap {
    flex-grow: 1;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    @media screen and (min-width: 753px) and (max-width: 800px) {
      bottom: 0px;
      left: 5px;
    }
    @media screen and (min-width: 801px) {
      bottom: 0px;
      left: 5px;
    }

    @media screen and (min-width: 1440px) {
      bottom: 0px;
      left: 5px;
    }
  }

  .gatsby-image-wrapper {
    border-radius: 30px;
    margin: 0 auto;
  }
  .personal-info {
    grid-column: 1/3;
    grid-row: 2;
    padding: 20px;

    min-height: 180px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: space-between;

    @media screen and (min-width: 768px) {
      min-height: 230px;
    }
  }

  .personal-name {
    font-size: 1.2rem;
    color: ${(props) => props.theme.primaryColor.color500};
    margin-bottom: 10px;
    @media screen and (min-width: 1440px) {
      font-size: 1.5rem;
    }
  }

  .personal-spec {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${(props) => props.theme.secondary};
    margin-bottom: 10px;
    @media screen and (min-width: 1440px) {
      font-size: 1rem;
    }
  }

  .personal-descr {
    font-size: 0.8rem;
    margin-bottom: 10px;
    @media screen and (min-width: 1440px) {
      font-size: 0.9rem;
    }
  }
`;



function SpecialistItem({ item, index }) {
  return (
    <SpecialistItemStyled
      initial={index % 2 !== 0 ? "offscreenodd" : "offscreeneven"}
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={animationSpecialistCard}
    >
      <div className="personal-image">
        <div className="avatar-wrap">
          <GatsbyImage
            image={getImage(item.avatar.localFile)}
            alt={item.name}
          />
        </div>
      </div>

      <div className="personal-info">
        <h4 className="personal-name">
          <Link to={`/about/${item.slug}`}>{item.name}</Link>
        </h4>
        <p className="personal-spec">{item.specialty}</p>
        <p className="personal-descr">{item.description}</p>
        <LinkStyl to={`/about/${item.slug}`}>Подробнее</LinkStyl>
      </div>
    </SpecialistItemStyled>
  );
}

export default SpecialistItem;
