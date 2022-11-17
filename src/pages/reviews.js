import React from "react";
import Container from "../components/Container";
import HeaderService from "../components/HeaderService";
import Layout from "../components/Layout";
import ReviewLinks from "../components/ReviewLinks";

import { SectionMain } from "../components/Styled/Section";
import Seo from "../components/Seo";

function ReviewsPage() {
  return (
    <Layout>
      <SectionMain>
        <Container>
          <HeaderService title="Напишите нам отзыв" />

          <ReviewLinks />
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default ReviewsPage;

export const Head = () => (
  <Seo
    title="Оставить отзыв"
    description="Напишите нам отзыв - это поможет нам стать еще лучше для Вас!"
  />
);
