import React from "react";
import { navigate } from "gatsby";
import Container from "../components/Container";

import Layout from "../components/Layout";

import { SectionMain } from "../components/Styled/Section";
import Seo from "../components/Seo";
import { ButtonSecondary } from "../components/Styled/Button";

const NotFoundPage = () => {
  const handleClick = () => {
    navigate("/");
  };

  return (
    <Layout>
      <SectionMain>
        <Container>
          <h1>404: Страница не найдена</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <div>
            <ButtonSecondary onClick={handleClick}>
              Вернуться на главную
            </ButtonSecondary>
          </div>
        </Container>
      </SectionMain>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => <Seo title="404: Страница не найдена" />;
