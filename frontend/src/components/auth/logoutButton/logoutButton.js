/**
 * @file logoutButton.js
 * @brief Botón de cerrar sesión
 */

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import "./logoutButton.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const [isOpen, setIsOpen] = useState()
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  return (
    <>
    <Button
      className="logoutButton"
      onClick={() => setIsOpen(true)}
      borderRadius="4px"
      bg="buttonScale.800"
      color="richBlack"
      _hover={{
        background: "buttonScale.900",
        color: "#f7fff7",
      }}
    >
      Cerrar sesión
    </Button>
    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Cerrar Sesión
        </AlertDialogHeader>

        <AlertDialogBody>
          ¿Está seguro que desea cerrar sesión?
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={() => logout({ returnTo: "http://localhost:3000" })} ml={3}>
            Salir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
  </>
  );
};

export default LogoutButton;
