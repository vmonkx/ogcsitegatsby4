import styled from "styled-components";

const GridContainerStyled = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-row-gap: ${(props) => (props.gap ? props.gap : "25px")};
  margin: 25px auto;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: min-content;
  @media ${props => props.theme.media.medium} {
    grid-row-gap: 0;
    grid-column-gap: ${(props) => (props.gap ? props.gap : "25px")};
  }
`;

export { GridContainerStyled };
