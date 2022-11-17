import styled from "styled-components";

const GridItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  background: #f6f4fc;
  border-radius: 30px;
  min-height: 300px;
  z-index: 0;
  grid-column: span 12;

  @media ${(props) => props.theme.media.medium} {
    grid-column: span 6;
  }

  &.order-1 {
    @media ${(props) => props.theme.media.medium} {
      order: -1;
    }
  }

  &.grid-item-horizontal {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    @media ${(props) => props.theme.media.medium} {
      flex-wrap: nowrap;
    }
  }

  &.span-col-12 {
    grid-column: span 12;
  }

  &.padding-4 {
    padding: 45px 40px;

    @media ${(props) => props.theme.media.retina} {
      padding: 55px 50px;
    }
  }

  &.no-padding-right {
    @media ${(props) => props.theme.media.medium} {
      padding-right: 0;
    }
  }

  &.no-padding-top {
    @media ${(props) => props.theme.media.medium} {
      padding-top: 0;
    }
  }
`;

export { GridItemStyled };
