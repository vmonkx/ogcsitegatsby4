import React from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";

import { Link } from "gatsby";
import { motion } from "framer-motion";

const CategoryItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 30px;

  -webkit-mask-image: -webkit-radial-gradient(white, black);
  &:hover {
    box-shadow: ${(props) => `0 8px 32px 0 ${props.gradientstart}`};
    transition: 0.3s ease-in;
    overflow: hidden;

    .category-img {
      transform: scale(1.1);
    }
  }
  a {
    &:focus {
      .category-img {
        transform: scale(1.1);
      }
    }
  }
`;

const CategoryItemStyled = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-rows: 200px 55px;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  background: ${(props) => props.gradientstart};

  .category-title {
    display: flex;
    width: 85%;
    padding: 1rem;

    height: 30%;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(4px);
    background: rgba(255, 255, 255, 0.25);

    border-radius: 30px;

    position: absolute;

    left: 7.5%;

    bottom: 7.5%;
    z-index: 2;

    h3 {
      color: #fff;
      font-weight: 600;
      font-size: 1.15rem;
      flex-grow: 1;
      letter-spacing: -0.7px;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);

      text-align: center;
      margin: 0;
      z-index: 3;
    }
  }

  .category--img-container {
    position: relative;
    overflow: hidden;
    display: flex;

    .category-img {
      flex-grow: 1;
      transition: all 1.2s ease-out;
      overflow: hidden;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
    }

    .category--img-gradient {
      position: absolute;
      top: 70%;
      left: 0;
      right: 0;
      bottom: 0;

      background: ${(props) =>
        `linear-gradient( ${props.gradientend} 0%, ${props.gradientstart} 100%)`};
      z-index: 1;
    }
  }
`;

function CategoryItem({ name, cover, coverColor, slug }) {
  
  return (
    <CategoryItemWrap tabIndex={-1} gradientstart={coverColor.gradientStart}>
      <Link to={slug} tabIndex={0}>
        <CategoryItemStyled
          gradientstart={coverColor.gradientStart}
          gradientend={coverColor.gradientEnd}
        >
          <div className="category--img-container">
            <GatsbyImage className="category-img" image={cover} alt={name} />
            <div className="category--img-gradient"></div>
          </div>

          <div className="category-title">
            <h3>{name}</h3>
          </div>
        </CategoryItemStyled>
      </Link>
    </CategoryItemWrap>
  );
}

export default CategoryItem;
