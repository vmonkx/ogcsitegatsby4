import React from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";

const InstagramListContainer = styled.div`
  padding-bottom: 50px;

  .swiper-wrapper {
    padding-bottom: 50px;
  }

  .swiper-pagination {
    padding: 5px 0;
  }
  .swiper-pagination-bullet-active {
    background: ${(props) => props.theme.secondary};
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
  opacity: 0;
  transition: all 0.3s ease 0s;
`;

const InstPostContent = styled.div`
  z-index: 10;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-items: center;
  align-items: center;
`;

const InstPostInfo = styled.div`
  display: flex;
  box-sizing: border-box;
  outline: none;
  max-width: 100%;
  justify-content: center;
  align-self: center;
  min-width: 0px;
  min-height: 0px;
  flex-direction: row;
  color: #fff;
  flex-grow: 1;
  opacity: 0;
  transition: all 0.4s ease 0s;
  font-size: 1rem;

  svg {
    font-size: 1.2rem;
    color: ${(props) => props.theme.secondary};
  }

  span {
    font-weight: 600;
  }
`;

const InstagramPostWrapper = styled.div`
  border-radius: 30px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
`;

const InstPostLink = styled.a`
  position: relative;
  overflow: hidden;
  display: block;
  > div img {
    transition: all 0.3s ease 0s !important;
  }
  &:hover,
  &:focus {
    ${Overlay} {
      opacity: 1;
    }
    ${InstPostInfo} {
      opacity: 1;
    }
  }
`;

function InstagramList({ posts }) {
  return (
    <InstagramListContainer>
      <Swiper
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
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
        {posts.map((post) => {
          return (
            post.node.localFile && (
              <SwiperSlide key={post.node.id}>
                <InstagramPostWrapper>
                  <InstPostLink
                    href={post.node.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Overlay />
                    <GatsbyImage
                      image={
                        post.node.localFile.childImageSharp.gatsbyImageData
                      }
                      alt={`Пост в instagram - ${post.node.caption.slice(
                        0,
                        120
                      )}`}
                    />
                    
                  </InstPostLink>
                </InstagramPostWrapper>
              </SwiperSlide>
            )
          );
        })}
      </Swiper>
    </InstagramListContainer>
  );
}

export default InstagramList;
