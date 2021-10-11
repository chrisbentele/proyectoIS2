/**
 * @file goBack.js
 * @brief Botón de regresar
 */

import React, { useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import { useHistory } from "react-router";

const GoBack = ({ ruta, title, ...props }) => {
  const { isLoading } = useState();
  const history = useHistory();

  return (
    <Button
      onClick={() => history.push(ruta)}
      borderRadius="4px"
      bg="buttonScale.800"
      color="richBlack"
      _hover={{
        background: "buttonScale.900",
        color: "#f7fff7",
      }}
      isLoading={isLoading}
      {...props}
    >
      {title}
    </Button>
  );
};

GoBack.defaultProps = {
  title: "Volver",
};

export default GoBack;
