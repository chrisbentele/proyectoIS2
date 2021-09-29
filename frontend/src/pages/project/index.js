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
  }, []);

  const moverUS = async (estado, id) => {
    console.log(estado);
    console.log(id);
    await api.cambiarEstadoUS({ projectId, estado, usId });
    api.getUserStories(projectId).then((uss) => setUserStories(uss));
  };

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
      {project ? ( //si ya se cargo el proyecto se muestra el mismo, si no se muestra la pantalla de carga
        <Box>
          <Box
            pos="fixed"
            top="55px"
            zIndex="100"
            bg={"#F7FFF7"}
            left="0"
            right="0"
            // boxShadow="md"
            width="full"
            pl="3"
            mb="3rem"
          >
            <HStack spacing="24px" fontSize="2xl">
              <Box>
                {/* <Link to="/projects">Projects</Link> */}
                <Text fontWeight="medium">{project.nombre}</Text>
              </Box>
              <Text fontWeight="medium">
                <Link to={`${projectId}/members`}>Miembros</Link>
              </Text>
              <Text fontWeight="medium">
                <Link to={`${projectId}/roles`}>Configurar roles</Link>
              </Text>
            </HStack>
          </Box>
          <Box mt="50px">
            <Box
              borderRadius="4px"
              bg="buttonScale.800"
              color="richBlack"
              width="max-content"
              p={("2", "2", "2", "2")}
              fontWeight="600"
              m="0"
            >
              <Link to={`${projectId}/createUS`} width="fit-content">
                + agregar nueva tarjeta
              </Link>
            </Box>
            <HStack p="5">
              <Box
                w="xs"
                minHeight="100px"
                maxHeight="80%"
                borderWidth="1px"
                borderRadius="lg"
                fontSize="2xl"
                bg="white"
                justifyContent="center"
              >
                <Flex justify="center">
                  <Heading fontSize="3xl">To Do</Heading>
                </Flex>
                {userStories
                  ? userStories
                      .filter((us) => us.estado == 0)
                      .map((us) => (
                        <Box
                          border="2px"
                          borderRadius="8"
                          p="2"
                          m="2"
                          key={us.id}
                        >
                          <Text fontSize="25px" fontWeight="semibold">
                            {us.nombre}
                          </Text>
                          <p>{us.contenido}</p>
                          <Select
                            onChange={(e) => {
                              moverUS(e.value, us.id);
                            }}
                            options={[
                              // { value: "0", label: "To do" },
                              { value: "1", label: "Doing" },
                              { value: "2", label: "Done" },
                              { value: "4", label: "Backlog" },
                            ]}
                          />
                        </Box>
                      ))
                  : null}
                {/* <Box p="5">
                <Link to={`${projectId}/createUS`}>
                  + agregar nueva tarjeta
                </Link>
              </Box> */}
              </Box>
              <Box
                w="xs"
                minHeight="100px"
                maxHeight="80%"
                borderWidth="1px"
                borderRadius="lg"
                fontSize="2xl"
                bg="white"
                justifyContent="center"
              >
                <Flex justify="center">
                  <Heading fontSize="3xl">Doing</Heading>
                </Flex>
                {userStories
                  ? userStories
                      .filter((us) => us.estado == 1)
                      .map((us) => (
                        <Box
                          border="2px"
                          borderRadius="8"
                          p="2"
                          m="2"
                          key={us.id}
                        >
                          <Text fontSize="25px" fontWeight="semibold">
                            {us.nombre}
                          </Text>
                          <p>{us.contenido}</p>
                          <Select
                            onChange={(e) => {
                              moverUS(e.value, us.id);
                            }}
                            options={[
                              { value: "0", label: "To do" },
                              // { value: "1", label: "Doing" },
                              { value: "2", label: "Done" },
                              { value: "4", label: "Backlog" },
                            ]}
                          />
                        </Box>
                      ))
                  : null}
                {/* <Box p="5">
                <Link to={`${projectId}/createUS`}>
                  + agregar nueva tarjeta
                </Link>
              </Box> */}
              </Box>
              <Box
                w="xs"
                minHeight="100px"
                maxHeight="80%"
                borderWidth="1px"
                borderRadius="lg"
                fontSize="2xl"
                bg="white"
                justifyContent="center"
              >
                <Flex justify="center">
                  <Heading fontSize="3xl">Done</Heading>
                </Flex>
                {userStories
                  ? userStories
                      .filter((us) => us.estado == 2)
                      .map((us) => (
                        <Box
                          border="2px"
                          borderRadius="8"
                          p="2"
                          m="2"
                          key={us.id}
                        >
                          <Text fontSize="25px" fontWeight="semibold">
                            {us.nombre}
                          </Text>
                          <p>{us.contenido}</p>
                          <Select
                            onChange={(e) => {
                              moverUS(e.value, us.id);
                            }}
                            options={[
                              { value: "0", label: "To do" },
                              { value: "1", label: "Doing" },
                              // { value: "2", label: "Done" },
                              { value: "4", label: "Backlog" },
                            ]}
                          />
                        </Box>
                      ))
                  : null}
                {/* <Box p="5">
                <Link to={`${projectId}/createUS`}>
                  + agregar nueva tarjeta
                </Link>
              </Box> */}
              </Box>
              <Box
                w="xs"
                minHeight="100px"
                maxHeight="80%"
                borderWidth="1px"
                borderRadius="lg"
                fontSize="2xl"
                bg="white"
                justifyContent="center"
              >
                <Flex justify="center">
                  <Heading fontSize="3xl">Backlog</Heading>
                </Flex>
                {userStories
                  ? userStories
                      .filter((us) => us.estado == 4)
                      .map((us) => (
                        <Box
                          border="2px"
                          borderRadius="8"
                          p="2"
                          m="2"
                          key={us.id}
                        >
                          <Text fontSize="25px" fontWeight="semibold">
                            {us.nombre}
                          </Text>
                          <p>{us.contenido}</p>
                          <Select
                            onChange={(e) => {
                              moverUS(e.value, us.id);
                            }}
                            options={[
                              // { value: "4", label: "Backlog" },
                              { value: "0", label: "To do" },
                              { value: "1", label: "Doing" },
                              { value: "2", label: "Done" },
                            ]}
                          />
                        </Box>
                      ))
                  : null}
              </Box>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
}
