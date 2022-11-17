import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import Container from "./Container"

const PagintionStyled = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;

  & > * {
    padding: 1rem;
    text-decoration: none;
   
    margin: 0;
    &[aria-current],
    &.current {
      color: ${props => props.theme.secondary};
    }
    &[disabled] {
      pointer-events: none;
      color: ${props => props.theme.primaryColor.color100};
    }
  }
`

function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize)

  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  const hasPrevPage = prevPage >= 1
  const hasNextPage = nextPage <= totalPages
  
  return (
    <Container>
      <PagintionStyled aria-label="pagination">
        <Link disabled={!hasPrevPage} to={`${base}/${currentPage - 1}`} aria-disabled={!hasPrevPage}>
          &#8592; Назад
        </Link>
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            className={currentPage === 1 && i === 0 ? "current" : ""}
            to={`${base}/${i > 0 ? i + 1 : ""}`}
            key={i}
          >
            {i + 1}
          </Link>
        ))}
        <Link disabled={!hasNextPage} to={`${base}/${currentPage + 1}`} aria-disabled={!hasPrevPage}>
          Вперед &#8594;
        </Link>
      </PagintionStyled>
    </Container>
  )
}

export default Pagination
