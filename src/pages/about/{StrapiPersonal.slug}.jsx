import React from "react";
import { graphql } from "gatsby";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { SectionMain } from "../../components/Styled/Section";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import NavigationBack from "../../components/NavigationBack";
import { ImageStyled } from "../../components/Styled/ImageStyled";
import { GridContainerStyled } from "../../components/Styled/GridContainerStyled";
import { ButtonSecondary } from "../../components/Styled/Button";
import { useModalWindow } from "../../contexts/ModalProvider";

import Seo from "../../components/Seo";
import { PrimaryLinkStyled, LinkStyl } from "../../components/Styled/Link";
import {
  HeaderCategory,
  HeaderSectionStyled,
} from "../../components/Styled/HeaderStyled";
import {
  SpecialistSectionStyled,
  SpecialistWrapperInfoStyled,
  SpecialistSpecialStyled,
  SpecialistWrapperImageStyled,
  SpecialistParticularInfoWrap,
  SpecialistGridContent,
  SpecialistServiceArrayStyled,
} from "../../components/Styled/SpecialistStyled";

import RussianName from "../../utils/getName";

function SpecialistTemplatePage({ data, pageContext, location }) {
  const { toggle, setTextMessage } = useModalWindow();

  const { strapiPersonal } = data;

  const categoriesPersonalArray = strapiPersonal.services.reduce(
    (prev, service) => {
      if (prev.some((category) => category.id === service.category.id)) {
        prev.forEach((category) => {
          if (category.id === service.category.id) {
            category.service.push({
              id: service.id,
              slug: service.slug,
              name: service.name,
            });

            return prev;
          }
        });
      } else {
        const temp = {
          ...service.category,
          service: [
            {
              id: service.id,
              slug: service.slug,
              name: service.name,
            },
          ],
        };

        prev.push(temp);
      }

      return prev;
    },
    []
  );

  const handleClickOrder = () => {
    const rn = new RussianName(strapiPersonal.name);
    const name = rn.fullName(rn.gcaseDat);

    setTextMessage(`Хочу записаться к доктору ${name}`);
    toggle();
  };

  return (
    <Layout>
      <SectionMain>
        <Container>
          <NavigationBack to={`/about`} title="О клинике" />

          <SpecialistSectionStyled>
            <SpecialistWrapperInfoStyled>
              <div>
                <HeaderSectionStyled>{strapiPersonal.name}</HeaderSectionStyled>
                <SpecialistSpecialStyled>
                  {strapiPersonal.specialty}
                </SpecialistSpecialStyled>
              </div>

              <div className="personal-description">
                <p>{strapiPersonal.description}</p>
              </div>
              <div className="personal-action">
                <ButtonSecondary onClick={handleClickOrder}>
                  Записаться
                </ButtonSecondary>
              </div>
            </SpecialistWrapperInfoStyled>

            <SpecialistWrapperImageStyled>
              <ImageStyled>
                <GatsbyImage
                  image={getImage(strapiPersonal.cover.localFile)}
                  alt={strapiPersonal.name}
                ></GatsbyImage>
              </ImageStyled>
            </SpecialistWrapperImageStyled>
          </SpecialistSectionStyled>

          <SpecialistParticularInfoWrap>
            <GridContainerStyled gap="2rem">
              <SpecialistGridContent>
                <HeaderCategory>Образование</HeaderCategory>
                {strapiPersonal.diploma ? (
                  <div>
                    <h3>Диплом</h3>
                    <p>{strapiPersonal.diploma}</p>
                  </div>
                ) : null}
                {strapiPersonal.internship ? (
                  <div>
                    <h3>Интернатура / ординатура</h3>
                    <p>{strapiPersonal.internship}</p>
                  </div>
                ) : null}

                {strapiPersonal.retraining.length ? (
                  <div>
                    <h3>Диплом о профессиональной переподготовке</h3>
                    {strapiPersonal.retraining.map((retrain) => (
                      <p key={retrain.id}>{retrain.title}</p>
                    ))}
                  </div>
                ) : null}
                {strapiPersonal.certificates.length ? (
                  <div>
                    <h3>Сертификаты</h3>
                    {strapiPersonal.certificates.map((certificate) => (
                      <p key={certificate.id}>{certificate.title}</p>
                    ))}
                  </div>
                ) : null}
                {strapiPersonal.stateCertificate.length ? (
                  <div>
                    <h3>Удостоверение государственного образца</h3>
                    {strapiPersonal.stateCertificate.map((certificate) => (
                      <p key={certificate.id}>{certificate.title}</p>
                    ))}
                  </div>
                ) : null}
                {strapiPersonal.courses.length ? (
                  <div>
                    <h3>Курсы, семинары</h3>
                    {strapiPersonal.courses.map((course) => (
                      <p key={course.id}>{course.title}</p>
                    ))}
                  </div>
                ) : null}
              </SpecialistGridContent>
              <SpecialistGridContent>
                <HeaderCategory>Процедуры и услуги</HeaderCategory>
                {categoriesPersonalArray.map((category) => {
                  return (
                    <div key={category.id}>
                      <h3>
                        <PrimaryLinkStyled to={`/category/${category.slug}`}>
                          {category.name}
                        </PrimaryLinkStyled>
                      </h3>
                      <SpecialistServiceArrayStyled>
                        {category.service.map((serv) => (
                          <LinkStyl to={`/services/${serv.slug}`} key={serv.id}>
                            {serv.name}
                          </LinkStyl>
                        ))}
                      </SpecialistServiceArrayStyled>
                    </div>
                  );
                })}
              </SpecialistGridContent>
            </GridContainerStyled>
          </SpecialistParticularInfoWrap>
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default SpecialistTemplatePage;

export const query = graphql`
  query ($slug: String!) {
    strapiPersonal(slug: { eq: $slug }) {
      id
      name
      slug
      description
      diploma
      specialty
      internship
      retraining {
        id
        title
      }
      courses {
        id
        title
      }
      certificates {
        id
        title
      }
      stateCertificate {
        id
        title
      }
      cover {
        id
        mime
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED

              height: 400
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      services {
        id
        name
        slug
        slug
        category {
          id
          name
          slug
        }
      }
      seo {
        lang
        description
        title
        shareImage {
          id
          mime
          url
          localFile {
            childImageSharp {
              resize(width: 600, quality: 90) {
                src
              }
            }
          }
        }
      }
    }

    site {
      siteMetadata {
        url
      }
    }
  }
`;

export const Head = ({ location, params, data, pageContext }) => {
  const { strapiPersonal } = data;
  const breadCrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${data.site.siteMetadata?.url}/about`,
          name: "О клинике",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${data.site.siteMetadata?.url}${location.pathname}`,
          name: `${strapiPersonal.name}`,
        },
      },
    ],
  };

  return (
    <Seo
      title={strapiPersonal.seo?.title}
      description={`${strapiPersonal.name} - ${strapiPersonal.seo?.description}`}
      cover={getSrc(strapiPersonal.seo?.shareImage.localFile)}
      breadCrumbSchema={breadCrumbSchema}
      pathname={location.pathname}
    />
  );
};
