import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import styled from "styled-components";
import NumberedItem from "./NumberedItem";
import { HeaderSectionStyled } from "./Styled/HeaderStyled";
import { Section } from "./Styled/Section";

const NumberContainer = styled.div`
  display: flex;
  background: #fdecf0;

  border-radius: 30px;
  margin-top: 80px;

  .row-wrapper {
    padding: 45px 40px;
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.5rem;
    grid-column-gap: 1rem;
    justify-items: center;

    @media ${(props) => props.theme.media.retina} {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .content-image {
    grid-row: 1/2;
    grid-column: 1/3;
    position: relative;
    min-height: 200px;
    width: 100%;

    @media ${(props) => props.theme.media.small} {
      min-height: 250px;
    }

    @media (min-width: 670px) {
      min-height: 310px;
    }

    @media ${(props) => props.theme.media.medium} {
      grid-row: 1/3;
      grid-column: 1;
      min-height: 250px;
    }
  }

  .image-wrap {
    position: absolute;
    top: -80px;
    left: 50%;
    width: 65%;
    border-radius: 30px;
    transform: translate(-50%, 0);
    .gatsby-image-wrapper {
      border-radius: 30px;
    }

    @media ${(props) => props.theme.media.medium} {
      left: 30px;

      top: -80px;
      width: 85%;
      transform: none;
    }

    @media ${(props) => props.theme.media.extraLarge} {
      top: -100px;
      width: 80%;
    }

    @media ${(props) => props.theme.media.retina} {
      top: -100px;
      left: 60px;
      width: 90%;
    }
  }
`;

function ServiceAdvantage({ content }) {
  
  return (
    <Section>
      <HeaderSectionStyled>{content.title}</HeaderSectionStyled>
      <NumberContainer>
        <div className="row-wrapper">
          <div className="content-image">
            <div className="image-wrap">
              <GatsbyImage
                image={getImage(content.image.localFile)}
                alt={content.title}
              />
            </div>
          </div>

          {content.listAdvantage.map((list, index) => (
            <NumberedItem key={list.id} header={list.text} index={index + 1} />
          ))}
        </div>
      </NumberContainer>
    </Section>
  );
}

export default ServiceAdvantage;
