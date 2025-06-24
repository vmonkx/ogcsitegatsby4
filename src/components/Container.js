import React from "react";
import styled from "styled-components";

const ContainerStyled = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1rem;

  @media ${(props) => props.theme.media.extraLarge} {
    padding: 0;
    max-width: 976px;
  }

  @media ${(props) => props.theme.media.retina} {
    max-width: 1280px;
  }
`;

function Container({ children }) {
  return <ContainerStyled>{children}</ContainerStyled>;
}

export default Container;
