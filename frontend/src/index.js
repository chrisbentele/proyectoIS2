import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "./styles/theme.js";

ReactDOM.render(
  <Auth0Provider
    domain="dev-bg7tosd2.us.auth0.com"
    clientId="NDaiadS9ELFv44LNSoGHpSX94CxurV2J"
    redirectUri={"http://localhost:3000/profile"}
    useRefreshTokens="true"
    cacheLocation="localstorage"
  >
    <div>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <ChakraProvider theme={Theme}>
        <App />
      </ChakraProvider>
    </div>
  </Auth0Provider>,
  document.getElementById("root")
);
