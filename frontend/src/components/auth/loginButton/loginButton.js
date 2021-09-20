/**
 * @file loginButton.js
 * @brief Botón de inicio de sesión
 */

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className="loginButton"
      onClick={() => loginWithRedirect()}
      borderRadius="4px"
      bg="buttonScale.800"
      color="richBlack"
      _hover={{
        background: "buttonScale.900",
        color: "#f7fff7",
      }}
    >
      {props.title}
    </Button>
  );
};

LoginButton.defaultProps = {
  title: 'Log In'
}

export default LoginButton;
