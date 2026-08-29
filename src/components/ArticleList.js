import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import React from "react";
import {
  ArticleCardContainer,
  ArticlesCardsGrid,
  CardAuthorContainer,
  CardContainer,
  CardContentContainer,
  CardImageContainer,
  CardImageBlurredBackground,
  CardMainImageWrapper,
} from "./Styled/ArticlesList";

function ArticleList({ articles }) {
  return (
    <ArticlesCardsGrid>
      {articles.map(({ node }) => {
        const imageData = getImage(node.image?.localFile);
        const aspectRatio = imageData ? imageData.width / imageData.height : 1.5;
        const isTallOrSquare = aspectRatio < 1.45;
        const bgUrl = getSrc(node.image?.localFile) || node.image?.url;

        return (
          <ArticleCardContainer key={node.id}>
            <Link to={`/blog/${node.slug}`}>
              <CardContainer>
                <CardImageContainer $isPortrait={isTallOrSquare}>
                  {isTallOrSquare && bgUrl && (
                    <CardImageBlurredBackground $src={bgUrl} />
                  )}
                  <CardMainImageWrapper $isPortrait={isTallOrSquare}>
                    {imageData && (
                      <GatsbyImage
                        image={imageData}
                        alt={node.title}
                        imgStyle={{
                          objectFit: isTallOrSquare ? "contain" : "cover",
                        }}
                      />
                    )}
                  </CardMainImageWrapper>
                </CardImageContainer>
                <CardContentContainer>
                  <div className="card-content">
                    <h3 className="card-title">{node.title}</h3>
                    <p className="card-descr">{node.description}</p>

                    <CardAuthorContainer>
                      <div className="author-image">
                        <GatsbyImage
                          image={getImage(node.personal?.miniature?.localFile)}
                          alt={node.personal?.name || ""}
                        />
                      </div>
                      <div className="author-title">
                        <p className="author-name">{node.personal?.name}</p>
                        <p className="author-spec">{node.personal?.specialty}</p>
                      </div>
                    </CardAuthorContainer>
                  </div>
                </CardContentContainer>
              </CardContainer>
            </Link>
          </ArticleCardContainer>
        );
      })}
    </ArticlesCardsGrid>
  );
}

export default ArticleList;
