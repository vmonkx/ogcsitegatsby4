import React from "react";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { GridItemStyled } from "./Styled/GridItemStyled";
import { GridItemHeader } from "./Styled/GridItemHeader";
import { GridItemTextStyled } from "./Styled/GridItemTextStyled";

function GridItemContent(props) {
  const { index, subtitle, text, horizontal } = props;

  return (
    <GridItemStyled
      className={`padding-4 ${index % 2 !== 0 && "order-1"} ${
        horizontal && "grid-item-horizontal span-col-12 "
      }`}
    >
      <GridItemHeader
        className={horizontal && `${"content-column alter-color"}`}
      >
        <h2>{subtitle}</h2>
      </GridItemHeader>
      <GridItemTextStyled
        className={horizontal && `${"content-column content-offset"}`}
      >
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{text}</ReactMarkdown>
      </GridItemTextStyled>
    </GridItemStyled>
  );
}

export default GridItemContent;
