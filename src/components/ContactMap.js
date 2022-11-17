import React from "react";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useStaticQuery } from "gatsby";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 450px;
`;

function ContactMap() {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "map-pin.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
        }
      }
    }
  `);

  return (
    <Wrapper>
      <YMaps>
        <Map
          style={{ width: "100%", height: "450px" }}
          defaultState={{ center: [55.801175, 49.173891], zoom: 16 }}
        >
          <Placemark
            defaultGeometry={[55.801212, 49.174007]}
            options={{
              iconLayout: "default#image",
              iconImageHref: getSrc(
                data.placeholderImage.childImageSharp.gatsbyImageData
              ),
              iconImageSize: [124, 106],
              iconImageOffset: [-60, -100],
            }}
          />
        </Map>
      </YMaps>
    </Wrapper>
  );
}

export default ContactMap;
