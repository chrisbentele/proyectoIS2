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
      bg="#FF6B6B"
      color="#f7fff7"
      _hover={{
        background: "#f7fff7",
        color: "#0A100D",
      }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
