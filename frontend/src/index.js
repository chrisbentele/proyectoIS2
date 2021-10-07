/**
 * @file index.js
 * @brief Es el punto de entrada de la aplicación
 */
//! Librerías de React.js.
import React from "react";
//! Librerías de React para manejo del DOM.
import ReactDOM from "react-dom";
//! Componente principal de la aplicación.
import App from "./App";

//! Componente principal de Auth0.
import { Auth0Provider } from "@auth0/auth0-react";

import { ChakraProvider } from "@chakra-ui/react";

//! Tema principal de la apliación.
import Theme from "./styles/theme.js";

import { ProvideDbAuth } from "./providers/DbAuth";

/**
 * Función de renderiza toda la página
 * @param ninguno
 */
ReactDOM.render(
  <Auth0Provider
    domain="dev-bg7tosd2.us.auth0.com"
    clientId="NDaiadS9ELFv44LNSoGHpSX94CxurV2J"
    redirectUri={"http://localhost:3000/profile"}
    useRefreshTokens="true"
    cacheLocation="localstorage"
  >
    <ChakraProvider theme={Theme}>
      <ProvideDbAuth>
        <App />
      </ProvideDbAuth>
    </ChakraProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
