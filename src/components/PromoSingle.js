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
        margin: 0 auto;
      }
    }
  }
`;

function PromoSingle({ promo }) {
  const { toggle } = useModalWindow();
  return (
    <Container>
      <NavigationBack to={`/promo`} title="акциям" />
      <Hero>
        <div className="container">
          <div className="wrapper-image">
            <GatsbyImage
              image={getImage(promo.image.localFile)}
              alt={promo.name}
            />
          </div>
          <div className="wrapper-content">
            <HeaderService title={promo.name} />
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {promo.article.data.childMarkdownRemark.html}
            </ReactMarkdown>
            <div className="wrapper-action">
              <ButtonSecondary onClick={toggle}>Записаться</ButtonSecondary>
            </div>
          </div>
        </div>
      </Hero>
    </Container>
  );
}

export default PromoSingle;
