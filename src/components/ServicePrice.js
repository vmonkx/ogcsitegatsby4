import React from "react";

import Accordion from "./Accordion";
import HeaderSection from "./HeaderSection";

import { Section } from "./Styled/Section";

function ServicePrice({ content }) {
  return (
    <Section>
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
