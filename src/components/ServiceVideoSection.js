import React from "react";
import styled from "styled-components";

import { GridItemHeader } from "./Styled/GridItemHeader";

import { Section } from "./Styled/Section";
import Video from "./Video";

const Wrapper = styled.div`
  padding-top: 50px;

  @media screen and (min-width: 1440px) {
    padding-top: 150px;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  border-radius: 30px;
  background: #f6f4fc;
  width: 100%;
  min-height: 370px;

  .wrapper {
    padding: 40px 40px;
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    grid-column-gap: 1rem;
    @media screen and (min-width: 560px) {
      grid-gap: 1rem;
    }
  }
`;

const VideoContent = styled.div`
  grid-column: 1/4;
  position: relative;
  

  @media screen and (min-width: 540px) and (max-width: 550px) {
    top: 2rem;
  }
  @media screen and (min-width: 968px) {
    min-height: 200px;
    max-height: 300px;
    grid-column: ${(props) => (props.right ? "2/4" : "1/3")};
  }
`;

const TextContent = styled.div`
  grid-column: 1/4;

  align-self: center;

  @media screen and (min-width: 968px) {
    grid-column: ${(props) => (props.right ? 1 : 3)};
    grid-row: 1;
    ${(props) =>
      props.right ? "padding-right: 10px;" : "padding-left: 10px;"};
  }
`;

const VideoWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 100%;
  background: #fae7e4;

  background: #ee9ca7; /* fallback for old browsers */
  background: linear-gradient(25deg, #ee9ca7, #ffdde1);

  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 0 33px rgba(0, 0, 0, 0.05);
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    overflow: hidden;

    ${(props) => props.theme.glassBackground};
    z-index: 1;
  }

  @media screen and (min-width: 560px) and (max-width: 1023px) {
    position: relative;
    min-height: 300px;
    padding: 40px;
  }
  @media screen and (min-width: 1024px) {
    position: absolute;
    min-height: 300px;
    bottom: 10px;
    padding: 40px;
  }
`;

function ServiceVideoSection({ content, right }) {
  return (
    <Section>
      <Wrapper>
        <VideoContainer>
          <div className="wrapper">
            <VideoContent right={right}>
              <VideoWrapper>
                <Video url={content.url} title={content.title} />
              </VideoWrapper>
            </VideoContent>
            <TextContent right={right}>
              <GridItemHeader>
                <h2>{content.title}</h2>
              </GridItemHeader>
              <p>{content.description}</p>
            </TextContent>
          </div>
        </VideoContainer>
      </Wrapper>
    </Section>
  );
}

export default ServiceVideoSection;
