import React from 'react'
import styled from 'styled-components'

const CategoryListStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(280px,1fr));
    column-gap: 2rem;
    row-gap: 2rem;
    margin-bottom: 50px;
`

function CategoryList({children}) {
    return (
        <CategoryListStyled>
            {children}
        </CategoryListStyled>
    )
}

export default CategoryList
