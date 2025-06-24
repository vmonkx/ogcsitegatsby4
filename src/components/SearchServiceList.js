import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import { ImageSmallStyled } from "./Styled/ImageStyled";
import { LinkStyl } from "./Styled/Link";

const CardSeviceContainerStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 1rem;
`;

const ServiceCardStyled = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

function SearchServiceList({ services }) {
  return (
    <CardSeviceContainerStyled>
      {services.map((service) => {
        return (
          <LinkStyl to={`/services/${service.slug}`} key={service.id}>
            <ServiceCardStyled>
              <ImageSmallStyled>
                <GatsbyImage
                  image={getImage(service.cover.localFile)}
                  alt={service.name}
                />
              </ImageSmallStyled>

              <div>{service.name}</div>
            </ServiceCardStyled>
          </LinkStyl>
        );
      })}
    </CardSeviceContainerStyled>
  );
}

export default SearchServiceList;
