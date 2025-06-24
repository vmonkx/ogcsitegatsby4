import React from "react";
import styled from "styled-components";
import SpecialistItem from "./SpecialistItem";
import { motion } from "framer-motion";

const SpecialistListStyled = styled(motion.div)`
  padding-top: 80px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 5rem;

  @media ${(props) => props.theme.media.medium} {
    grid-row-gap: 4rem;
  }

  @media ${(props) => props.theme.media.large} {
    grid-row-gap: 6rem;
  }

  @media ${(props) => props.theme.media.retina} {
    grid-column-gap: 4rem;
    grid-row-gap: 5rem;
  }
`;

function SpecialistList({ list }) {
  return (
    <SpecialistListStyled>
      {list.map(({ node }, index) => (
        <SpecialistItem key={node.id} item={node} index={index} />
      ))}
    </SpecialistListStyled>
  );
}

export default SpecialistList;
