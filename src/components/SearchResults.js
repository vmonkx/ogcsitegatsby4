import React, { useRef, useState } from "react";
import styled from "styled-components";
import SearchService from "./SearchService";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import { graphql, useStaticQuery } from "gatsby";
import { useFlexSearch } from "../hooks/useFlexSearch";
import SearchServiceList from "./SearchServiceList";
import { useOnClickOutside, useOnKeypress } from "../hooks/useOnClickOutside";

const SearchModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 700px;
  margin: 5.5rem auto;
  height: 100vh;
`;

const SearchModal = styled.div`
  position: relative;
  margin: auto;
  max-height: 100%;
  max-width: 42rem;
  border-radius: 0.375rem;
  padding: 2rem 1rem;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255, 255, 255, 0.72);
  z-index: 10;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const SearchModalContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background: none;
  font-size: 2rem;
  &:hover {
    color: ${(props) => props.theme.secondary};
  }
`;

const ResultsContainer = styled.div`
  max-height: 30vh;
  overflow-y: auto;
`;

function SearchResults({ setOpenModalSearch, openModal }) {
  const data = useStaticQuery(graphql`
    query LocalSearchQuery {
      localSearchPages {
        index
        store
      }
    }
  `);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    localSearchPages: { index, store },
  } = data;

  const results = useFlexSearch(searchQuery, index, store);

  const modal = useRef();

  const handleCloseModal = () => {
    setOpenModalSearch(false);
  };

  useOnClickOutside(modal, handleCloseModal);
  useOnKeypress(modal, handleCloseModal);
  const hasNoResults = searchQuery.length > 0 && results.length === 0;

  return (
    <SearchModalWrapper>
      <SearchModal ref={modal}>
        <SearchModalContainer>
          <CloseButton onClick={handleCloseModal}>
            <MdClose />
          </CloseButton>
          <SearchService
            openModal={openModal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </SearchModalContainer>
        {results.length > 0 && (
          <ResultsContainer>
            <h4>Вот что мне удалось найти:</h4>
            <SearchServiceList services={results} />
          </ResultsContainer>
        )}
        {hasNoResults && (
          <div>
            <p>Ничего не найдено</p>
          </div>
        )}
      </SearchModal>
    </SearchModalWrapper>
  );
}

export default SearchResults;
