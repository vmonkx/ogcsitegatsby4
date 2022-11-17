import React from "react";
import styled from "styled-components";

const HeaderServiceStyled = styled.h1`
  font-weight: 700;

  text-align: center;
  font-size: 3rem;
  line-height: 1.35;
  margin-bottom: 2.5rem;

  background: linear-gradient(to left, #bdc3c7, #6c697c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media ${(props) => props.theme.media.retina} {
    font-size: 45px;
    line-height: 49px;
  }
`;

function HeaderService({ title }) {
  return <HeaderServiceStyled>{title}</HeaderServiceStyled>;
}

export default HeaderService;
