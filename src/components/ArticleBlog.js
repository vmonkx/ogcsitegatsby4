import React from "react";
import styled, { keyframes } from "styled-components";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import Container from "./Container";
import { SectionMain } from "./Styled/Section";
import MarkdownArticle from "./MarkdownArticle";
import Video from "./Video";
import NavigationBack from "./NavigationBack";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  padding: 70px 30px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02), 0 4px 16px rgba(0, 0, 0, 0.04), 0 12px 32px rgba(0, 0, 0, 0.04);
  position: relative;

  > * {
    opacity: 0;
    animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  > *:nth-child(1) { animation-delay: 0ms; }
  > *:nth-child(2) { animation-delay: 60ms; }
  > *:nth-child(3) { animation-delay: 120ms; }
  > *:nth-child(4) { animation-delay: 180ms; }
  > *:nth-child(5) { animation-delay: 240ms; }
  > *:nth-child(6) { animation-delay: 300ms; }
`;

const BannerWrapper = styled.div`
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  background-color: #f8f9fa;

  ${(props) =>
    props.$isPortrait
      ? `
    height: 480px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${props.theme.media?.small || "screen and (min-width: 590px)"} {
      height: 540px;
    }

    @media ${props.theme.media?.medium || "screen and (min-width: 767px)"} {
      height: 600px;
    }

    @media ${props.theme.media?.large || "screen and (min-width: 960px)"} {
      height: 650px;
    }
  `
      : `
    height: auto;
  `}
`;

const BlurredBackground = styled.div`
  position: absolute;
  inset: -30px;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
  filter: blur(28px) brightness(0.85) saturate(1.15);
  opacity: 0.7;
  transform: scale(1.15);
  pointer-events: none;
  z-index: 1;
`;

const MainImageWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: ${(props) => (props.$isPortrait ? "100%" : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$isPortrait
      ? `
    padding: 16px;
    .gatsby-image-wrapper {
      height: 100% !important;
      max-height: 100%;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22), 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  `
      : `
    .gatsby-image-wrapper {
      width: 100%;
      height: auto;
      display: block;
    }
  `}
`;

const HeaderArticle = styled.h1`
  font-size: 2.1rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-align: center;
  ${(props) => props.theme.primaryTextGradient};
  margin: 0;
  margin-bottom: 15px;
  @media ${(props) => props.theme.media.medium} {
    font-size: 3rem;
  }
`;

const DescrArticle = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.secondary};
  text-align: center;
  ${(props) => props.theme.secondaryTextGradient};
  margin: 0;
  @media ${(props) => props.theme.media.medium} {
    font-size: 1.2rem;
  }
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 2.5rem 0;

  @media ${(props) => props.theme.media.large} {
    margin: 3.5rem 0;
  }

  .author-image {
    width: 64px;
    height: 64px;
    flex-shrink: 0;

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      -webkit-mask-image: -webkit-radial-gradient(white, black);
    }
  }

  .author-title {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .author-name {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0;
    }

    .author-spec {
      font-size: 0.95rem;
      color: ${(props) => props.theme.secondary};
      margin: 0;
    }

    @media ${(props) => props.theme.media.medium} {
      .author-name {
        font-size: 1.3rem;
      }

      .author-spec {
        font-size: 1rem;
      }
    }
  }
`;

function ArticleBlog({ article }) {
  const imageData = getImage(article.image?.localFile);
  const isPortrait = imageData ? imageData.height > imageData.width : false;
  const bgUrl = getSrc(article.image?.localFile) || article.image?.url;

  return (
    <SectionMain>
      <Container>
        <NavigationBack to={`/blog/`} title="блог" />
        <Wrapper>
          <HeaderArticle>{article.title}</HeaderArticle>
          <DescrArticle>{article.description}</DescrArticle>
          <AuthorWrapper>
            <div className="author-image">
              <GatsbyImage
                image={getImage(article.personal.miniature.localFile)}
                alt={`Автор статьи ${article.personal.name}`}
              />
            </div>
            <div className="author-title">
              <p className="author-name">{article.personal.name}</p>
              <p className="author-spec">{article.personal.specialty}</p>
            </div>
          </AuthorWrapper>
          {imageData && (
            <BannerWrapper $isPortrait={isPortrait}>
              {isPortrait && bgUrl && <BlurredBackground $src={bgUrl} />}
              <MainImageWrapper $isPortrait={isPortrait}>
                <GatsbyImage
                  image={imageData}
                  alt={`Статья - "${article.title}"`}
                  imgStyle={{
                    objectFit: isPortrait ? "contain" : "cover",
                  }}
                />
              </MainImageWrapper>
            </BannerWrapper>
          )}

          <MarkdownArticle
            article={article.content.data.childMarkdownRemark.html}
          />
          {article.video && (
            <Video url={article.video.url} title={article.video.title} />
          )}
        </Wrapper>
      </Container>
    </SectionMain>
  );
}

export default ArticleBlog;
