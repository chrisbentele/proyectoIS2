/**
 * @file index.js
 * @brief Pagina de 404 Not Found, cuando un URL es erróneo.
 */
//! Librerías de React.js.
import React from "react";
import { Box, Heading } from "@chakra-ui/react";
/**
 * Función de React para la página 404
 * @returns React Component
 */
export default function NotFound() {
  return (
    <Box
      minHeight="100vh"
      minWidth="full"
      bg={"#FAFAFA"}
      color="#2b2d42"
      d="flex"
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      top="55px"
    >
      <Heading size="4xl">Pagina no encontrada 😪 </Heading>
    </Box>
  );
}
