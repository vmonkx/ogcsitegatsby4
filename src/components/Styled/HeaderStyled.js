import styled, { css } from "styled-components";

const HeaderStyled = css`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.05rem;
  color: ${(props) => props.theme.primaryColor.color400};
`;

const HeaderSectionStyled = styled.h2`
  ${HeaderStyled};
  margin-bottom: 2.5rem;

  background: linear-gradient(to left, #bdc3c7, #6c697c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const HeaderCategory = styled.h2`
  position: relative;
  width: 100%;
  color: ${(props) => props.theme.secondary};
  ${(props) => props.theme.secondaryTextGradient}

  margin-bottom: 3.1rem;

  &::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 100%;
    height: 1.2px;
    background: ${(props) => props.theme.primaryColor.color500};
    @media ${(props) => props.theme.media.medium} {
      bottom: -7px;
    }
  }
`;

const HeaderModal = styled.h2`
  ${HeaderStyled};
  margin-bottom: 2.5rem;
  background: linear-gradient(to left, #bdc3c7, #6c697c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export { HeaderSectionStyled, HeaderCategory, HeaderModal };
