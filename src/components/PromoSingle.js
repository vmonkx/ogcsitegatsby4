import React from "react";
import styled from "styled-components";

import Container from "../components/Container";
import HeaderService from "../components/HeaderService";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ButtonSecondary } from "../components/Styled/Button";
import { useModalWindow } from "../contexts/ModalProvider";
import NavigationBack from "../components/NavigationBack";

const Hero = styled.div`
  .container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 1.5rem;

    .wrapper-image {
      grid-column: span 12;
      @media screen and (min-width: 753px) {
        grid-column: span 6;
      }

      .gatsby-image-wrapper {
        border-radius: 30px;
      }
    }
    .wrapper-content {
      grid-column: span 12;
      margin-top: 2rem;
      @media screen and (min-width: 753px) {
        grid-column: span 6;
        margin-top: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
      }
      width: 100%;

      a {
        position: relative;
        transition: all 600ms cubic-bezier(0.77, 0, 0.175, 1);
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
        &:after {
          position: absolute;
          display: block;
          transform: scaleX(0);
          bottom: -3px;
          left: 0;
          background: linear-gradient(
            0deg,
            rgba(249, 81, 110, 1) 0%,
            rgba(205, 2, 107, 1) 100%
          );
          width: 100%;
          content: "";
          height: 2px;
          transition: -webkit-transform 250ms ease-in-out;
          transition: transform 250ms ease-in-out;
          transition: transform 250ms ease-in-out,
            -webkit-transform 250ms ease-in-out;
          transform-origin: 100% 50%;
        }

        &:hover:after {
          background-image: linear-gradient(
            0deg,
            rgba(249, 81, 110, 1) 0%,
            rgba(205, 2, 107, 1) 100%
          );
          transform: scaleX(1);
          transform-origin: 0 50%;
        }
      }

      strong {
        color: ${(props) => props.theme.secondary};
      }

      .wrapper-action {
        width: 100%;
        margin-top: 1.5rem;
        display: flex;
        justify-content: flex-start;
      }
    }
  }
`;

const PromoActionButton = styled(ButtonSecondary)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 220px;
  padding: 14px 36px;
  border-radius: 0.375rem;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #ffffff;
  background-image: linear-gradient(135deg, #f9516e 0%, #cd026b 100%);
  box-shadow: 0 8px 24px -4px rgba(205, 2, 107, 0.4);
  transition: transform 160ms ease-out, box-shadow 160ms ease-out,
    background-image 200ms ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px -2px rgba(205, 2, 107, 0.5);
      background-image: linear-gradient(135deg, #fa617c 0%, #e30277 100%);
    }
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 4px 14px rgba(205, 2, 107, 0.3);
  }
`;

const PromoArticleContent = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 2rem;

  p {
    width: 100%;
    font-size: 1rem;
    line-height: 1.65;
    color: #4A4853;
    margin-bottom: 1.2rem;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: ${(props) => props.theme.secondary || "#CD026B"};
      font-weight: 700;
    }
  }

  strong {
    color: ${(props) => props.theme.secondary || "#CD026B"};
    font-weight: 700;
  }

  ul {
    margin: 20px 0;
    padding-left: 0;
    list-style: none;

    li {
      position: relative;
      padding: 12px 12px 12px 2.4rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      line-height: 1.6;
      color: #4A4853;
      border-radius: 10px;
      transition: transform 200ms ease, background-color 200ms ease;

      &::before {
        content: "✓";
        position: absolute;
        top: 0.85rem;
        left: 0.3rem;
        width: 22px;
        height: 22px;
        border-radius: 7px;
        background: linear-gradient(135deg, rgba(249, 81, 110, 0.18) 0%, rgba(205, 2, 107, 0.12) 100%);
        color: #CD026B;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 800;
        box-shadow: inset 0 0 0 1px rgba(205, 2, 107, 0.15);
      }

      &:last-child {
        border-bottom: none;
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          transform: translateX(4px);
          background-color: rgba(255, 255, 255, 0.65);
        }
      }
    }
  }

  ol {
    margin: 20px 0;
    padding-left: 0;
    list-style: none;
    counter-reset: promo-ol-counter;

    li {
      position: relative;
      counter-increment: promo-ol-counter;
      padding-top: 6px;
      padding-left: 0;
      margin-bottom: 20px;
      line-height: 1.6;
      color: #3D3946;

      &:last-child {
        margin-bottom: 0;
      }

      &::before {
        content: counter(promo-ol-counter, decimal-leading-zero);
        position: absolute;
        top: -16px;
        left: -6px;
        font-size: 3.5rem;
        font-weight: 800;
        line-height: 1;
        background: linear-gradient(135deg, rgba(249, 81, 110, 0.22) 0%, rgba(205, 2, 107, 0.08) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        pointer-events: none;
        user-select: none;
        z-index: 0;
      }

      p, strong, span {
        position: relative;
        z-index: 1;
      }
    }
  }

  blockquote {
    position: relative;
    margin: 24px 0 16px 0;
    padding: 8px 16px 8px 20px;
    border-left: 3.5px solid #CD026B;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0 12px 12px 0;

    p {
      font-size: 1.05rem;
      font-weight: 600;
      color: #1F1C27;
      margin: 0;
    }
  }
`;

function PromoSingle({ promo }) {
  const { toggle, setTextMessage } = useModalWindow();

  if (!promo) return null;

  const handleOrderClick = () => {
    setTextMessage(`Хочу воспользоваться акцией: ${promo.name || ""}`);
    toggle();
  };

  const image = promo.image?.localFile ? getImage(promo.image.localFile) : null;
  const articleHtml = promo.article?.data?.childMarkdownRemark?.html || "";

  return (
    <Container>
      <NavigationBack to={`/promo`} title="акциям" />
      <Hero>
        <div className="container">
          {image && (
            <div className="wrapper-image">
              <GatsbyImage
                image={image}
                alt={promo.name || "Акция OGC clinic"}
              />
            </div>
          )}
          <div className="wrapper-content">
            <HeaderService title={promo.name} />
            {articleHtml && (
              <PromoArticleContent>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {articleHtml}
                </ReactMarkdown>
              </PromoArticleContent>
            )}
            <div className="wrapper-action">
              <PromoActionButton onClick={handleOrderClick}>Записаться</PromoActionButton>
            </div>
          </div>
        </div>
      </Hero>
    </Container>
  );
}

export default PromoSingle;
