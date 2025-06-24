import styled from "styled-components";

export const SpecialistSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background: #fff;
  z-index: 2;
  margin-bottom: 3rem;
  @media screen and (min-width: 753px) {
    flex-direction: row;
    padding: 30px;

    box-shadow: 0 0 33px rgba(0, 0, 0, 0.05);
  }
`;

export const SpecialistWrapperInfoStyled = styled.div`
  flex-grow: 0;

  display: flex;

  justify-content: flex-start;
  align-items: center;
  align-content: space-around;
  flex-wrap: wrap;
  padding: 1rem;

  .personal-description {
    flex-grow: 1;
    width: 100%;
  }

  .personal-action {
    flex-grow: 1;
  }

  @media ${(props) => props.theme.media.medium} {
    margin-right: 2rem;

    .personal-action {
      flex-grow: 0;
    }
  }
`;

export const SpecialistSpecialStyled = styled.p`
  color: ${(props) => props.theme.secondary};
`;

export const SpecialistWrapperImageStyled = styled.div`
  order: -1;
  flex-basis: 30%;
  flex-shrink: 0;
  @media ${(props) => props.theme.media.medium} {
    order: 1;
  }
`;

export const SpecialistParticularInfoWrap = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
`;

export const SpecialistGridContent = styled.div`
  grid-column: span 12;

  @media ${(props) => props.theme.media.medium} {
    grid-column: span 6;
  }
`;

export const SpecialistServiceArrayStyled = styled.div`
  margin-bottom: 1.45rem;

  a {
    margin-bottom: 0.73rem;
    margin-left: 1.3rem;
  }
`;
