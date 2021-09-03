import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/loginButton/loginButton";
import LogoutButton from "../auth/logoutButton/logoutButton";
import { Box } from "@chakra-ui/layout";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Box
      pos="fixed"
      as="header"
      top="0"
      zIndex="100"
      bg={"#F7FFF7"}
      left="0"
      right="0"
      boxShadow="md"
      width="full"
      height="3rem"
    >
      {isAuthenticated ? (
        <Box>
          <Link to="/projects">Projects</Link>
          <Link to="/roles">Roles</Link>
          <LogoutButton />
        </Box>
      ) : (
        <Box>
          <LoginButton />
        </Box>
      )}
    </Box>
  );
};

export default Header;
