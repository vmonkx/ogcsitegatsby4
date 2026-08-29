import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const PriceListItemStyled = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  
  transition: background-color 150ms cubic-bezier(0.23, 1, 0.32, 1);

  &:last-child {
    border-bottom: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: rgba(227, 2, 119, 0.025); /* Ultra-soft accent wash */
    }
    
    &:hover .priceitem-title-text, &:hover .priceitem-descr {
      color: ${props => props.theme.secondaryColor ? props.theme.secondaryColor.color500 : (props.theme.secondary || '#e30277')}; 
    }
  }

  .left-section {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    padding-right: 24px;
  }

  .priceitem-title-text {
    font-size: 1.05rem;
    font-weight: 500;
    color: ${props => props.theme.black || '#111827'};
    transition: color 200ms cubic-bezier(0.23, 1, 0.32, 1);
    line-height: 1.4;
    letter-spacing: -0.01em;
  }

  .priceitem-descr {
    display: block;
    font-size: 1.05rem;
    font-weight: 500;
    color: ${props => props.theme.black || '#111827'};
    transition: color 200ms cubic-bezier(0.23, 1, 0.32, 1);
    line-height: 1.4;
    letter-spacing: -0.01em;
  }

  .priceitem-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 2px;
  }

  .priceitem-code {
    opacity: 0.7;
    font-size: 0.775rem;
    letter-spacing: 0.03em;
  }

  .priceitem-duration {
    background-color: rgba(0, 0, 0, 0.04);
    color: #4b5563;
    padding: 2px 8px;
    border-radius: 9999px;
    font-weight: 500;
    font-size: 0.75rem;
    letter-spacing: 0.01em;
    display: inline-flex;
    align-items: center;
  }

  .right-section {
    flex-shrink: 0;
    text-align: right;
    padding-top: 2px;
  }

  .priceitem-price {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.black || '#111827'};
    white-space: nowrap;
    letter-spacing: -0.01em;
  }
`

function PriceListItem({ item }) {
  return (
    <PriceListItemStyled
      role="listitem"
      variants={{ collapsed: { opacity: 0, y: 8 }, open: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="left-section">
        <div className="priceitem-title">
          {item.description && <span className="priceitem-title-text">{item.description}</span>}
          {item.name && <span className="priceitem-descr">{item.name}</span>}
        </div>
        <div className="priceitem-meta">
          {item.code && <span className="priceitem-code">{item.code}</span>}
          {item.duration && <span className="priceitem-duration">{item.duration}</span>}
        </div>
      </div>
      
      <div className="right-section">
        <span className="priceitem-price">{`${item.price} ₽`}</span>
      </div>
    </PriceListItemStyled>
  )
}

export default PriceListItem
