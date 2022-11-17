import React from "react";
import GridItemContent from "./GridItemContent";
import GridItemImage from "./GridItemImage";
import { GridContainerStyled } from "./Styled/GridContainerStyled";

import BackgroundRadial from "./BackgroundRadial";
import { getImage } from "gatsby-plugin-image";

function ContentService(props) {
  const { content } = props;

  return (
    <>
      {content.article.map((par, index) => {
        if (!par.image) {
          return (
            <GridContainerStyled key={par.id}>
              <GridItemContent
                index={index}
                subtitle={par.subtitle}
                text={par.text.data.text}
                horizontal
              />
            </GridContainerStyled>
          );
        } else {
          return (
            <GridContainerStyled key={par.id}>
              <GridItemImage
                image={getImage(par.image.localFile)}
                alt={par.subtitle}
              />
              <GridItemContent
                index={index}
                subtitle={par.subtitle}
                text={par.text.data.text}
              />
              <BackgroundRadial position={index % 2 !== 0 ? "right" : "left"} />
            </GridContainerStyled>
          );
        }
      })}
    </>
  );
}

export default ContentService;
