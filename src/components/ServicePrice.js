import React from "react";

import Accordion from "./Accordion";
import HeaderSection from "./HeaderSection";

import { Section } from "./Styled/Section";

function ServicePrice({ content }) {
  // SEO: Generate JSON-LD Schema for the Price List
  let positionCounter = 1;
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": content?.flatMap(category => 
      (category.priceItem || []).map(service => ({
        "@type": "ListItem",
        "position": positionCounter++,
        "item": {
          "@type": "Service",
          "name": service.name || category.title,
          "description": service.description || service.name || category.title,
          ...(service.code && { "identifier": service.code }),
          "offers": {
            "@type": "Offer",
            "price": service.price ? service.price.toString().replace(/\\s/g, '') : "0",
            "priceCurrency": "RUB"
          }
        }
      }))
    ) || []
  };

  return (
    <Section>
      {/* SEO: Injecting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <HeaderSection
        title="Цены на процедуру:"
        descr="Нажмите на название процедуры, чтобы развернуть/свернуть содержимое."
      />
      <div>
        <Accordion items={content} />
      </div>
    </Section>
  );
}

export default ServicePrice;
