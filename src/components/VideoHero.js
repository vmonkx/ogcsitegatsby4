import React from "react";
import styled from "styled-components";

const MainPageTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
  min-height: 100vh;

  position: relative;
  transition: background-color 0.5s ease, -webkit-transform 0.3s ease;
  transition: background-color 0.5s ease, transform 0.3s ease;
  transition: background-color 0.5s ease, transform 0.3s ease,
    -webkit-transform 0.3s ease;
  .main-page-title {
    overflow: hidden;
    position: relative;
    max-height: 100vh;
    min-height: 480px;
  }

  .main-page-title_can-play .main-page-title__background {
    opacity: 1;
  }

  .main-page-title__background {
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 1s ease;
    width: 100%;
  }
  .video-with-lottie {
    position: relative;
  }
  .main-page-title__background.video-with-lottie {
    position: absolute;
  }

  .main-page-title__background-placeholder {
    height: auto;
    width: 100%;
  }

  .autoplay-video {
    height: 100%;
    line-height: 0;
  }

  .autoplay-video__video {
    min-height: 100%;
    width: 100%;
    height: auto;
    width: 100%;
    object-fit: cover;
  }
`;

function BackgroundHero({ videoSrc, title, info, poster }) {
  return (
    <>
      <MainPageTitle>
        <div className="main-page-title main-page-title_can-play">
          <svg
            aria-hidden="true"
            className="main-page-title__background-placeholder"
            height="1080"
            width="1920"
          ></svg>
          <div className="video-with-lottie main-page-title__background">
            <div className="autoplay-video video-with-lottie__video">
              <video
                muted
                className="autoplay-video__video"
                loop
                autoPlay
                playsInline
                poster={poster}
                height="1080"
                width="1920"
              >
                <source src={videoSrc} type="video/webm" />
              </video>
            </div>
          </div>
        </div>
      </MainPageTitle>
    </>
  );
}

export default React.memo(BackgroundHero);
