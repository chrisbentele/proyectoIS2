import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./logoutButton.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      className="logoutButton"
      onClick={() => logout({ returnTo: "http://localhost:3000" })}
      borderRadius="4px"
      bg="buttonScale.800"
      color="richBlack"
      _hover={{
        background: "buttonScale.900",
        color: "#f7fff7",
      }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
