import styled from "styled-components";

const PriceListContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

const PriceSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background: #fff;
  z-index: 2;
  @media ${(props) => props.theme.media.medium} {
    flex-direction: row;
    padding: 30px;
    box-shadow: 0 0 33px rgba(0, 0, 0, 0.05);
  }
`;

const PriceHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2rem;

  @media ${(props) => props.theme.media.medium} {
    margin-bottom: 0;
    flex-basis: 25%;
  }
`;

const PriceHeaderCategory = styled.h2`
  position: relative;
  width: 100%;
  color: ${(props) => props.theme.secondary};
  background-image: linear-gradient(
    20deg,
    rgba(205, 2, 107, 1) 0%,
    rgba(249, 81, 110, 1) 100%
  );

  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;

  &::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 100%;
    height: 1.2px;
    background: ${(props) => props.theme.primaryColor.color500};
    @media ${(props) => props.theme.media.medium} {
      bottom: -7px;
    }
  }
`;

const PriceHeaderDescription = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.primary};
`;

const PriceContentWrap = styled.div`
  @media ${(props) => props.theme.media.medium} {
    margin-left: 2rem;
  }
`;

const PriceHeaderService = styled.h4`
  font-size: 1.4rem;
  font-weight: 600;

  color: ${(props) => props.theme.primaryColor.color500};
  margin-bottom: 0.8rem;
`;

const PriceItemWrap = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media ${(props) => props.theme.media.medium} {
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

export {
  PriceListContainer,
  PriceSectionStyled,
  PriceHeaderWrapper,
  PriceHeaderCategory,
  PriceHeaderDescription,
  PriceHeaderService,
  PriceContentWrap,
  PriceItemWrap,
};
