import React from "react";
import styled from "styled-components";

const CubeSpinnerContainer = styled.div`
  flex-grow: 1;
  .spinner {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.secondary};
    position: relative;
    margin: 100px auto;
    animation: sk-rotateplane 1.3s infinite ease-in-out;
  }
  .spinner-text {
    color: #fff;
    margin: auto;
    font-size: 3rem;
    line-height: 3rem;
    letter-spacing: -5.5px;
    animation: sk-rotateplane 1.3s infinite ease-in-out;
  }

  @keyframes sk-rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.secondary};
  position: relative;
  margin: 100px auto;
  animation: sk-rotateplane 1.3s infinite ease-in-out;
`;

function LoadingSpinner() {
  return (
    <CubeSpinnerContainer>
      <Spinner />
    </CubeSpinnerContainer>
  );
}

export default LoadingSpinner;
