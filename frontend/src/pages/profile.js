import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { api } from "../api";
import { useAuth } from "../providers/DbAuth";
import { projectStateToString } from "../util";

const Profile = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userProjects, setUserProjects] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      console.log(user);
      api
        .getProjects(user.sub)
        .then((projects) => setUserProjects(projects))
        .catch((err) => console.log(err));
      console.log("done");
    }
  }, [user, isLoading]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  function mapStateColor(projectState) {
    switch (projectState) {
      case 0:
        return "#ffe66d";
      case 1:
        return "#a0ff6d";
      case 2:
        return "#726bff";
      default:
        return "#ffffff";
    }
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
        <Box
          borderRadius="4px"
          bg="buttonScale.800"
          color="richBlack"
          width="max-content"
          p={("2", "2", "2", "2")}
          mt="2rem"
          fontWeight="600"
        >
          <Link to="/roles">Configurar Roles</Link>
        </Box>
      </Box>
      <Box width="70%" p="10" pl="16" mt="3rem">
        <Box>
          <Heading>Proyectos</Heading>
        </Box>
        <Flex mt="10">
          <Grid templateColumns="repeat(2, 1fr)" gap={4} autoFlow>
            {Array.isArray(userProjects)
              ? userProjects.map((project) => {
                  return (
                    <Flex
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
                    >
                      <Link
                        to={`projects/${project.id}`}
                        style={{
                          fontWeight: "bold",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {project.nombre}
                      </Link>
                      <br />

                      <p style={{ fontSize: "20px" }}>
                        {projectStateToString(project.estado)}
                      </p>
                      <p style={{ fontSize: "20px" }}>
                        Duracion estimada: {project.duracionEstimada} semanas
                      </p>
                      <p style={{ fontSize: "20px" }}>
                        Iniciado: {project.fechaInicio}
                      </p>
                    </Flex>
                  );
                })
              : null}
            <Flex
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
              <Link to="/createProject/">Crear Proyecto</Link>
            </Flex>
          </Grid>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
