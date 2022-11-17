/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require("react");
require("@fontsource/inter/variable-full.css");
const { theme } = require("./src/theme/theme");
const { ThemeProvider } = require("styled-components");
const { ModalProvider } = require("./src/contexts/ModalProvider");
const { GlobalStyle } = require("./src/components/Styled/GlobalStyled");

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([<div key={"portal"} id={"portal"}></div>]);
};

exports.wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider {...props} theme={theme}>
      <GlobalStyle />
      <ModalProvider>{element}</ModalProvider>
    </ThemeProvider>
  );
};
