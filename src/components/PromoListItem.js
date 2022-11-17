import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

const PromoItem = styled.div`
  grid-column: span 12;

  @media screen and (min-width: 763px) {
    grid-column: span 4;
  }

  .promo-wrap {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 763px) {
      grid-column: span 4;
    }

    .promo-cover {
      height: 100%;
      width: 100%;
      max-height: 380px;
      flex-grow: 1;
      border-radius: 30px;
      overflow: hidden;
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      .gatsby-image-wrapper {
        border-radius: 30px;
        box-shadow: 0 0 33px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        transition: ${(props) => props.theme.imageAnim};
      }
    }

    .promo-head {
      padding: 15px 15px;
      flex-grow: 10;
      flex-basis: 70%;
      h3 {
        color: ${(props) => props.theme.secondary};
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
        a {
          color: ${(props) => props.theme.secondary};
        }
      }
    }

    .promo-descr {
      padding: 0px 15px;
      font-size: 0.9rem;

      p {
        margin-bottom: 0.3rem;
      }
    }

    &:hover {
      .gatsby-image-wrapper {
        transform: scale(1.03);
      }
    }
  }
`;

function PromoListItem({ promo }) {
  return (
    <PromoItem>
      <Link to={`/promo/${promo.slug}`}>
        <div className="promo-wrap">
          <div className="promo-cover">
            <GatsbyImage
              image={getImage(promo.image?.localFile)}
              alt={promo.name}
            />
          </div>
          <div className="promo-text">
            <div className="promo-head">
              <h3>{promo.name}</h3>
            </div>
            {promo.description && (
              <div className="promo-descr">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {promo.description.data.childMarkdownRemark.html}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </Link>
    </PromoItem>
  );
}

export default PromoListItem;
