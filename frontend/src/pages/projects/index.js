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
  Grid,
} from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import Select from "react-select";
import USList from "../../components/userStoryListUnset/userStoryListUnset";
import CrearSprintModal from "../../components/CrearSprintModal/CrearSprintModal";
import EditarSprintModal from "../../components/EditarSprintModal/EditarSprintModal";
import { IconButton } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";

import { useHistory } from "react-router";
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
  const [isOpenCrearSp, setIsOpenCrearSp] = useState(false); //estado del proyecto
  const [isOpenEditSp, setIsOpenEditSp] = useState(false); //estado del proyecto
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
    api.sprints.getSprints(projectId).then(({ data }) => setSprints(data));
  }, []);

  return (
    <Box
      minHeight="100vh"
      minWidth="full"
      bg={"#F5F4F5"}
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
            bg={"#FFE047"}
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
          <Box as="main" mt="50px" w="100vw">
            <HStack>
              <HStack p="5" w="fit-content">
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
                    onClick={() => setIsOpenCrearSp(true)}
                    cursor="pointer"
                  >
                    <Text>Crear sprint</Text>
                  </Box>
                  <CrearSprintModal
                    projectId={projectId}
                    isOpen={isOpenCrearSp}
                    onClose={() => {
                      setIsOpenCrearSp(false);
                      api.sprints
                        .getSprints(projectId)
                        .then(({ data }) => setSprints(data));
                    }}
                  />

                  {sprints?.map((sprint, index) => (
                    <>
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
                        key={index}
                        cursor="pointer"
                        onClick={() =>
                          history.push(
                            `/projects/${projectId}/sprints/${sprint.id}`
                          )
                        }
                      >
                        <Box>
                          <Text>{sprint.nombre}</Text>
                        </Box>
                        <Box fontSize="18px">
                          <Text>Total US: {sprint.cuentaUs}</Text>
                        </Box>
                        <Box fontSize="18px">
                          <Text>
                            {sprint.activo ? "Activo" : "No activado"}
                          </Text>
                        </Box>
                        <IconButton
                          icon={<EditIcon />}
                          onClick={() => setIsOpenEditSp(true)}
                        />
                      </VStack>
                      <EditarSprintModal
                        projectId={projectId}
                        sprint={sprint}
                        isOpen={isOpenEditSp}
                        onClose={() => setIsOpenEditSp(false)}
                      />
                    </>
                  ))}
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
