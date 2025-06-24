import styled from "styled-components"

const AccordionStyled = styled.div`
  font-size: 1rem;
  
`
const AccordionItemStyled = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  .accordion-button {
    border: 0;
    width: 100%;
    text-align: left;
    padding-left: 30px;

    font-size: 1.2rem;
    background-color: transparent;
    position: relative;
    color: ${props => props.theme.primaryColor.color500};
    font-weight: 500;
    .accordion-icon {
      position: absolute;

      top: 2px;
      left: 0;

      font-size: 1.5rem;
      color: ${props => props.theme.secondary};
    }
  }

  

  .accordion-content {
    padding: 0 20px;
    opacity: 0;

    height: 0;
    margin: 0;
    margin-top: -10px;

    border-top: 0;
  }

  .accordion-content.active {
    height: auto;
    opacity: 1;
    padding: 20px 5px;
  }
`

const AccordionContentStyled = styled.div``

export { AccordionStyled, AccordionItemStyled, AccordionContentStyled }
