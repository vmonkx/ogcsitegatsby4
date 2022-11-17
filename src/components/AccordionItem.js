import React, { useState } from "react"
import { AccordionItemStyled } from "./Styled/AccordionStyled"
import { BiListPlus } from "@react-icons/all-files/bi/BiListPlus"
import { BiListMinus } from "@react-icons/all-files/bi/BiListMinus"
import PriceListItem from "./PriceListItem"
import { motion, AnimatePresence } from "framer-motion"

function AccordionItem(props) {
  const { label, hiddenContent,itemID } = props
  const [visibility, setVisibility] = useState(false)

  const handleToggleVisibility = () => {
    setVisibility(prevVisibility => !prevVisibility)
  }

  const activeStatus = visibility ? "active" : ""
  return (
    <AccordionItemStyled role="presentation">
      <button className="accordion-button" onClick={handleToggleVisibility} aria-expanded={visibility} id={`accordion__title_${itemID}`}>
        <div className="accordion-icon">
          {visibility ? <BiListMinus /> : <BiListPlus />}
        </div>
        {label}
      </button>
      <AnimatePresence initial={false}>
        {visibility && (
          <motion.div
            key="active"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            
            variants={{
              open: {
                opacity: 1,
                height: "auto",
                y: 0,
                transition: {
                  y: { stiffness: 1000, velocity: -100 },
                },
              },
              collapsed: {
                opacity: 0,
                height: 0,
                y: 50,
                transition: {
                  y: { stiffness: 1000 },
                },
              },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className={`accordion-content ${activeStatus}`} id={`accordion__content_${itemID}`} role="region" aria-labelledby={`accordion__title_${itemID}`}>
              {hiddenContent.map(content => (
                <PriceListItem key={content.id} item={content} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AccordionItemStyled>
  )
}

export default AccordionItem
