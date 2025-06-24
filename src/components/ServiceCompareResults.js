import React from "react";
import styled from "styled-components";
import CompareItem from "./CompareItem";
import { getSrc } from "gatsby-plugin-image";


const CompareItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  grid-gap: 25px;
  justify-items: center;
  align-items: end;
`;

function ServiceCompareResults({ content, title }) {
  return (
    <CompareItemContainer>
      {content.map((item) => (
        <CompareItem
          key={item.id}
          before={getSrc(item.before.localFile)}
          after={getSrc(item.after.localFile)}
          title={title}
          description={item.description}
        />
      ))}
    </CompareItemContainer>
  );
}

export default ServiceCompareResults;
