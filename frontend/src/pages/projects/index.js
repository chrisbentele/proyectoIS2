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
  Flex,
  HStack,
  Text,
  VStack,
  LinkBox,
  LinkOverlay,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { mapStateColor } from "../../styles/theme";
import USList from "../../components/userStoryListUnset/userStoryListUnset";
import { useHistory } from "react-router-dom";
import { MdBuild } from "react-icons/md";

/**
 * Función que contiene el código de la vista
 * @param { props } param0
 * @returns React Component
 */
export default function Index({ props }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const [project, setProject] = useState(); //estado del proyecto
  const [userStories, setUserStories] = useState([]); //estado del proyecto
  const [sprints, setSprints] = useState([]); //estado del proyecto

  const history = useHistory();

  //Al cargarse la pagina se busca el proyecto con el id del URL y se lo asigna a projectId
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then((res) => setProject(res.data))
      .catch((err) => console.log(err));

    api
      .getUserStories(projectId)
      .then((US) => setUserStories(US.data))
      .catch((err) => console.log(err));
    api.sprints.getSprints(projectId).then((e) => console.log(e.data));
  }, []);

  const onCrearSprint = () => {
    console.log("a");
  };

  return (
    <Box
      minHeight="100vh"
      minWidth="full"
      bg={mapStateColor(project?.estado)}
      color="#2b2d42"
      d="flex"
      // justifyContent="left"
      overflow="auto"
      top="55px"
    >
      {project ? ( //si ya se cargo el proyecto se muestra el mismo, si no se muestra la pantalla de carga
        <Box mt="3rem">
          <Box
            pos="fixed"
            top="55px"
            zIndex="100"
            bg={mapStateColor(project.estado) - 40}
            left="0"
            right="0"
            // boxShadow="md"
            width="full"
            pl="3"
            mb="3rem"
          >
            <HStack spacing="24px" fontSize="2xl" p="2">
              <Link to={`/projects/${projectId}`}>
                {/* <Link to="/projects">Projects</Link> */}
                <Text fontWeight="medium">{project.nombre}</Text>
              </Link>

              <Box fontWeight="thin">|</Box>

              <Button
                colorScheme="yellow"
                variant="solid"
                // opacity="30%"
                onClick={() => history.push(`/projects/${projectId}/members`)}
              >
                Miembros
              </Button>
              <Button
                colorScheme="yellow"
                variant="solid"
                // opacity="30%"
                onClick={() => history.push(`/projects/${projectId}/roles`)}
              >
                Configurar Roles
              </Button>
              <Button
                leftIcon={<MdBuild />}
                colorScheme="yellow"
                variant="solid"
                // opacity="30%"
                onClick={() => history.push(`/projects/${projectId}/config`)}
              >
                Configurar Proyecto
              </Button>
            </HStack>
          </Box>
          <Box as="main" mt="50px" w="100vw">
            <HStack p="5">
              <HStack w="fit-content">
                <USList
                  projectId={projectId}
                  setUserStories={setUserStories}
                  nombreLista="Backlog"
                  userStories={userStories?.filter((us) => us.estado === 4)}
                >
                  <Flex justify="center">
                    <LinkBox
                      to={`projects/${projectId}/createUS`}
                      pt="2px"
                      pl="2"
                      pr="2"
                      borderRadius="5"
                      m="10px"
                      justify="center"
                      d="flex"
                      _hover={{
                        background: "#F5F4F5",
                        color: "teal.500",
                      }}
                    >
                      <LinkOverlay
                        href={`/projects/${projectId}/createUS`}
                        fontSize="lg"
                      >
                        + agregar nueva tarjeta
                      </LinkOverlay>
                    </LinkBox>
                  </Flex>
                </USList>
              </HStack>
              {/* sprints */}
              <Box>
                <VStack>
                  <Box
                    display="flex"
                    w="lg"
                    height="180px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    fontSize="3xl"
                    fontWeight="bold"
                    bg="white"
                    justifyContent="center"
                    alignItems="center"
                    onClick={onCrearSprint}
                    cursor="pointer"
                  >
                    <Text>Crear sprint</Text>
                  </Box>

                  <VStack
                    display="flex"
                    w="lg"
                    height="180px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    fontSize="3xl"
                    fontWeight="bold"
                    bg="white"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      <Text>Sprint x</Text>
                    </Box>
                    <Box fontSize="18px">
                      <Text>Nro de US: 3</Text>
                    </Box>
                    <Box fontSize="18px">
                      <Text>Duracion estimada: 2</Text>
                    </Box>
                  </VStack>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Flex align="center" ml="auto">
          <Spinner size="xl" />
        </Flex>
      )}

      {/* <VStack>
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
          <LinkOverlay href={`/sprints/${sprint}`}>Crear sprint</LinkOverlay>
        </LinkBox>
      </VStack> */}
    </Box>
  );
}
