import React, { useEffect, useState } from "react";
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

export default function Index({ props, dispatchError }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const [project, setProject] = useState({ userStories: [] }); //estado del proyecto

  //Al cargarse la pagina se busca el proyecto con el id del URL y se lo asigna a projectId
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then(({data}) => setProject({ ...project, ...data }))
      .catch((err) =>
        dispatchError(null, "No se ha podido cargar el proyecto")
      );
    api
      .getUserStories(projectId)
      .then(({data}) => setProject({ ...project, userStories: data }))
      .catch((err) => dispatchError(null, "error cargando USs"));
  }, []);
  console.log(project);
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
            top="50px"
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
          <HStack pl="5" pr="5" mt="8rem">
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
              <VStack>
                <LinkBox
                  to={`${projectId}/createUS`}
                  pt="2px"
                  pl="2"
                  pr="2"
                  borderRadius="5"
                  m="10px"
                  _hover={{
                    background: "#F5F4F5",
                    color: "teal.500",
                  }}
                >
                  <LinkOverlay href={`${projectId}/createUS`}>
                    + agregar nueva tarjeta
                  </LinkOverlay>
                </LinkBox>
              </VStack>
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
              <VStack>
                <LinkBox
                  to={`${projectId}/createUS`}
                  pt="2px"
                  pl="2"
                  pr="2"
                  borderRadius="5"
                  m="10px"
                  _hover={{
                    background: "#F5F4F5",
                    color: "teal.500",
                  }}
                >
                  <LinkOverlay href={`${projectId}/createUS`}>
                    + agregar nueva tarjeta
                  </LinkOverlay>
                </LinkBox>
              </VStack>
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
              <VStack>
                <LinkBox
                  to={`${projectId}/createUS`}
                  pt="2px"
                  pl="2"
                  pr="2"
                  borderRadius="5"
                  m="10px"
                  _hover={{
                    background: "#F5F4F5",
                    color: "teal.500",
                  }}
                >
                  <LinkOverlay href={`${projectId}/createUS`}>
                    + agregar nueva tarjeta
                  </LinkOverlay>
                </LinkBox>
              </VStack>
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
                <Heading fontSize="3xl">Todas las US</Heading>
              </Flex>
              {project.userStories
                ? project.userStories.map((us) => <p>{us.nombre}</p>)
                : null}
            </Box>
          </HStack>
        </Box>
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
}
