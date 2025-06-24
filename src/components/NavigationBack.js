import React from "react";
import { Link } from "gatsby";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import styled from "styled-components";
import { motion } from "framer-motion";

const BackLinkStyled = styled(motion.div)`
  margin-bottom: 2rem;

  a {
    display: inline-block;
  }
  span {
    color: ${(props) => props.theme.primaryColor.color500};
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.4;
    text-anchor: start;
  }

  .icon-back {
    color: ${(props) => props.theme.primaryColor.color500};
    line-height: 1;
    font-size: 1rem;
    margin-right: 5px;
  }
`;

const transition = {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96],
};

function NavigationBack({ to, title }) {
  return (
    <BackLinkStyled
      initial={{ opacity: 0, x: -50, transition }}
      whileInView={{
        x: 0,
        opacity: 1,
        transition: { delay: 1, ...transition },
      }}
      
    >
      <Link to={to}>
        <span className="icon-back">
          <FaArrowLeft />
        </span>
        <span>{`Назад к ${title.toLocaleLowerCase()}`}</span>
      </Link>
    </BackLinkStyled>
  );
}

export default NavigationBack;
