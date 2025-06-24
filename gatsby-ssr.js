/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require("react");
require("@fontsource-variable/inter");
const { theme } = require("./src/theme/theme");
const { ThemeProvider, StyleSheetManager } = require("styled-components");
const { ModalProvider } = require("./src/contexts/ModalProvider");
const { GlobalStyle } = require("./src/components/Styled/GlobalStyled");

exports.onRenderBody = ({ setPostBodyComponents, setHtmlAttributes }) => {
  setPostBodyComponents([<div key={"portal"} id={"portal"}></div>]);
  setHtmlAttributes({ lang: "ru" });
};

exports.wrapPageElement = ({ element, props }) => {
  return (
    <StyleSheetManager>
      <ThemeProvider {...props} theme={theme}>
        <GlobalStyle />
        <ModalProvider>{element}</ModalProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

// // This implements the default behavior from styled-components v5
// function shouldForwardProp(propName, target) {
// 	if (typeof target === "string") {
// 		// For HTML elements, forward the prop if it is a valid HTML attribute
// 		return isPropValid(propName)
// 	}
// 	// For other elements, forward all props
// 	return true
// }
