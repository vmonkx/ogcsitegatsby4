import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import styled from "styled-components";

const CompareItemStyled = styled.div`
  grid-column: span 12;
  max-width: 400px;
  display: grid;
  grid-template-rows: 1fr 100px;
  grid-gap: 10px;
  box-shadow: 1px;
  @media ${(props) => props.theme.media.medium} {
    grid-column: span 4;
  }

  img {
    margin-bottom: 0;
  }

  .compare-description {
    text-align: center;
    font-size: 13px;
    color: ${(props) => props.theme.primaryColor.color500};
  }
`;

const isTouchDevice = typeof window !== `undefined` && window.matchMedia("(pointer: coarse)").matches;

function CompareItem({ before, after, description, title }) {
  return (
    <CompareItemStyled>
      <ReactCompareSlider
        boundsPadding={0}
        onlyHandleDraggable={isTouchDevice}
        itemOne={
          <ReactCompareSliderImage alt={`до процедуры ${title}`} src={before} />
        }
        itemTwo={
          <ReactCompareSliderImage
            alt={`после процедуры ${title}`}
            src={after}
          />
        }
        position={50}
        style={{ borderRadius: "30px" }}
      />
      <p className="compare-description">{description}</p>
    </CompareItemStyled>
  );
}

export default CompareItem;
