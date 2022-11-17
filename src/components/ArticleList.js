import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import {
  ArticleCardContainer,
  ArticlesCardsGrid,
  CardAuthorContainer,
  CardContainer,
  CardContentContainer,
  CardImageContainer,
} from "./Styled/ArticlesList";

function ArticleList({ articles }) {
  return (
    <ArticlesCardsGrid>
      {articles.map(({ node }) => (
        <ArticleCardContainer key={node.id}>
          <Link to={`/blog/${node.slug}`}>
            <CardContainer>
              <CardImageContainer>
                <GatsbyImage
                  image={getImage(node.image?.localFile)}
                  alt={node.title}
                />
              </CardImageContainer>
              <CardContentContainer>
                <div className="card-content">
                  <h3 className="card-title">{node.title}</h3>
                  <p className="card-descr">{node.description}</p>

                  <CardAuthorContainer>
                    <div className="author-image">
                      <GatsbyImage
                        image={getImage(node.personal.miniature?.localFile)}
                        alt={node.personal.name}
                      />
                    </div>
                    <div className="author-title">
                      <p className="author-name">{node.personal.name}</p>
                      <p className="author-spec">{node.personal.specialty}</p>
                    </div>
                  </CardAuthorContainer>
                </div>
              </CardContentContainer>
            </CardContainer>
          </Link>
        </ArticleCardContainer>
      ))}
    </ArticlesCardsGrid>
  );
}

export default ArticleList;
