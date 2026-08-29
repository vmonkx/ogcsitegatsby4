import React from "react";
import { graphql } from "gatsby";
import Accordion from "../components/Accordion";
import Container from "../components/Container";
import HeaderService from "../components/HeaderService";
import Layout from "../components/Layout";

import {
  PriceListContainer,
  PriceHeaderCategory,
  PriceHeaderDescription,
  PriceSectionStyled,
  PriceContentWrap,
  PriceHeaderWrapper,
  PriceHeaderService,
  PriceItemWrap,
} from "../components/Styled/PriceSectionStyled";
import { SectionMain } from "../components/Styled/Section";
import NavigationBack from "../components/NavigationBack";
import { PrimaryLinkStyled } from "../components/Styled/Link";
import Seo from "../components/Seo";

function PricePage({ data: { allStrapiService } }) {
  const categories = allStrapiService.group;

  const getServicePriceList = (prices) => {
    return (
      <div>
        <Accordion items={prices} />
      </div>
    );
  };

  return (
    <Layout>
      <SectionMain>
        <Container>
          <NavigationBack to={`/`} title="Главной странице" />
          <HeaderService title="Стоимость услуг в клинике" />
          <PriceListContainer>
            {categories.map((category, index) => (
              <PriceSectionStyled key={index}>
                <>
                  <PriceHeaderWrapper>
                    <PriceHeaderCategory>
                      {category.fieldValue}
                    </PriceHeaderCategory>
                    <PriceHeaderDescription>
                      Нажмите на название процедуры ниже, чтобы
                      развернуть/свернуть содержимое.
                    </PriceHeaderDescription>
                  </PriceHeaderWrapper>
                  <PriceContentWrap>
                    {category.nodes?.map((service) => (
                      <PriceItemWrap key={service.id}>
                        <PriceHeaderService>
                          <PrimaryLinkStyled to={`/services/${service.slug}`}>
                            {service.name}
                          </PrimaryLinkStyled>
                        </PriceHeaderService>

                        {getServicePriceList(service.prices)}
                      </PriceItemWrap>
                    ))}
                  </PriceContentWrap>
                </>
              </PriceSectionStyled>
            ))}
          </PriceListContainer>
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default PricePage;

export const query = graphql`{
  allStrapiService(sort: {strapi_id: ASC}) {
    group(field: {category: {name: SELECT}}) {
      fieldValue
      nodes {
        id
        name
        slug
        prices {
          id
          title
          priceItem {
            code
            
            id
            duration
            name
            price
          }
        }
      }
    }
  }
}`;

export const Head = ({ location, data: { allStrapiService } }) => {
  const categories = allStrapiService.group;
  let positionCounter = 1;
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": categories.flatMap(category => 
      (category.nodes || []).flatMap(service =>
        (service.prices || []).flatMap(priceGroup => 
          (priceGroup.priceItem || []).map(priceItem => ({
            "@type": "ListItem",
            "position": positionCounter++,
            "item": {
              "@type": "Service",
              "name": priceItem.name || priceGroup.title,
              "description": priceItem.description || priceItem.name || priceGroup.title,
              ...(priceItem.code && { "identifier": priceItem.code }),
              "offers": {
                "@type": "Offer",
                "price": priceItem.price ? priceItem.price.toString().replace(/\\s/g, '') : "0",
                "priceCurrency": "RUB"
              }
            }
          }))
        )
      )
    )
  };

  return (
    <Seo
      title="Стоимость услуг"
      description="Прайс-лист на услуги клиники доктора Горчаковой - OGC clinic"
      pathname={location.pathname}
    >
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Seo>
  );
};
