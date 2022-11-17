const theme = {
  primary: "#767480",
  secondary: "#e30277",
  black: "#393939",
  textColor: "#605f5f",
  primaryButton: "#787391",
  primaryButtonHover: "rgb(93, 87, 116)",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  white: "#fff",
  bgColorPrimary: "#d8d4df",
  bgColorSecondary: "#ffe2f6",
  maxWidth: "960px",
  borderRadius: "30px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  marker: "rgba(205, 2, 107, 1)",

  glassBackground:
    "backdrop-filter: saturate(180%) blur(20px);background-color: rgba(255, 255, 255, 0.72);",

  primaryTextGradient: `
  color: ${(props) => props.theme.primaryColor.color400}; 
  background: linear-gradient(20deg, #bdc3c7, #6c697c);
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  background-clip: text;`,

  secondaryTextGradient: `
  color: ${(props) => props.theme.secondaryColor.color500};
  background-image: linear-gradient(
    20deg,
    rgba(205, 2, 107, 1) 0%,
    rgba(249, 81, 110, 1) 100%
  );
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;`,

  primaryGradient:
    "linear-gradient(0deg, rgba(249, 81, 110, 1) 0%, rgba(205, 2, 107, 1) 100%)",
  secondaryGradient:
    "linear-gradient(305deg,#ff3cac 0%,#784ba0 50%, rgba(159, 145, 172, 1) 100%)",

  imageAnim: "transform 2.2s cubic-bezier(0.14, 1.12, 0.67, 0.99) 0s",

  primaryColor: {
    color50: "#f5effb",
    color100: "#d8d4df",
    color200: "#bcbac6",
    color300: "#a19eae",
    color400: "#868295",
    color500: "#6c697c",
    color600: "#545161",
    color700: "#3c3a46",
    color800: "#24232d",
    color900: "#0b0b16",
  },

  secondaryColor: {
    color50: "#ffe2f6",
    color100: "#ffb1db",
    color200: "#ff7fc2",
    color300: "#fe4da9",
    color400: "#fd1c90",
    color500: "#e30277",
    color600: "#b2005c",
    color700: "#800042",
    color800: "#4f0028",
    color900: "#1f000f",
  },

  media: {
    retina: "(min-width: 1440px)",
    extraLarge: "(min-width: 1024px)",
    large: "(min-width: 960px)",
    medium: "(min-width: 767px)",
    small: "(min-width: 590px)",
  },
};

export { theme };
