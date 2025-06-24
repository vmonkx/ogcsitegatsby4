import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import SearchResults from "./SearchResults";

const HeaderStyled = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const Header = () => {
  const [openModalSearch, setOpenModalSearch] = useState(false);
  return (
    <HeaderStyled>
      <Navbar
        openModalSearch={openModalSearch}
        setOpenModalSearch={setOpenModalSearch}
      />
      {openModalSearch && (
        <SearchResults
          openModalSearch={openModalSearch}
          setOpenModalSearch={setOpenModalSearch}
        />
      )}
    </HeaderStyled>
  );
};

export default Header;
