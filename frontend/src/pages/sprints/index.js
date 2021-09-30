/**
 * @file index.js
 * @brief Vista principal de un proyecto
 */
//! Librerías de React.js.
import React, { useEffect, useState } from "react";
//! API del frontend.
import { api } from "../../api";
import { Spinner } from "@chakra-ui/spinner";
import {
  Box,
  Heading,
  Flex,
  HStack,
  Text,
  VStack,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import Select from "react-select";

/**
 * Función que contiene el código de la vista
 * @param { props } param0
 * @returns React Component
 */
export default function Index({ props }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const [project, setProject] = useState(); //estado del proyecto
  const [userStories, setUserStories] = useState([]); //estado del proyecto

  //Al cargarse la pagina se busca el proyecto con el id del URL y se lo asigna a projectId
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then((res) => setProject(res))
      .catch((err) => console.log(err));

    api
      .getUserStories(projectId)
      .then((US) => setUserStories(US))
      .catch((err) => console.log(err));
    api.sprints.getSprints(projectId).then((e) => console.log(e));
  }, []);

  console.log(project);
  console.log(userStories);
  return (
    <Box
      minHeight="100vh"
      minWidth="full"
      bg={"#F5F4F5"}
      color="#2b2d42"
      d="flex"
      justifyContent="left"
      overflow="auto"
    >
      {/* sprints */}
      <VStack>
        <LinkBox
          display="flex"
          w="xs"
          height="200px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          fontSize="3xl"
          fontWeight="bold"
          bg="white"
          justifyContent="center"
          alignItems="center"
        >
          <LinkOverlay href="/sprint/">Crear sprint</LinkOverlay>
        </LinkBox>
      </VStack>
      {/* User stories sin asignar a un sprint */}
      <Grid></Grid>
    </Box>
  );
}
