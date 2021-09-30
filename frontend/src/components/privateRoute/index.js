/**
 * @file index.js
 * @brief Componente carga de página e inicio de sesión
 */

import { useAuth0 } from "@auth0/auth0-react";
import { Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const Component = rest.component;
  console.log(rest);
  const info = { ...rest, component: null };
  return (
    <Route
      render={({ location }) =>
        !isLoading ? (
          isAuthenticated ? (
            <Component props={info} />
          ) : (
            loginWithRedirect()
          )
        ) : (
          "Loading"
        )
      }
    />
  );
}
