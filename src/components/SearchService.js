import React, { useRef, useEffect } from "react";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { InputStyled } from "./Styled/InputStyled";
import styled from "styled-components";

const SearchServiceStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SearchIconStyled = styled.div`
  margin-top: 0.25rem;
  padding: 0.5rem;
`;

function SearchService({ openModal, searchQuery, setSearchQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    if (openModal) {
      inputEl.current.focus();
    }
  }, [openModal]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <SearchServiceStyled>
      <SearchIconStyled>
        <FaSearch />
      </SearchIconStyled>

      <InputStyled
        type="text"
        value={searchQuery}
        placeholder="Я ищу процедуру"
        onChange={handleSearchQuery}
      />
    </SearchServiceStyled>
  );
}

export default SearchService;
