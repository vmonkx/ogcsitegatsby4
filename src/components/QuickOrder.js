import React from "react"
import styled from "styled-components"
import { useModalWindow } from "../contexts/ModalProvider"
import { ButtonSecondary } from "./Styled/Button"
import { Section } from "./Styled/Section"

const OrderBox = styled.div`
  margin: 0 auto;
  padding: 40px 40px 40px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 0 33px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  align-items: center;
`

const OrderHeader = styled.h3`
  width: 100%;
  margin: 0 auto;
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  background-image: linear-gradient(
    20deg,
    rgba(205, 2, 107, 1) 0%,
    rgba(249, 81, 110, 1) 100%
  );
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`

const OrderDescr = styled.p`
  margin: 0;
`

const OrderItem = styled.div`
  display: grid;
  padding: initial;
  width: auto;
`

function QuickOrder() {
  const { toggle } = useModalWindow()
  return (
    <Section>
      <OrderBox>
        <OrderItem>
          <OrderHeader>
            Курс: подбирается индивидуально после консультации
          </OrderHeader>
        </OrderItem>
        <OrderItem>
          <OrderDescr>
            Запишитесь на персональную консультацию специалиста по красоте
            бесплатно
          </OrderDescr>
        </OrderItem>
        <OrderItem>
          <ButtonSecondary onClick={toggle}>Записаться</ButtonSecondary>
        </OrderItem>
      </OrderBox>
    </Section>
  )
}

export default QuickOrder
