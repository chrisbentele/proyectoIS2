import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function Index() {
  const [state, setState] = useState({ description: "", show: false });
  function handleError() {}
  return state.show ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{state.description}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setState({ ...state, show: false })}
      />
    </Alert>
  ) : null;
}
