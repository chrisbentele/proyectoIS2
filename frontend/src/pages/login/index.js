//Pagina de login

import { Center } from "@chakra-ui/react";
import React from "react";
import LoginButton from "../../components/auth/loginButton/loginButton";
import "./login.css";
export default function Login() {
  return (
    <div className="loginContainer">
      <Center bg="white" h="100px" color="black">
        <LoginButton />
      </Center>
    </div>
  );
}
