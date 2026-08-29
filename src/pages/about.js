import React from "react";
import { graphql } from "gatsby";
import Container from "../components/Container";
import HeaderService from "../components/HeaderService";
import Layout from "../components/Layout";

import SpecialistList from "../components/SpecialistList";
import { SectionMain } from "../components/Styled/Section";
import styled from "styled-components";

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import MarkdownArticle from "../components/MarkdownArticle";
import NavigationBack from "../components/NavigationBack";
import Seo from "../components/Seo";

const PageWraper = styled.div`
  .cover-wrapper {
    position: relative;

    width: 100%;
    max-height: 700px;
    overflow: hidden;

    @media screen and (min-width: 1024px) {
      margin: 0 auto;
    }
  }

  .informations-wrapper {
    position: relative;
    margin-top: -24px;

    z-index: 1;

    @media screen and (min-width: 768px) {
      margin-top: -49px;
    }
    @media screen and (min-width: 1024px) {
      margin-top: -69px;
    }
  }

  .content {
    ${(props) => props.theme.glassBackground};
    padding: 30px 20px;
    border-radius: 30px;

    @media screen and (min-width: 768px) {
      padding: 50px 50px;
    }
  }
`;

const Image = styled(GatsbyImage)`
  bottom: 33vh;
  top: 1.25rem;
  left: 0;
  right: 0;
  overflow: hidden;
  @media screen and (min-width: 1440px) {
    top: -5.75rem;
  }
`;

function AboutPage({ data: { strapiAboutPage, allStrapiPersonal } }) {
  const personals = allStrapiPersonal.edges;

  return (
    <Layout>
      <PageWraper>
        <div className="cover-wrapper">
          {strapiAboutPage.cover.localFile && (
            <Image
              image={getImage(strapiAboutPage.cover.localFile)}
              backgroundColor={`#040e18`}
              alt="Информация о клинике доктора Горчаковой - OGC clinic."
            />
          )}
        </div>
        <div className="informations-wrapper">
          <Container>
            <NavigationBack to={`/`} title="Главной странице" />
            <div className="content">
              <HeaderService title={strapiAboutPage.title} />
              <div className="text-section">
                <MarkdownArticle
                  article={
                    strapiAboutPage.description.data.childMarkdownRemark.html
                  }
                />
              </div>
            </div>
          </Container>
        </div>
      </PageWraper>

      <SectionMain>
        <Container>
          <HeaderService title="Специалисты клиники" />
          <SpecialistList list={personals} />
        </Container>
      </SectionMain>
    </Layout>
  );
}

export default AboutPage;

export const query = graphql`{
  strapiAboutPage {
    id
    title
    description {
      data {
        childMarkdownRemark {
          html
        }
      }
    }
    seo {
      meta {
        name
        content
      }
      shareImage {
        id
        mime
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 1200
              quality: 90
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      lang
      description
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
            width: 1920
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
  allStrapiPersonal(sort: {strapi_id: ASC}) {
    edges {
      node {
        avatar {
          id
          url
          mime
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                width: 178
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        description
        id
        name
        specialty
        slug
      }
    }
  }
}`;

export const Head = ({ location, data }) => {
  const { strapiAboutPage, allStrapiPersonal } = data;
  const seoData = strapiAboutPage?.seo;
  const personals = allStrapiPersonal?.edges || [];

  const siteUrl = "https://ogcclinic.ru"; // Use production URL for schema

  // Generate Person objects for the clinic's specialists
  const employees = personals.map(({ node }) => {
    const imageUrl = node.avatar?.url;
    const finalImageUrl = imageUrl
      ? imageUrl.startsWith("http")
        ? imageUrl
        : `${siteUrl}${imageUrl}`
      : undefined;

    return {
      "@type": "Person",
      name: node.name,
      jobTitle: node.specialty,
      ...(finalImageUrl && { image: finalImageUrl }),
      url: `${siteUrl}/specialist/${node.slug}/`,
    };
  });

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: seoData?.title || "О клинике",
    description: seoData?.description || "Информация о клинике доктора Горчаковой - OGC clinic.",
    url: `${siteUrl}${location.pathname}`,
    mainEntity: {
      "@type": "MedicalClinic",
      "@id": `${siteUrl}/#organization`,
      employees: employees,
    },
  };

  return (
    <Seo
      title={seoData?.title || "О клинике"}
      description={seoData?.description || "Информация о клинике доктора Горчаковой - OGC clinic."}
      meta={seoData?.meta || []}
      cover={seoData?.shareImage?.url}
      pathname={location.pathname}
      customSchema={aboutSchema}
    />
  );
};
