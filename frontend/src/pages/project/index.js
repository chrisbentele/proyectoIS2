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
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import USList from "../../components/userStoryList/userStoryList";

/**
 * Función que contiene el código de la vista
 * @param { props } param0
 * @returns React Component
 */
export default function Index({ props }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const [project, setProject] = useState(); //estado del proyecto
  const [userStories, setUserStories] = useState([]); //estado del proyecto

  const kanbanSection = (sectionTitle, userStories) => {
    return <Box></Box>;
  };

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

  console.log(project);
  console.log(userStories);
  return (
    <Box
      minHeight="100vh"
      minWidth="full"
      bg={"#ffe66d"}
      color="#2b2d42"
      d="flex"
      justifyContent="left"
      overflow="auto"
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
          <Box mt="50px">
            <HStack p="5" alignItems="top" float="top">
              <USList
                projectId={projectId}
                setUserStories={setUserStories}
                nombreLista="Pendiente"
                userStories={userStories.filter((us) => us.estado === 0)}
              ></USList>
              <USList
                projectId={projectId}
                setUserStories={setUserStories}
                nombreLista="En curso"
                userStories={userStories.filter((us) => us.estado === 1)}
              ></USList>
              <USList
                projectId={projectId}
                setUserStories={setUserStories}
                nombreLista="Hecho"
                userStories={userStories.filter((us) => us.estado === 2)}
              ></USList>
              <USList
                projectId={projectId}
                setUserStories={setUserStories}
                nombreLista="Backlog"
                userStories={userStories.filter((us) => us.estado === 4)}
              >
                <Flex justify="center">
                  <LinkBox
                    to={`${projectId}/createUS`}
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
                    <LinkOverlay href={`${projectId}/createUS`} fontSize="lg">
                      + agregar nueva tarjeta
                    </LinkOverlay>
                  </LinkBox>
                </Flex>
              </USList>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Flex align="center" ml="auto">
          <Spinner size="xl" />
        </Flex>
      )}
    </Box>
  );
}
