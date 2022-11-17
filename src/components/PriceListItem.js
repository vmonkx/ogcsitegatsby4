import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const PriceListItemStyled = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;

  padding: 13px 0 4px;
  margin-bottom: 1rem;

  .priceitem-title {
    font-size: 1rem;
    font-weight: 600;
    color: ${props => props.theme.primaryColor.color600};
    box-sizing: border-box;
    flex-grow: 10;
    flex-basis: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 753px) {
      flex-basis: 48%;
    }
  }

  .priceitem-descr {
    font: 1rem;

    color: ${props => props.theme.primaryColor.color500};
    color: ${props => props.theme.secondary};
    box-sizing: border-box;
    flex-grow: 3;
    margin: 0;
  }

  .priceitem-code {
    font-size: 13px;
    color: ${props => props.theme.secondary};
    color: ${props => props.theme.primaryColor.color500};
    display: block;
  }

  .priceitem-line {
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.theme.primaryColor.color600};
    text-align: center;
    flex-grow: 1;
    flex-basis: auto;
    border-bottom: 1px solid ${props => props.theme.primary};
    @media screen and (min-width: 753px) {
      flex-basis: 20%;
    }
  }

  .priceitem-price {
    font-size: 1rem;
    font-weight: 700;
    color: ${props => props.theme.primaryColor.color700};
    flex-basis: 100%;
    text-align: right;
    @media screen and (min-width: 753px) {
      flex-basis: 20%;
    }
  }
`

function PriceListItem({ item }) {
  return (
    <PriceListItemStyled
      variants={{ collapsed: { scale: 0.9 }, open: { scale: 1 } }}
      transition={{ duration: 0.7 }}
    >
      <p className="priceitem-title">
        {item.description}
        <span className="priceitem-descr">{item.name}</span>
        <span className="priceitem-code">{item.code}</span>
      </p>
      <span className="priceitem-line">{item.duration}</span>
      <span className="priceitem-price">{`${item.price} ₽`}</span>
    </PriceListItemStyled>
  )
}

export default PriceListItem
