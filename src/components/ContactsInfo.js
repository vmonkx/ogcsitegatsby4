import React from "react";
import styled from "styled-components";
import Container from "./Container";
import { ButtonPrimary } from "./Styled/Button";
import { LinkStyled } from "./Styled/Link";
import { FaVk } from "@react-icons/all-files/fa/FaVk";
import { FaTelegram } from "@react-icons/all-files/fa/FaTelegram";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaFacebookSquare } from "@react-icons/all-files/fa/FaFacebookSquare";
import { useModalWindow } from "../contexts/ModalProvider";

const ContactsWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 15px 0;

  @media ${(props) => props.theme.media.medium} {
    width: auto;
    position: absolute;
    z-index: 1;
    top: -50px;
    left: 0;
    float: left;
    padding: 40px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transform: translate(0%, 15%);
    border-radius: 30px;
  }

  @media ${(props) => props.theme.media.large} {
    transform: translate(-5%, 15%);
  }
`;

const ContactTerm = styled.h3`
  color: ${(props) => props.theme.primaryColor.color400};
  font-size: 19px;
  font-weight: 600;
  margin: 0;
  line-height: 1.21053;
  letter-spacing: 0.012em;
  color: ${(props) => props.theme.primaryColor.color400};
  background-image: linear-gradient(
    20deg,
    rgba(205, 2, 107, 1) 0%,
    rgba(249, 81, 110, 1) 100%
  );

  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`;

const ContactsContainer = styled.div`
  position: relative;
`;

const ContactDefinition = styled.p`
  margin-top: 0.2rem;
  color: ${(props) => props.theme.primaryColor.color500};

  a {
    color: ${(props) => props.theme.primaryColor.color400};
    font-size: 1rem;
    text-decoration: none;
    font-weight: 600;
  }

  .social-link {
    font-size: 40px;
    padding: 0;
    &:not(:first-child) {
      margin-left: 10px;
    }
    &:hover {
      color: ${(props) => props.theme.secondary};
    }
  }
`;

function ContactsInfo() {
  const { toggle } = useModalWindow();
  return (
    <Container>
      <ContactsContainer>
        <ContactsWrap>
          <div className="contacts__data">
            <ContactTerm>О клинике:</ContactTerm>
            <ContactDefinition>
              <LinkStyled to="/docs/info">
                Сведения о медицинской организации
              </LinkStyled>
            </ContactDefinition>
          </div>
          <div className="contacts__data">
            <ContactTerm>Наш адрес:</ContactTerm>
            <ContactDefinition>
              г. Казань, ул. Николая Ершова, 57г
            </ContactDefinition>
          </div>
          <div className="contacts__data">
            <ContactTerm>Телефон для записи:</ContactTerm>
            <ContactDefinition>
              <a
                className="contacts__link contacts__link--phone from-right"
                href="tel:+78432060707"
                aria-label="Телефон"
              >
                8 843 206-07-07
              </a>
            </ContactDefinition>
          </div>
          <div className="contacts__data">
            <ContactTerm>Мы в соц. сетях:</ContactTerm>
            <ContactDefinition>
              <a
                className="social-link"
                aria-label="Телеграм"
                href="https://t.me/+oLVdYQH2LDplYWQy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram aria-hidden="true" />
              </a>
              <a
                className="social-link"
                href="https://vk.com/ogcclinic"
                target="_blank"
                aria-label="Вконтакте"
                rel="noopener noreferrer"
              >
                <FaVk aria-hidden="true" />
              </a>
              <a
                className="social-link "
                href="https://facebook.com/ogcclinic"
                target="_blank"
                aria-label="Фейсбук"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare aria-hidden="true" />
              </a>
              <a
                className="social-link "
                href="https://youtube.com/channel/UCImB6JGxRVEkkBW1WhzOVUw"
                target="_blank"
                aria-label="Ютуб канал"
                rel="noopener noreferrer"
              >
                <FaYoutube aria-hidden="true" />
              </a>
            </ContactDefinition>
          </div>
          <div>
            <ButtonPrimary onClick={toggle}>Записаться</ButtonPrimary>
          </div>
        </ContactsWrap>
      </ContactsContainer>
    </Container>
  );
}

export default ContactsInfo;
