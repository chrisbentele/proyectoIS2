// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc

const theme = extendTheme({
  fonts: {
    body: "'zilla slab', sans-serif",
    heading: "'zilla slab',  sans-serif, ",
  },
  colors: {
    richBlack: "#0A100D",
    naplesYellow: "#FFE66D",
    buttonScale: {
      900: "#ff4747",
      800: "#ff6b6b",
      700: "#ff9999",
    },
    buttonScale: {
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
});

export default theme;
