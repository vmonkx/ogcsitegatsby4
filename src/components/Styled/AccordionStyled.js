import styled from "styled-components"

const AccordionStyled = styled.div`
  font-size: 1rem;
  max-width: 920px;
  width: 100%;
  margin: 0 auto;
`

const AccordionItemStyled = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  .accordion-button {
    border: none;
    width: 100%;
    text-align: left;
    padding: 22px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    color: ${props => props.theme.black || '#111827'};
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.015em;
    transition: color 200ms ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: ${props => props.theme.secondaryColor ? props.theme.secondaryColor.color500 : (props.theme.secondary || '#e30277')};
      }
    }

    .accordion-heading {
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      letter-spacing: inherit;
    }
  }

  .accordion-icon {
    font-size: 1.35rem;
    color: ${props => props.theme.secondaryColor ? props.theme.secondaryColor.color500 : (props.theme.secondary || '#e30277')};
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    flex-shrink: 0;
  }
  
  .accordion-icon.active {
    transform: rotate(180deg);
  }

  .accordion-content {
    padding: 4px 8px 24px 8px;
  }
`

const AccordionContentStyled = styled.div``

export { AccordionStyled, AccordionItemStyled, AccordionContentStyled }
