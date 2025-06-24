import React from "react"
import {GatsbyImage} from 'gatsby-plugin-image';
import { GridItemStyled } from "./Styled/GridItemStyled"
import { GridItemImageStyled } from "./Styled/GridItemImageStyled"




function GridItemImage(props) {
  const { image, alt } = props

  return (
    <GridItemStyled>
      <GridItemImageStyled>
        <GatsbyImage image={image} alt={alt}/>
        
      </GridItemImageStyled>
    </GridItemStyled>
  )
}

export default GridItemImage
