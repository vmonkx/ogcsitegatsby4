import React from "react";
import AccordionItem from "./AccordionItem";
import { AccordionStyled } from "./Styled/AccordionStyled";

function Accordion({ items }) {
  return (
    <AccordionStyled>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          itemID={item.id}
          label={item.title}
          hiddenContent={item.priceItem}
        />
      ))}
    </AccordionStyled>
  );
}

export default Accordion;
