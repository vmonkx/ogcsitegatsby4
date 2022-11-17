import styled from "styled-components"

const GridItemTextStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;

  &.content-column {
    flex-basis: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    @media ${(props) => props.theme.media.medium} {
      flex-basis: 47%;
    }
  }

  &.content-offset {
    margin-left: 0;
    @media ${(props) => props.theme.media.medium} {
      margin-left: 70px;
    }
  }

  p {
    width: 100%;
  }

  h3 {
    font-size: 1rem;
   
    color: ${props => props.theme.secondary};
    ${props => props.theme.secondaryTextGradient};
  }

  li {
    padding-left: 1.3rem;
    background-image: ${props =>
      `url('data:image/svg+xml;utf8,<svg stroke-width="0" fill="${props.theme.marker}" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"></path></svg>')`};
    background-size: 1rem;
    background-repeat: no-repeat;
  }

  &.content-center {
    padding-top: 0;
    align-items: center;
  }

  

  
`

export { GridItemTextStyled }
