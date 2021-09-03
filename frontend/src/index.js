import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
import Theme from "./styles/theme.js";
import HookForm from "./pages/createProject/index";

ReactDOM.render(
  <Auth0Provider
    domain="dev-bg7tosd2.us.auth0.com"
    clientId="NDaiadS9ELFv44LNSoGHpSX94CxurV2J"
    redirectUri={"http://localhost:3000/profile"}
    useRefreshTokens="true"
    cacheLocation="localstorage"
  >
    <ChakraProvider theme={Theme}>
      <App />
    </ChakraProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
