import React from "react";
import { Route, useLocation, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/loginButton/loginButton";
import LogoutButton from "../auth/logoutButton/logoutButton";
import { Box, Flex, Heading } from "@chakra-ui/layout";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

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
      p="5px"
    >
      {isAuthenticated ? (
        <Flex justifyContent="center">
          <Box mr="auto">
            <LogoutButton />
          </Box>
          {location.pathname === "/" ? (
            <Box></Box>
          ) : (
            <Box mr="auto">
              {/* <Link to="/projects">Projects</Link> */}
              <Heading>
                <Link to="/">Trellon't</Link>
              </Heading>
            </Box>
          )}
        </Flex>
      ) : (
        <Box mr="auto">
          <LoginButton />
        </Box>
      )}
    </Box>
  );
};

export default Header;
