import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  position: relative;
  cursor: pointer;
  user-select: none;
  background: none;
  color: ${(props) => props.theme.primary};
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  padding: 0.45rem 1rem;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  transition-property: border-color, background, color, transform, box-shadow;
  transition-duration: 0.15s;
  transition-timing-function: ease;
  line-height: 1.25rem;
  height: 41px;
  min-width: 130px;
  max-width: 130px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.7rem;
  &:hover {
    background-image: linear-gradient(
      -200deg,
      rgba(156, 0, 81, 1) 0%,
      rgba(224, 69, 95, 1) 100%
    );
  }
`;

const ButtonContentStyled = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
`;

const ButtonHightLightBackgroud = styled.span`
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  background: inherit;
  border-radius: 0.375rem;

  background: linear-gradient(
    20deg,
    rgba(205, 2, 107, 1) 0%,
    rgba(249, 81, 110, 1) 40%,
    rgba(205, 2, 107, 1) 70%,
    rgba(249, 81, 110, 1) 100%
  );
  background-size: 400% 100%;
  border: none;
  padding: 0;
  margin: 0;
  animation: backgroundAnim 7s ease-in-out infinite;

  &:after {
    content: "";
    position: absolute;
    background-size: inherit;
    background-image: inherit;
    animation: inherit;
    left: 0;
    right: 0;
    top: 2px;
    height: 100%;
    filter: blur(0.5rem);
  }

  @keyframes backgroundAnim {
    50% {
      background-position: 100% 50%;
      transform: skew(-2deg);
    }
  }
`;

const ButtonTextStyled = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  color: ${(props) => props.theme.white};
  border-radius: 0.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.7rem;
`;

function HightLightButton(props) {
  return (
    <ButtonStyled {...props}>
      <ButtonContentStyled>
        <ButtonHightLightBackgroud></ButtonHightLightBackgroud>
        <ButtonTextStyled>{props.children}</ButtonTextStyled>
      </ButtonContentStyled>
    </ButtonStyled>
  );
}

export default HightLightButton;
