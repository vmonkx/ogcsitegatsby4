import React from "react";
import { Link } from "gatsby";
import {
  FooterStyled,
  FooterWrap,
  FooterRow,
  FooterImageWrap,
  FooterLogo,
  FooterText,
} from "./Styled/FooterStyled";
import logo from "../images/logonew_footer.svg";

function Footer() {
  return (
    <FooterStyled>
      <FooterWrap>
        <FooterImageWrap>
          <Link to="/">
            <FooterLogo
              width="130"
              height="47"
              src={logo}
              alt="Клиника доктора Горчаковой"
            />
          </Link>
        </FooterImageWrap>

        <FooterRow>
          <FooterText>
            О ВОЗМОЖНЫХ ПРОТИВОПОКАЗАНИЯХ НЕОБХОДИМО ПРОКОНСУЛЬТИРОВАТЬСЯ С
            ВРАЧОМ ВСЯ ПРЕДСТАВЛЕННАЯ НА САЙТЕ ИНФОРМАЦИЯ, НОСИТ ИНФОРМАЦИОННЫЙ
            ХАРАКТЕР И НЕ ЯВЛЯЕТСЯ ПУБЛИЧНОЙ ОФЕРТОЙ.
          </FooterText>
          <FooterText>
            © {new Date().getFullYear()} Клиника доктора Горчаковой. All Rights
            Reserved
          </FooterText>
        </FooterRow>
      </FooterWrap>
    </FooterStyled>
  );
}

export default Footer;
