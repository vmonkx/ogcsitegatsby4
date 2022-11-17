/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react";

import "@fontsource/inter/variable.css";
import "swiper/swiper.min.css";
import { theme } from "./src/theme/theme";
import { ThemeProvider } from "styled-components";
import { ModalProvider } from "./src/contexts/ModalProvider";
import { GlobalStyle } from "./src/components/Styled/GlobalStyled";
import WidgetChat from "./src/components/WidgetChat";

export function wrapPageElement({ element, props }) {
  return (
    <ThemeProvider {...props} theme={theme}>
      <GlobalStyle />

      <ModalProvider>{element}</ModalProvider>

      <WidgetChat />
    </ThemeProvider>
  );
}
//gatsby-browser.js

// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Приложение OGC clinic было обновлено. ` +
      `Хотите перезагрузить страницу чтобы увидеть новую версию?`
  );
  if (answer === true) {
    window.location.reload();
  }
};
