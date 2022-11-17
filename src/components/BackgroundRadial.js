import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: none;
  @media ${(props) => props.theme.media.medium} {
    display: block;
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0;
    .background--section {
      width: 800px;
      height: 800px;
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      z-index: 0;
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#7b22ec",endColorstr="#181818",GradientType=1);
    }

    .background--section__left {
      left: 20px;
      background: radial-gradient(
        circle,
        rgba(205, 10, 109, 0.2) 0,
        rgba(123, 34, 236, 0) 60%,
        rgba(24, 24, 24, 0) 100%
      );
    }

    .background--section__rigth {
      right: 20px;
      background: radial-gradient(
        circle,
        rgba(249, 81, 110, 0.3) 0,
        rgba(123, 34, 236, 0) 60%,
        rgba(24, 24, 24, 0) 100%
      );
    }
  }

  @media ${(props) => props.theme.media.retina} {
    .background--section__left {
      left: -10px;
    }

    .background--section__rigth {
      right: -10px;
    }
  }
`;

function BackgroundRadial({ position }) {
  return (
    <Wrapper>
      <div className="background-section">
        {position === "right" ? (
          <div className="background--section background--section__rigth"></div>
        ) : (
          <div className="background--section background--section__left"></div>
        )}
      </div>
    </Wrapper>
  );
}

export default BackgroundRadial;
