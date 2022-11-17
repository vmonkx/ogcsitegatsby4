import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const ResultItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  .image-wrap {
    width: 100%;

    border-radius: 30px;
    overflow: hidden;
    .gatsby-image-wrapper {
      border-radius: 30px;
      max-height: 500px;
    }
  }

  .descr-wrap {
    width: 100%;
    font-size: 0.8rem;
    text-align: center;
    padding: 20px 10px;
  }
`;

function ResultItem({ item }) {
  return (
    <ResultItemStyled>
      <div className="image-wrap">
        <GatsbyImage
          image={getImage(item.image.localFile)}
          alt={item.description}
        />
      </div>
      <div className="descr-wrap">
        <p>{item.description}</p>
      </div>
    </ResultItemStyled>
  );
}

export default ResultItem;
