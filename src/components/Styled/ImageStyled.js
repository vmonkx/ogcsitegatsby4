import styled, { css } from "styled-components";

const Image = css`
  height: 100%;
  width: 100%;
  display: block;
  text-align: center;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
`;

const ImageStyled = styled.div`
  ${Image};
  border-radius: ${(props) => props.theme.borderRadius};

  .gatsby-image-wrapper {
    border-radius: 30px;
    box-shadow: 0 0 33px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: ${(props) => props.theme.imageAnim};
  }
`;

const ImageSmallStyled = styled.div`
  ${Image};
  border-radius: 12px;
`;

export { ImageStyled, ImageSmallStyled };
