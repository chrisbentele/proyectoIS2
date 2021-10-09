/**
 * @file profile.js
 * @brief Página de incio de al sistema.
 */

//! Componentes de React.js
import React, { useEffect, useState } from "react";
//! Componente de Auth0
import { useAuth0 } from "@auth0/auth0-react";
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

//! Componente principal de esta página
const Profile = ({ dispatchError }) => {
  const { user, isLoading } = useAuth0();
  const [userProjects, setUserProjects] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      console.log(user);
      api
        .getProjects(user.sub)
        .then(({data: projects}) => setUserProjects(projects))
        .catch((err) =>
          dispatchError(null, "Error cargando proyectos del usuario")
        );
    }
  }, [user, isLoading]);
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
      <Box minWidth="260px" width="30%" p="10" mt="3rem">
        <Image borderRadius="100" src={user.picture} alt={user.name} />
        <Heading>{user.name}</Heading>
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
      </Box>
      <Box width="70%" p="10" pl="16" mt="3rem">
        <Box>
          <Heading>Proyectos</Heading>
        </Box>
        <Flex mt="10">
          <Grid templateColumns="repeat(2, 1fr)" gap={4} autoFlow>
            {Array.isArray(userProjects)
              ? userProjects.map((project, i) => {
                  return (
                    <LinkBox
                      d="flex"
                      flexDirection="column"
                      w="xs"
                      height="200px"
                      borderWidth="1px"
                      borderRadius="lg"
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
              <LinkOverlay href="/createProject/">Crear Proyecto</LinkOverlay>
            </LinkBox>
          </Grid>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
