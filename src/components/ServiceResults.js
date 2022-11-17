import React from "react";
import styled from "styled-components";
import ResultItem from "./ResultItem";
import { Section } from "./Styled/Section";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/pagination';

const ResultsItemContainer = styled.div`
  .swiper-container {
    padding: 10px 0;
  }

  .swiper-pagination {
    padding: 5px 0;
  }
  .swiper-pagination-bullet-active {
    background: ${(props) => props.theme.secondary};
  }
`;

SwiperCore.use([Autoplay, Pagination]);

function ServiceResults({ content }) {
  return (
    <Section>
      <ResultsItemContainer>
        <Swiper
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          spaceBetween={50}
          slidesPerView={2}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            // when window width is >= 320px

            // when window width is >= 480px
            320: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            754: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {content.map((item) => (
            <SwiperSlide key={item.id}>
              <div>
                <ResultItem item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ResultsItemContainer>
    </Section>
  );
}

export default ServiceResults;
