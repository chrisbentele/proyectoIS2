/**
 * @file index.js
 * @brief Componente carga de página e inicio de sesión
 */
import { useToast } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const toast = useToast();
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const Component = rest.component;
  const info = { ...rest, component: null };
  const dispatchError = (title, message) => {
    return toast({
      title: title ? title : "Error",
      description: message,
      status: "error",
      position: "top",
      duration: 4000,
      isClosable: true,
    });
  };
  return (
    <Route
      render={({ location }) =>
        !isLoading ? (
          isAuthenticated ? (
            <Component props={info} dispatchError={dispatchError} />
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
