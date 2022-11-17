import React, { useState } from "react";
import logo from "../images/logonew.svg";
import { Link, useStaticQuery, graphql } from "gatsby";

import Container from "./Container";
import { useModalWindow } from "../contexts/ModalProvider";
import { ButtonPrimary } from "./Styled/Button";
import {
  NavbarStyled,
  NavButtonStyled,
  NavLinkStyled,
  NavListStyled,
  NavToggleButton,
} from "./Styled/NavBarStyled";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { OutboundLink } from "gatsby-plugin-google-gtag";

function Navbar({ openModalSearch, setOpenModalSearch }) {
  const [isOpen, setNav] = useState();

  const { allStrapiNavigation } = useStaticQuery(graphql`
    query {
      allStrapiNavigation(sort: { fields: order }) {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  `);

  const navigations = allStrapiNavigation.edges;

  const toggleNav = () => {
    setNav((isOpen) => !isOpen);
  };

  const handleSearch = () => {
    setOpenModalSearch(true);
  };

  const { toggle } = useModalWindow();
  return (
    <NavbarStyled role="navigation">
      <div className="nav-background"></div>
      <Container>
        <div className="nav-content">
          <div className="nav-wrap-logo">
            <Link to="/" aria-label="Перейти на главную страницу">
              <img
                className="nav-logo"
                src={logo}
                alt="Логотип клиники OGC clinic"
                width="130"
                height="47"
              />
            </Link>
          </div>

          <NavListStyled id="nav__list" className={isOpen && "show-nav"}>
            {navigations.map(({ node }) => {
              return (
                <li key={node.id}>
                  <NavLinkStyled
                    to={`/${node.slug}`}
                    activeClassName="nav-link-active"
                    aria-label={`Перейти к ${node.name}`}
                  >
                    {node.name}
                  </NavLinkStyled>
                </li>
              );
            })}
            <li></li>
            <li>
              <OutboundLink
                className="nav-link-phone"
                href="tel:+78432060707"
                aria-label="Записаться по телефону"
              >
                <FaPhoneAlt className="icon-phone" />8 843 206-07-07
              </OutboundLink>
            </li>
          </NavListStyled>
          <NavButtonStyled onClick={handleSearch}>
            <FaSearch className={isOpen && "icon-search"} />
          </NavButtonStyled>
          <NavToggleButton
            className={isOpen && "show-nav"}
            title="Открыть/закрыть меню"
            aria-label="Открыть/закрыть меню"
            aria-expanded={isOpen}
            role="button"
            aria-controls="nav__list"
            onClick={toggleNav}
            type="button"
          >
            <div aria-hidden="true" className="bar"></div>
            <div aria-hidden="true" className="bar"></div>
          </NavToggleButton>
          <div>
            <ButtonPrimary
              onClick={toggle}
              aria-label="Записаться"
              id="add_to_order"
            >
              Записаться
            </ButtonPrimary>
          </div>
        </div>
      </Container>
    </NavbarStyled>
  );
}

export default Navbar;
