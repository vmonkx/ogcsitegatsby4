import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import quote from "../images/quoteBright.svg";
import rehypeRaw from "rehype-raw";
import Video from "./Video";

const WrapperArticle = styled.article`
  margin-top: 30px;

  blockquote {
    position: relative;
    display: inline-block;
    padding-top: 60px;
    margin: 0;
    font-weight: 600;
    padding-bottom: 20px;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
      background-image: url(${(props) => props.quote});
      background-size: contain;
      background-position: left;
      background-repeat: no-repeat;
    }

    p {
      display: inline;
    }

    @media screen and (min-width: 768px) {
      padding-top: 20px;
      padding-left: 110px;
      padding-bottom: 20px;
    }
  }

  p {
    a {
      position: relative;
      user-select: none;
      cursor: pointer;
      color: ${(props) => props.theme.primaryColor.color400};
      margin: 0;
      font-size: 1rem;
      text-decoration: none;
      font-weight: 600;
      &:hover {
        transition-delay: 0.6s;
        background-image: linear-gradient(
          0deg,
          rgba(249, 81, 110, 1) 0%,
          rgba(205, 2, 107, 1) 100%
        );
        transition: all 0.4s cubic-bezier(0, 0, 0.23, 1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-position: 0%;
        background-size: 340% 100%;
      }
    }
  }

  h2 {
    text-align: center;
    color: ${(props) => props.theme.secondary};
    ${(props) => props.theme.secondaryTextGradient};
  }

  h3 {
    color: ${(props) => props.theme.secondary};
    ${(props) => props.theme.secondaryTextGradient};
  }

  li {
    padding-left: 1.3rem;
    background-image: ${(props) =>
      `url('data:image/svg+xml;utf8,<svg stroke-width="0" fill="${props.theme.marker}" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"></path></svg>')`};
    background-size: 1rem;
    background-repeat: no-repeat;
  }
`;

const ImageWrapper = styled.span`
  display: flex;
  border-radius: 30px;
  margin-bottom: 1rem !important;
  justify-content: center;

  img {
    border-radius: 30px;
    width: 100%;
    height: 100%;
  }

  @media ${(props) => props.theme.media.large} {
    img {
      margin: 0 auto;
      width: 100%;
      height: 100%;
      max-height: 700px;
      object-fit: cover;
    }
  }
`;

const renderers = {
  img: (value) => (
    <ImageWrapper>
      <img src={value.src} alt={value.alt} />
    </ImageWrapper>
  ),
  oembed: (value) => <Video url={value.url} />,
};

function MarkdownArticle({ article }) {
  return (
    <WrapperArticle quote={quote}>
      <ReactMarkdown components={renderers} rehypePlugins={[rehypeRaw]}>
        {article}
      </ReactMarkdown>
    </WrapperArticle>
  );
}

export default MarkdownArticle;
