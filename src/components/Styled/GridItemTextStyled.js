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

  blockquote {
    position: relative;
    margin: 28px 0 14px 0;
    padding: 2px 0 2px 20px;
    transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);

    &:first-child {
      margin-top: 0;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 3.5px;
      border-radius: 4px;
      background: linear-gradient(180deg, #F9516E 0%, #CD026B 100%);
    }

    p {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.45;
      letter-spacing: -0.01em;
      color: #1F1C27;

      @media ${(props) => props.theme.media.medium} {
        font-size: 1.15rem;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        transform: translateX(4px);
      }
    }
  }

  .eyebrow, span.eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${props => props.theme.secondary || "#CD026B"};
    margin-bottom: 6px;
  }

  .badge, mark {
    display: inline-block;
    padding: 2px 9px;
    background: linear-gradient(135deg, rgba(249, 81, 110, 0.12) 0%, rgba(205, 2, 107, 0.08) 100%);
    color: #CD026B;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.9em;
    letter-spacing: -0.01em;
  }

  h3 {
    font-size: 1rem;
   
    color: ${props => props.theme.secondary};
    ${props => props.theme.secondaryTextGradient};
  }

  ul {
    margin: 20px 0;
    padding-left: 0;
    list-style: none;

    li {
      position: relative;
      padding: 16px 14px 16px 2.6rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      line-height: 1.6;
      color: #4A4853;
      border-radius: 12px;
      transition: transform 220ms cubic-bezier(0.23, 1, 0.32, 1), background-color 220ms ease, box-shadow 220ms ease;

      &::before {
        content: "✓";
        position: absolute;
        top: 1.15rem;
        left: 0.4rem;
        width: 22px;
        height: 22px;
        border-radius: 7px;
        background: linear-gradient(135deg, rgba(249, 81, 110, 0.18) 0%, rgba(205, 2, 107, 0.12) 100%);
        color: #CD026B;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 800;
        box-shadow: inset 0 0 0 1px rgba(205, 2, 107, 0.15);
        transition: background 220ms ease, color 220ms ease, box-shadow 220ms ease;
      }

      &:first-child {
        padding-top: 8px;
        &::before {
          top: 0.65rem;
        }
      }

      &:last-child {
        border-bottom: none;
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          transform: translateX(4px);
          background-color: rgba(255, 255, 255, 0.65);
          box-shadow: 0 4px 14px rgba(180, 160, 210, 0.08);

          &::before {
            background: linear-gradient(135deg, #F9516E 0%, #CD026B 100%);
            color: #FFFFFF;
            box-shadow: 0 2px 8px rgba(205, 2, 107, 0.28);
          }
        }
      }

      strong {
        display: block;
        font-size: 1.08rem;
        font-weight: 700;
        color: #1F1C27;
        margin-bottom: 4px;
        line-height: 1.4;
      }

      p {
        margin: 0;
        font-size: 0.96rem;
        line-height: 1.55;
        color: #555260;
      }
    }
  }

  ol {
    margin: 24px 0;
    padding-left: 0;
    list-style: none;
    counter-reset: grid-ol-counter;

    li {
      position: relative;
      counter-increment: grid-ol-counter;
      padding-top: 8px;
      padding-left: 0;
      margin-bottom: 26px;
      background-image: none;
      line-height: 1.6;
      color: #3D3946;

      &:last-child {
        margin-bottom: 0;
      }

      &::before {
        content: counter(grid-ol-counter, decimal-leading-zero);
        position: absolute;
        top: -18px;
        left: -8px;
        font-size: 4rem;
        font-weight: 800;
        line-height: 1;
        background: linear-gradient(135deg, rgba(249, 81, 110, 0.25) 0%, rgba(205, 2, 107, 0.08) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        pointer-events: none;
        user-select: none;
        font-family: "Inter", -apple-system, sans-serif;
        letter-spacing: -0.04em;
        z-index: 0;

        @media ${(props) => props.theme.media.medium} {
          font-size: 4.5rem;
          top: -22px;
          left: -10px;
        }
      }

      p, strong, span {
        position: relative;
        z-index: 1;
      }

      strong {
        color: #1F1C27;
        font-weight: 700;
      }
    }
  }

  &.content-center {
    padding-top: 0;
    align-items: center;
  }
`;

export { GridItemTextStyled };

