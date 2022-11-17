import React from "react";
import styled from "styled-components";
import { ButtonPrimary } from "./Styled/Button";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";
import { FaYandex } from "@react-icons/all-files/fa/FaYandex";


const ReviewStyledWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  justify-items: center;
`;

const ButtonPrimaryFlex = styled(ButtonPrimary)`
  display: flex;
  align-items: center;
  .doublegis {
    width: 3em;
  }
  .flamp {
    width: 2.1em;
  }
  svg {
    width: 1.7em;
    height: 1.7em;
  }
`;

function ReviewLinks() {
  return (
    <ReviewStyledWrap>
      <a
        href="https://g.page/r/CSwY89kHQTgNEAg/review"
        aria-label="Оставить отзыв в Google"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ButtonPrimaryFlex>
          <FaGoogle />
          &nbsp; Оставить отзыв в Google
        </ButtonPrimaryFlex>
      </a>
      <a
        href="https://yandex.ru/profile/1393521901"
        aria-label="Оставить отзыв в Яндекс"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ButtonPrimaryFlex>
          <FaYandex />
          &nbsp; Оставить отзыв в Яндекс
        </ButtonPrimaryFlex>
      </a>
      <a
        href="https://2gis.ru/kazan/firm/70000001017617277/tab/reviews"
        aria-label="Оставить отзыв в 2гис"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ButtonPrimaryFlex>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            className="doublegis"
            viewBox="0 0 107.23305 43.909332"
          >
            <defs>
              <clipPath clipPathUnits="userSpaceOnUse" id="a">
                <path d="M0 0h595.276v841.89H0z" />
              </clipPath>
            </defs>
            <g
              clipPath="url(#a)"
              transform="matrix(1.33333 0 0 -1.33333 -603.317 105.07)"
            >
              <path
                d="M0 0a15.8 15.8 0 01-1.097 5.75C-1.283-.148-7.53-4.716-11.198-7.739h9.182A15.862 15.862 0 010 0m-6.638 12.988a17.516 17.516 0 01-10.522 3.478c-9.476 0-17.158-7.372-17.158-16.466 0-9.094 7.682-16.466 17.158-16.466 4.341 0 8.293 1.557 11.313 4.107H-18.27l-.037 3.502C-10.822-2.613-6.233 1.61-6.233 5.689c0 1.516-.602 3.429-3.309 3.429-2.144 0-4.213-1.192-3.838-6.172h-4.362c-1.092 5.774 2.181 10.36 8.425 10.36.966 0 1.863-.112 2.679-.318"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                transform="translate(486.806 62.337)"
              />
              <path
                d="M0 0h4.059c.138 2.963-.902 7.657-7.597 7.657-4.926 0-8.501-2.83-8.501-8.722 0-.799.035-4.927.035-7.491 0-6.391 4.615-7.79 8.5-7.79 2.325 0 5.689.5 7.251 2.131v10.187h-7.632v-3.696h3.4v-4.493c-2.568-.832-7.251-1.166-7.251 4.493v6.659c0 3.961 1.908 5.327 4.023 5.327C-1.526 4.262 0 3.196 0 0m30.189-9.888c.175 9.122-10.718 6.093-10.614 11.187.034 1.797 1.249 2.963 3.226 2.963 2.115 0 3.365-1.199 3.329-4.329h3.99c.105 2.831-.588 7.658-7.179 7.658-4.094 0-7.46-1.932-7.529-6.226C15.238-7.39 26.2-4.528 26.026-9.82c-.069-2.164-1.699-3.129-3.538-3.129-2.15 0-3.885 1.198-3.538 4.793h-4.025c-.45-4.76 1.736-8.157 7.529-8.157 4.891 0 7.666 2.598 7.735 6.425m-18.325-6.124H7.77V7.291h4.094zm0 0H7.77V7.291h4.094z"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                transform="translate(502.722 67.422)"
              />
            </g>
          </svg>
          &nbsp; Оставить отзыв в 2Gis
        </ButtonPrimaryFlex>
      </a>
      <a
        href="https://kazan.flamp.ru/firm/klinika_doktora_gorchakovojj_ooo_zdorove_krasoty-70000001017617277#reviews"
        aria-label="Оставить отзыв в фламп"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ButtonPrimaryFlex>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill="currentColor"
            height="1.7rem"
            width="1.7rem"
            strokeWidth="0"
            viewBox="0 0 80.000000 80.000000"
            className="flamp"
          >
            <path
              d="M0 400V0h800v800H0V400zm600 140v-40H440v-80h120v-80H440V220H340v280h-24c-34 0-52-25-37-53 14-28 1-81-22-85-10-2-31 11-47 28-24 26-30 41-30 77 0 38 5 50 34 79l34 34h352v-40z"
              transform="matrix(.1 0 0 -.1 0 80)"
            />
          </svg>
          &nbsp; Оставить отзыв в Flamp
        </ButtonPrimaryFlex>
      </a>
    </ReviewStyledWrap>
  );
}

export default ReviewLinks;
