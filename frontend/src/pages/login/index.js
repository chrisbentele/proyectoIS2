/**
 * @file index.js
 * @brief Página de login
 */
//! Componentes del Chakra UI
import { Center } from "@chakra-ui/react";
//! Librerías de React.js.
import React from "react";
//! Botón de login
import LoginButton from "../../components/auth/loginButton/loginButton";
//! Estilo para el login
import "./login.css";

/**
 * Función de la página de login
 * @returns React Component
 */
export default function Login() {
  return (
    <div className="loginContainer">
      <Center bg="white" h="100px" color="black">
        <LoginButton />
      </Center>
    </div>
  );
}
