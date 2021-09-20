// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc

const theme = extendTheme({
  fonts: {
    body: "'Lato', sans-serif;",
    Heading: "'Lora',  sans-serif, ",
  },
  colors: {
    richBlack: "#151316",
    naplesYellow: "#FFE66D",
    buttonScale: {
      900: "#ff4747",
      800: "#ff6b6b",
      700: "#ff8585",
      600: "#ff9999",
    },
    aScale: {
      900: "#ff4747",
      800: "#ff6b6b",
      700: "#ff9999",
    },
    primaryScale: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
  ':focus:not(:focus-visible):not([role="dialog"]):not([role="menu"])': {
    boxShadow: "none !important",
  },
});

export default theme;
