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

exports.onRenderBody = ({
  setHeadComponents,
  setPreBodyComponents,
  setPostBodyComponents,
  setHtmlAttributes,
}) => {
  setPostBodyComponents([<div key={"portal"} id={"portal"}></div>]);
  setHtmlAttributes({ lang: "ru" });

  const config = {
    trackingId: process.env.YA_TRACKING_ID, // ваш ID счетчика
    clickmap: true,
    trackLinks: true,
    defer: true,
    accurateTrackBounce: true,
    ssr: true,
    afterBody: process.env.YA_AFTER_BODY,
  };

  if (process.env.NODE_ENV !== "production" || !config.trackingId) {
    return null;
  }

  // Preconnect для оптимизации загрузки
  setHeadComponents([
    <link
      rel="preconnect dns-prefetch"
      key="preconnect-yandex-metrika"
      href="https://mc.yandex.ru"
    />,
  ]);

  // Выбираем куда вставлять скрипт
  const setComponents = config.afterBody
    ? setPostBodyComponents
    : setPreBodyComponents;

  return setComponents([
    <script
      key="gatsby-yandex-metrika"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${config.trackingId}', 'ym');

    ym(${config.trackingId}, 'init', {
        ssr: ${config.ssr},
        clickmap: ${config.clickmap},
        accurateTrackBounce: ${config.accurateTrackBounce},
        trackLinks: ${config.trackLinks}
    });
`,
      }}
    />,
    <noscript key="gatsby-yandex-metrika-noscript">
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${config.trackingId}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>,
  ]);
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
