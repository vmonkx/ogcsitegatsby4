import { Link } from "gatsby";
import styled, { css } from "styled-components";

const NavbarStyled = styled.nav`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  z-index: 100;

  .nav-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(255, 255, 255, 0.72);
  }

  .nav-content {
    margin: 0px auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    z-index: 2;
  }

  .nav-wrap-logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 1rem;
  }

  .nav-logo {
    width: 137px;
    height: 43px;
    margin-bottom: 0;
  }
`;

const NavListStyled = styled.ul`
  position: fixed;
  top: 79px;
  width: 100%;
  left: 0;
  margin-left: 0;
  margin-bottom: 0;
  list-style-type: none;
  height: 0;
  overflow: hidden;
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

  &.show-nav {
    height: 100%;
    width: 100%;
    backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(255, 255, 255, 0.72);
    transform: translateX(0);
  }

  a {
    font-size: 1rem;
    display: block;
    padding: 1rem 1.25rem;
    text-decoration: none;
    color: #545161;
  }

  .nav-link-phone {
    font-weight: 600;
    padding-left: 1rem;
    margin: 10px 0;

    .icon-phone {
      margin-right: 8px;
    }
  }

  @media ${(props) => props.theme.media.extraLarge} {
    position: static;
    flex-grow: 1;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: none;

    li {
      padding: 0 0.2rem;
      margin-right: 1rem;
      margin-bottom: 0;
    }

    a {
      padding: 0;
      margin: 0;
    }
  }
`;

const NavItemStyles = css`
  display: block;
  position: relative;
  user-select: none;
  padding: 15px 10px;
  cursor: pointer;
  color: #605f5f;
  font-weight: 500;
  margin: 0;

  &:hover {
    color: ${(props) => props.theme.secondary};
    ${(props) => props.theme.secondaryTextGradient};
    background-position: 0%;
    background-size: 340% 100%;

    &:hover::after {
      background-image: ${(props) => props.theme.primaryGradient};
      transform: scaleX(1);
      transform-origin: 0 50%;
    }
  }

  &::after {
    position: absolute;
    display: block;
    transform: scaleX(0);
    bottom: -5px;
    left: 0;
    background: ${(props) => props.theme.primaryGradient};
    width: 100%;
    content: "";
    height: 2px;
    transition: -webkit-transform 250ms ease-in-out;
    transition: transform 250ms ease-in-out;
    transition: transform 250ms ease-in-out, -webkit-transform 250ms ease-in-out;
    transform-origin: 100% 50%;
  }
`;

const NavLinkStyled = styled(Link)`
  ${NavItemStyles}

  &.nav-link-active {
    color: #605f5f;
    ${(props) => props.theme.secondaryTextGradient}

    background-position: 0%;
    background-size: 340% 100%;
    font-weight: 700;
  }
`;

const NavButtonStyled = styled.button`
  ${NavItemStyles}
  margin-left: auto;
  margin-right: 1rem;
  background: transparent;

  @media ${(props) => props.theme.media.large} {
    padding: 0;
    margin-right: 1rem;
  }

  @media ${(props) => props.theme.media.retina} {
   
    margin-right: 2rem;
  }
`;

const NavButton = styled.button`
  margin: 0;
  border: none;
  border-radius: 0.375rem;
  width: 100%;
  overflow: visible;
  display: block;
  color: inherit;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7rem;
  text-align: center;
  text-decoration: none;
  transition: 0.1s ease-in-out;
  transition-property: color, background-color, border-color;
  background-color: #9f9cac;
  cursor: pointer;
  padding: 0.25rem 1rem;
  color: #fff;

  &:hover {
    background-color: rgb(134, 131, 145);
    box-shadow: none;
  }
`;

const NavToggleButton = styled.button`
  cursor: pointer;
  
  margin-right: 1rem;
  outline: none;
  background-color: transparent;

  .bar {
    width: 25px;
    height: 2px;
    background: black;
    transition: 0.3s cubic-bezier(0.63, -0.18, 0.44, 1.17);
    &:first-child {
      margin-bottom: 8px;
    }
  }

  &.show-nav .bar:first-child {
    transform: translateY(5px) rotate(45deg);
  }

  &.show-nav .bar:last-child {
    transform: translateY(-5px) rotate(-45deg);
  }

  @media ${(props) => props.theme.media.extraLarge} {
    display: none;
  }
`;

export {
  NavbarStyled,
  NavLinkStyled,
  NavButton,
  NavListStyled,
  NavToggleButton,
  NavButtonStyled,
};
