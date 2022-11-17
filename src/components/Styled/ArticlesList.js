import styled from "styled-components";

const ArticlesCardsGrid = styled.div`
  width: 100%;
  margin: 10px 0 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 24px;
  justify-content: center;
  padding-bottom: 50px;
  position: relative;

  transform: translateZ(0);

  @media ${(props) => props.theme.media.medium} {
    
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${(props) => props.theme.media.large} {
    grid-template-columns: repeat(3, minmax(25%, 1fr));
  }
`;

const ArticleCardContainer = styled.div`
  position: relative;
  display: flex;
  transform: translateZ(1000px);
  width: 100%;
  border-radius: 30px;
  box-shadow: 0 6px 10px rgb(0 0 0 / 8%);
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  transition: ${(props) => props.theme.imageAnim};
  margin-bottom: -4px;
  &:hover {
    transform: scale(1.03);
  }
`;

const CardContentContainer = styled.div`
  display: flex;
  flex: 1 1;

  .card-content {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
    padding: 24px;

    width: 100%;
    background: #fff;

    .card-title {
      font-weight: 600;
      color: ${(props) => props.theme.secondary};
      margin-bottom: 20px;
      ${(props) => props.theme.secondaryTextGradient};
    }

    .card-descr {
      color: ${(props) => props.theme.primaryColor.color500};
      font-weight: 500;
    }
  }
`;

const CardAuthorContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0;
  margin-top: auto;
  margin-left: -15px;

  .author-devider {
    overflow: visible;
    text-align: inherit;
    margin: 0 0 20px 0;
    border: 0;
    border-top: 1px solid #e5e5e5;
    border: none;
    margin-bottom: 20px;
    &::after {
      content: "";
      display: inline-block;
      width: 100px;
      max-width: 100%;
      border-top: 1px solid #e5e5e5;
      vertical-align: top;
    }
  }
  .author-image {
    padding-left: 15px;
    overflow: hidden;
    width: 60px;
    flex-basis: 20%;
    flex-shrink: 0;
    .gatsby-image-wrapper {
      border-radius: 50%;
      -webkit-mask-image: -webkit-radial-gradient(white, black);
    }
  }

  .author-title {
    padding: 10px;
    margin-left: 5px;

    .author-name {
      color: ${(props) => props.theme.primaryColor.color600};
      font-weight: 700;
      font-size: 1rem;
      line-height: 1;
      margin: 0;
      margin-bottom: 5px;
    }

    .author-spec {
      color: ${(props) => props.theme.secondary};
      font-size: 0.8rem;
      margin: 0;
    }
  }
`;

export {
  ArticlesCardsGrid,
  ArticleCardContainer,
  CardContainer,
  CardImageContainer,
  CardContentContainer,
  CardAuthorContainer,
};
