import React from "react";
import styled, { keyframes } from "styled-components";
import { Link, useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { useModalWindow } from "../contexts/ModalProvider";
import CategoryItem from "./CategoryItem";
import CategoryList from "./CategoryList";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionWrap = styled.div`
  width: 100%;
  margin: 0 auto 5rem auto;
  animation: ${fadeIn} 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;

const HeroCard = styled.div`
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(108, 105, 124, 0.14);
  border-radius: 24px;
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  box-shadow: 0 4px 20px -4px rgba(36, 35, 45, 0.04);
  overflow: hidden;
  text-align: center;
  margin-bottom: 2.75rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f9516e 0%, #cd026b 50%, #784ba0 100%);
  }

  @media (max-width: 640px) {
    padding: 2.25rem 1.25rem 2rem 1.25rem;
    border-radius: 18px;
  }
`;

const EditorialEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #cd026b;
  margin-bottom: 1rem;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #cd026b;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.6rem, 2.8vw, 2.25rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: #1f1e26;
  max-width: 680px;
  margin: 0 auto 1.1rem auto;
  text-wrap: balance;
`;

const Description = styled.p`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  line-height: 1.65;
  color: #555263;
  max-width: 580px;
  margin: 0 auto 2.25rem auto;
  text-wrap: pretty;
`;

const ActionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  width: 100%;
`;

const PrimaryAction = styled.button`
  appearance: none;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 28px;
  border-radius: 12px;
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #ffffff;
  background-image: linear-gradient(135deg, #f9516e 0%, #cd026b 100%);
  box-shadow: 0 6px 18px -3px rgba(205, 2, 107, 0.35);
  cursor: pointer;
  transition:
    transform 160ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 160ms ease,
    background-image 160ms ease;

  &:focus-visible {
    outline: 2px solid #cd026b;
    outline-offset: 2px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px -2px rgba(205, 2, 107, 0.45);
      background-image: linear-gradient(135deg, #fa617c 0%, #e30277 100%);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SecondaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #3c3a46;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid rgba(108, 105, 124, 0.22);
  transition:
    transform 160ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;

  &:focus-visible {
    outline: 2px solid #cd026b;
    outline-offset: 2px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      border-color: rgba(205, 2, 107, 0.45);
      color: #cd026b;
      box-shadow: 0 6px 16px -2px rgba(108, 105, 124, 0.08);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

const GridHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.5rem;

  .grid-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f1e26;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .grid-subtitle {
    font-size: 0.92rem;
    color: #6c697c;
    margin: 0;
  }
`;

const ConsultationCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #fff7fb 100%);
  border: 1px solid rgba(205, 2, 107, 0.22);
  border-radius: 20px;
  padding: 2rem 2.25rem;
  box-shadow: 0 4px 18px -4px rgba(205, 2, 107, 0.08);

  .text-block {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    max-width: 580px;
  }

  .consult-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f1e26;
    letter-spacing: -0.015em;
    margin: 0;
  }

  .consult-desc {
    font-size: 0.94rem;
    line-height: 1.55;
    color: #555263;
    margin: 0;
  }

  .consult-btn {
    appearance: none;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 13px 26px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #ffffff;
    background-image: linear-gradient(
      -200deg,
      rgba(205, 2, 107, 1) 0%,
      rgba(249, 81, 110, 1) 100%
    );
    box-shadow: 0 6px 18px -3px rgba(205, 2, 107, 0.35);
    cursor: pointer;
    flex-shrink: 0;
    transition:
      transform 160ms cubic-bezier(0.16, 1, 0.3, 1),
      background-image 160ms ease,
      box-shadow 160ms ease;

    &:focus-visible {
      outline: 2px solid #cd026b;
      outline-offset: 2px;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        transform: translateY(-2px);
        background-image: linear-gradient(
          -200deg,
          rgba(156, 0, 81, 1) 0%,
          rgba(224, 69, 95, 1) 100%
        );
        box-shadow: 0 10px 24px -2px rgba(205, 2, 107, 0.45);
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
    gap: 1.25rem;

    .consult-btn {
      width: 100%;
    }
  }
`;

function PromoEmptyState({ services }) {
  const { toggle, setTextMessage } = useModalWindow();

  const staticData = useStaticQuery(graphql`
    query PromoEmptyStateFallbackServices {
      allStrapiService(
        filter: { featured: { eq: true } }
        sort: { updatedAt: DESC }
      ) {
        edges {
          node {
            id
            name
            slug
            cover {
              id
              mime
              url
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    width: 300
                    height: 200
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
            coverColor {
              gradientStart
              gradientEnd
            }
          }
        }
      }
    }
  `);

  const serviceList =
    services && services.length > 0
      ? services
      : staticData?.allStrapiService?.edges?.map((e) => e.node) || [];

  const handleConsultation = (customNote) => {
    setTextMessage(customNote || "Консультация по процедурам и программам OGC clinic");
    toggle();
  };

  return (
    <SectionWrap>
      <HeroCard>
        <EditorialEyebrow>Спецпредложения</EditorialEyebrow>
        <Title>Сейчас открытых акций нет</Title>
        <Description>
          Новые спецпредложения появятся к началу сезона. Все процедуры доступны по
          стандартному прайсу. Если вы не знаете, с чего начать — запишитесь на консультацию:
          врач оценит состояние кожи и подберёт подходящий курс.
        </Description>

        <ActionGroup>
          <PrimaryAction onClick={() => handleConsultation("Запись на консультацию из раздела Акции")}>
            Записаться на консультацию
          </PrimaryAction>
          <SecondaryAction to="/services">
            Каталог услуг и прайс
          </SecondaryAction>
        </ActionGroup>
      </HeroCard>

      {serviceList.length > 0 && (
        <>
          <GridHeader>
            <h3 className="grid-title">Популярные процедуры OGCclinic</h3>
            <p className="grid-subtitle">
              Проверенные методики и протоколы с подтверждённой эффективностью
            </p>
          </GridHeader>

          <CategoryList>
            {serviceList.map((service) => {
              const coverImg =
                service.cover?.localFile?.childImageSharp?.gatsbyImageData ||
                getImage(service.cover?.localFile);

              return (
                <CategoryItem
                  key={service.id}
                  name={service.name}
                  cover={coverImg}
                  coverColor={service.coverColor}
                  slug={`/services/${service.slug}`}
                />
              );
            })}
          </CategoryList>
        </>
      )}

      <ConsultationCard>
        <div className="text-block">
          <span className="consult-title">Поможем подобрать процедуру</span>
          <p className="consult-desc">
            На приёме врач проведёт диагностику кожи, ответит на вопросы и составит
            персональный план ухода под вашу задачу.
          </p>
        </div>
        <button
          type="button"
          className="consult-btn"
          onClick={() => handleConsultation("Консультация: подбор процедур с врачом")}
        >
          Записаться на приём
        </button>
      </ConsultationCard>
    </SectionWrap>
  );
}

export default PromoEmptyState;
