/**
 * @file profile.js
 * @brief Página de incio de al sistema.
 */

//! Componentes de React.js
import React, { useEffect, useState } from "react";
//! Componente de Auth0
import { useAuth0 } from "@auth0/auth0-react";
import placeholderImg from "../assets/userPlaceholder.jpg";
import {
  Box,
  Flex,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Grid } from "@chakra-ui/react";
import { api } from "../api";
import { projectStateToString } from "../util";
import { mapStateColor } from "../styles/theme";
import LogoutButton from "../components/auth/logoutButton/logoutButton";
import { tienePermiso } from "../util";
import { PERMISOS_MACRO } from "../pages/roles/permisos";

//! Componente principal de esta página
const Profile = ({ props, dispatchError }) => {
  const { user, isLoading } = useAuth0();
  const [userProjects, setUserProjects] = useState([]);
  const [endedProjects, setEndedProjects] = useState([]);
  const [thisMember, setThisMember] = useState();
  useEffect(() => {
    if (!isLoading) {
      api
        .getProjects(user.sub)
        .then(({ data: projects }) => {
          const activeProjects = [];
          const finishedProjects = [];
          projects.forEach((project) => {
            if (project.estado === 1) {
              finishedProjects.push(project);
            } else {
              activeProjects.push(project);
            }
          });
          setUserProjects(activeProjects);
          setEndedProjects(finishedProjects);
        })
        .catch((err) =>
          dispatchError(null, "Error cargando proyectos del usuario")
        );
      api.users
        .getUser(user.sub, user.email, user.name)
        .then((x) => setThisMember(x));
    }
  }, [user, isLoading, dispatchError]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Box
      minHeight="100vh"
      width="full"
      bg={"#F5F4F5"}
      color="#2b2d42"
      d="flex"
      justifyContent="left"
      // mt="0 !important"
    >
      <Box
        minWidth="260px"
        width="30%"
        p="10"
        mt="3rem"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyItems="center"
      >
        <Image
          borderRadius="100"
          src={user.picture || placeholderImg}
          alt={user.name}
          width={100}
          height={100}
          marginBottom={8}
          marginTop={10}
        />
        <Heading marginBottom={0}>{user.name}</Heading>
        <p>{user.email}</p>
        {/* <Box
          borderRadius="4px"
          bg="buttonScale.800"
          color="richBlack"
          width="max-content"
          p={("2", "2", "2", "2")}
          mt="2rem"
          fontWeight="600"
        >
          <Link to="/roles">Configurar Roles</Link>
        </Box> */}
        <Box mt="2" marginTop={5}>
          <LogoutButton />
        </Box>
      </Box>
      <Box width="70%" p="10" pl="16" mt="3rem">
        <Box>
          <Heading>Proyectos en Desarrollo</Heading>
        </Box>
        <Flex mt="5">
          <Grid templateColumns="repeat(2, 1fr)" gap={4} autoFlow>
            {Array.isArray(userProjects)
              ? userProjects.map((project, i) => {
                  return (
                    <LinkBox
                      d="flex"
                      flexDirection="column"
                      w="xs"
                      height="200px"
                      borderWidth="2px"
                      borderRadius="lg"
                      shadow="lg"
                      overflow="hidden"
                      fontSize="3xl"
                      bg={mapStateColor(project.estado)}
                      justifyContent="left"
                      pl="5"
                      pt="2"
                      key={i}
                      borderColor="#c9ccd1"
                    >
                      <LinkOverlay
                        href={`projects/${project.id}`}
                        style={{
                          fontWeight: "bold",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {project.nombre}
                      </LinkOverlay>
                      <Box pb="2" fontSize="lg">
                        <Text>{projectStateToString(project.estado)}</Text>
                        <Text>
                          Duracion estimada: {project.duracionEstimada} semanas
                        </Text>
                        <Text>Iniciado: {project.fechaInicio}</Text>
                      </Box>
                    </LinkBox>
                  );
                })
              : null}
            {thisMember?.proy_admin && (
              <LinkBox
                display="flex"
                w="xs"
                height="200px"
                borderWidth="2px"
                borderRadius="lg"
                overflow="hidden"
                fontSize="3xl"
                fontWeight="bold"
                bg="white"
                justifyContent="center"
                alignItems="center"
                borderColor="#c9ccd1"
                shadow="lg"
              >
                <LinkOverlay href="/createProject/">Crear Proyecto</LinkOverlay>
              </LinkBox>
            )}
          </Grid>
        </Flex>
        {endedProjects.length ? (
          <Heading marginTop={20}>Proyectos Terminados</Heading>
        ) : null}

        <Flex mt="5">
          <Grid templateColumns="repeat(2, 1fr)" gap={4} autoFlow>
            {Array.isArray(endedProjects)
              ? endedProjects.map((project, i) => {
                  return (
                    <LinkBox
                      d="flex"
                      flexDirection="column"
                      w="xs"
                      height="200px"
                      borderWidth="1px"
                      borderRadius="lg"
                      borderColor="#c9ccd1"
                      shadow="lg"
                      overflow="hidden"
                      fontSize="3xl"
                      bg={mapStateColor(project.estado)}
                      justifyContent="left"
                      pl="5"
                      pt="2"
                      key={i}
                    >
                      <LinkOverlay
                        href={`projects/${project.id}`}
                        style={{
                          fontWeight: "bold",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {project.nombre}
                      </LinkOverlay>
                      <Box pb="2" fontSize="lg">
                        <Text>{projectStateToString(project.estado)}</Text>
                        <Text>
                          Duracion estimada: {project.duracionEstimada} semanas
                        </Text>
                        <Text>Iniciado: {project.fechaInicio}</Text>
                      </Box>
                    </LinkBox>
                  );
                })
              : null}
          </Grid>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
