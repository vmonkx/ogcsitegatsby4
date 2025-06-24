import styled from "styled-components";

const GridItemHeader = styled.div`
  box-sizing: border-box;
  padding-bottom: 0;
  z-index: 1;

  &.content-column {
    flex-basis: 47%;
    flex-grow: 1;
    flex-shrink: 0;
  }

  h2 {
    ${(props) => props.theme.secondaryTextGradient};
  }

  &.alter-color {
    h2 {
      ${(props) => props.theme.secondaryTextGradient};
    }
  }
`;

export { GridItemHeader };
