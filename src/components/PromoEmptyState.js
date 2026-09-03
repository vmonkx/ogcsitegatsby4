import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "gatsby";
import { useModalWindow } from "../contexts/ModalProvider";

import BackgroundRadial from "./BackgroundRadial";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.99);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const EmptyStateContainer = styled.div`
  position: relative;
  max-width: 720px;
  margin: 0 auto 5rem auto;
  padding: 1.5rem 0 3rem 0;
  text-align: center;
  animation: ${fadeIn} 260ms cubic-bezier(0.23, 1, 0.32, 1) forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .content-wrap {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const EmptyTitle = styled.h2`
  font-size: clamp(1.5rem, 3.2vw, 2.1rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;
  text-wrap: balance;
  ${(props) => props.theme.secondaryTextGradient};
  margin: 0 0 0.85rem 0;
`;

const EmptyDescription = styled.p`
  font-size: clamp(0.95rem, 1.6vw, 1.05rem);
  line-height: 1.62;
  color: #555263;
  max-width: 530px;
  margin: 0 auto 2rem auto;
  text-wrap: pretty;
`;

const ActionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  width: 100%;
  margin-bottom: 2.5rem;
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
  box-shadow: 0 8px 22px -4px rgba(205, 2, 107, 0.38);
  cursor: pointer;
  transition: 
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 160ms ease,
    background-image 200ms ease;

  &:focus-visible {
    outline: 2px solid #cd026b;
    outline-offset: 2px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 26px -2px rgba(205, 2, 107, 0.48);
      background-image: linear-gradient(135deg, #fa617c 0%, #e30277 100%);
    }
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 4px 12px rgba(205, 2, 107, 0.3);
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
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(108, 105, 124, 0.22);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: 
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
    border-color 160ms ease,
    color 160ms ease,
    background-color 160ms ease;

  &:focus-visible {
    outline: 2px solid #cd026b;
    outline-offset: 2px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      background: #ffffff;
      border-color: rgba(205, 2, 107, 0.4);
      color: #cd026b;
      box-shadow: 0 6px 16px -2px rgba(108, 105, 124, 0.08);
    }
  }

  &:active {
    transform: scale(0.97);
  }
`;

const DirectionsSection = styled.div`
  width: 100%;
  max-width: 680px;
  margin-top: 2.25rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.65rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -1.25rem;
    left: 50%;
    transform: translateX(-50%);
    width: min(100%, 420px);
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(108, 105, 124, 0.16) 25%,
      rgba(108, 105, 124, 0.16) 75%,
      transparent 100%
    );
  }

  .section-label {
    font-size: 0.76rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #8c899a;
    text-align: center;
    margin-bottom: 0.5rem;
  }
`;

const DirectionRow = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.15rem;
  padding: 1rem 1.25rem;
  border-radius: 20px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(108, 105, 124, 0.1);
  box-shadow: 0 2px 10px -2px rgba(108, 105, 124, 0.04);
  text-align: left;
  position: relative;
  overflow: hidden;
  transition:
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #f9516e 0%, #cd026b 100%);
    opacity: 0;
    transform: scaleY(0.4);
    transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:focus-visible {
    outline: 2px solid #cd026b;
    outline-offset: 2px;
  }

  .row-index {
    font-size: 1.25rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: #8c899a;
    letter-spacing: -0.03em;
    min-width: 1.85rem;
    transition: all 180ms ease;
  }

  .row-body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .row-title {
    font-size: 1rem;
    font-weight: 600;
    color: #24232d;
    line-height: 1.3;
    transition: color 160ms ease;
  }

  .row-tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.45rem;
  }

  .row-tag {
    font-size: 0.78rem;
    color: #555263;
    background: rgba(108, 105, 124, 0.06);
    padding: 0.15rem 0.5rem;
    border-radius: 8px;
    line-height: 1.3;
    transition: all 160ms ease;
  }

  .row-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(108, 105, 124, 0.05);
    border: 1px solid rgba(108, 105, 124, 0.08);
    color: #8c899a;
    flex-shrink: 0;
    transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);

    svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      transform: translateX(0);
      transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      background: #ffffff;
      border-color: rgba(205, 2, 107, 0.3);
      box-shadow: 0 10px 24px -4px rgba(205, 2, 107, 0.12);

      &::before {
        opacity: 1;
        transform: scaleY(1);
      }

      .row-index {
        color: #cd026b;
      }

      .row-title {
        color: #cd026b;
      }

      .row-tag {
        background: rgba(205, 2, 107, 0.08);
        color: #cd026b;
      }

      .row-action {
        background: linear-gradient(135deg, #f9516e 0%, #cd026b 100%);
        border-color: transparent;
        color: #ffffff;
        box-shadow: 0 4px 10px rgba(205, 2, 107, 0.3);

        svg {
          transform: translateX(2px);
        }
      }
    }
  }

  &:active {
    transform: scale(0.99);
  }

  @media (max-width: 540px) {
    gap: 0.85rem;
    padding: 0.95rem 1rem;

    .row-index {
      font-size: 1.05rem;
      min-width: 1.5rem;
    }

    .row-title {
      font-size: 0.95rem;
    }

    .row-tag {
      font-size: 0.74rem;
    }

    .row-action {
      width: 30px;
      height: 30px;
    }
  }
`;

const DIRECTIONS = [
  {
    index: "01",
    title: "Аппаратная косметология",
    slug: "/category/apparatnaya-kosmetologiya",
    tags: ["SMAS-лифтинг", "Лазер", "RF-терапия"],
  },
  {
    index: "02",
    title: "Инъекционная косметология",
    slug: "/category/inekcionnaya-kosmetologiya",
    tags: ["Контурная пластика", "Ботокс", "Биоревитализация"],
  },
  {
    index: "03",
    title: "Эстетический уход",
    slug: "/category/esteticheskaya-kosmetologiya",
    tags: ["Чистки", "Пилинги", "Программы ухода"],
  },
];

function PromoEmptyState() {
  const { toggle, setTextMessage } = useModalWindow();

  const handleConsultation = () => {
    setTextMessage("Консультация по спецпредложениям и процедурам клиники");
    toggle();
  };

  return (
    <EmptyStateContainer>
      <BackgroundRadial $position="right" />
      <div className="content-wrap">
        <EmptyTitle>Сейчас действующих акций нет</EmptyTitle>

        <EmptyDescription>
          Новые спецпредложения скоро появятся здесь. Выберите направление или запишитесь на консультацию — врач ответит на вопросы и рассчитает стоимость.
        </EmptyDescription>

        <ActionGroup>
          <PrimaryAction onClick={handleConsultation}>
            Записаться на консультацию
          </PrimaryAction>
          <SecondaryAction to="/services">
            Все услуги и прайс
          </SecondaryAction>
        </ActionGroup>

        <DirectionsSection>
          <span className="section-label">Популярные направления</span>
          {DIRECTIONS.map((dir) => (
            <DirectionRow key={dir.slug} to={dir.slug}>
              <span className="row-index">{dir.index}</span>
              <div className="row-body">
                <span className="row-title">{dir.title}</span>
                <div className="row-tags">
                  {dir.tags.map((tag) => (
                    <span key={tag} className="row-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="row-action" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </DirectionRow>
          ))}
        </DirectionsSection>
      </div>
    </EmptyStateContainer>
  );
}

export default PromoEmptyState;
