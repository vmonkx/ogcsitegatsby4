import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/pagination";
import PromoListItem from "./PromoListItem";

const PromoListContainer = styled.div`
  padding-bottom: 50px;
  .swiper-container {
    padding-bottom: 50px;
  }

  .swiper-pagination {
    padding: 5px 0;
  }
  .swiper-pagination-bullet-active {
    background: ${(props) => props.theme.secondary};
  }
`;

function PromoSliderList({ promotions }) {
  return (
    <PromoListContainer>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        modules={[Autoplay]}
        breakpoints={{
          // when window width is >= 320px

          // when window width is >= 480px
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          540: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {promotions.map(({ node }) => {
          return (
            node && (
              <SwiperSlide key={node.id}>
                <PromoListItem promo={node} />
              </SwiperSlide>
            )
          );
        })}
      </Swiper>
    </PromoListContainer>
  );
}

export default PromoSliderList;
