import React from "react";

import Layout from "../components/Layout";
import ContactMap from "../components/ContactMap";
import ContactsInfo from "../components/ContactsInfo";
import { SectionMain } from "../components/Styled/Section";
import HeaderService from "../components/HeaderService";
import Seo from "../components/Seo";

function Contacts() {
  return (
    <Layout>
      <SectionMain>
        <HeaderService title="Контакты" />
        <ContactsInfo />
        <ContactMap />
      </SectionMain>
    </Layout>
  );
}

export default Contacts;

export const Head = ({location}) => (
  <Seo
    title="Наши контакты"
    description="Сведения о медицинской организации. Контактная информация о Клинике доктора Горчаковой - OGC clinic"
    pathname={location.pathname}
  />
);
