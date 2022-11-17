import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { animationHomeVariant } from "../animations/animations";

const ItemStyled = styled.div`
  min-height: 80px;
  max-width: 300px;
  width: 100%;

  grid-column: 1/3;

  @media only screen and (min-width: 734px) {
    grid-column: initial;
  }

  .itemRightInner {
    .numberedItemCount {
      font-size: 65px;
      font-weight: 700;
      position: relative;
      color: ${(props) => props.theme.secondary};

      line-height: 45px;
      display: block;

      @media only screen and (min-width: 734px) {
        font-size: 75px;
        line-height: 60px;
      }

      @media screen and (min-width: 1024px) {
        font-size: 80px;
        line-height: 65px;
      }

      @media screen and (min-width: 1440px) {
        font-size: 90px;
        line-height: 82px;
      }
    }
    .rightTextContainer {
      position: absolute;
      display: inline-block;

      opacity: 1;
      @media screen and (min-width: 1440px) {
        bottom: 10px;
      }
    }

    .itemHeading {
      color: ${(props) => props.theme.textColor};
      font-size: ${(props) => (props.large ? "1.2rem" : "1rem")};
      font-weight: 500;
      line-height: 1;
    }
  }
`;



function NumberedItem(props) {
  const { header, index, large } = props;

  return (
    <ItemStyled large={large}>
      <div className="itemRightInner">
        <motion.p
          initial="hidden"
          variants={animationHomeVariant}
          whileInView="visible"
          className="numberedItemCount"
        >
          {index < 10 ? `0${index}` : ` ${index}`}
          <span className="rightTextContainer itemHeading">{header}</span>
        </motion.p>
      </div>
    </ItemStyled>
  );
}

export default NumberedItem;
