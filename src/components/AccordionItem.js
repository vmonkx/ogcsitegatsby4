import React, { useState } from "react"
import { AccordionItemStyled } from "./Styled/AccordionStyled"
import { BiChevronDown } from "@react-icons/all-files/bi/BiChevronDown"
import PriceListItem from "./PriceListItem"
import { motion } from "framer-motion"

function AccordionItem(props) {
  const { label, hiddenContent, itemID } = props
  const [visibility, setVisibility] = useState(false)

  const handleToggleVisibility = () => {
    setVisibility(prevVisibility => !prevVisibility)
  }

  const activeStatus = visibility ? "active" : ""
  return (
    <AccordionItemStyled role="presentation">
      <button 
        className={`accordion-button ${activeStatus}`} 
        onClick={handleToggleVisibility} 
        aria-expanded={visibility} 
        id={`accordion__title_${itemID}`}
      >
        <h3 className="accordion-heading">{label}</h3>
        <div className={`accordion-icon ${activeStatus}`}>
          <BiChevronDown />
        </div>
      </button>
      <motion.div
        initial="collapsed"
        animate={visibility ? "open" : "collapsed"}
        style={{ overflow: "hidden" }}
        variants={{
          open: {
            opacity: 1,
            height: "auto",
            display: "block",
            transition: {
              height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.3, delay: 0.1 },
              staggerChildren: 0.05, /* Stagger delay for items */
            },
          },
          collapsed: {
            opacity: 0,
            height: 0,
            transitionEnd: { display: "none" },
            transition: {
              height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98], delay: 0.1 },
              opacity: { duration: 0.2 },
              staggerChildren: 0.02,
              staggerDirection: -1,
            },
          },
        }}
      >
        <div className={`accordion-content ${activeStatus}`} id={`accordion__content_${itemID}`} role="list" aria-labelledby={`accordion__title_${itemID}`}>
          {hiddenContent.map(content => (
            <PriceListItem key={content.id} item={content} />
          ))}
        </div>
      </motion.div>
    </AccordionItemStyled>
  )
}

export default AccordionItem
