import React from "react";
import { Section } from "./Styled/Section";
import MainAdvantageItem from "./MainAdvantageItem";
import { getImage } from "gatsby-plugin-image";

function MainAdvantages({ advantages }) {
  return (
    <Section>
      {advantages.map((advantage, index) => (
        <MainAdvantageItem
          key={advantage.id}
          image={getImage(advantage.image.localFile)}
          title={advantage.title}
          numbers={advantage.numbersAdvantage?.strapi_json_value}
          content={advantage.content?.data.childMarkdownRemark.html}
          textPosition={index % 2 !== 0 ? "left" : "right"}
        />
      ))}
    </Section>
  );
}

export default MainAdvantages;
