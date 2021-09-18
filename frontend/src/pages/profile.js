import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <Box
        minHeight="100vh"
        width="full"
        // bgImage="url('https://www.kindpng.com/picc/m/236-2362818_anime-sempai-animegirl-heart-kawaii-cute-anime-girl.png')"
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
              <Flex
                w="xs"
                height="200px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                fontSize="3xl"
                fontWeight="bold"
                bg="#FFE66D"
                justifyContent="left"
                pl="5"
                pt="2"
              >
                <Link path={`proyecto/${1}`}>Proyecto 1</Link>
              </Flex>
              <Flex
                w="xs"
                height="200px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                fontSize="3xl"
                fontWeight="bold"
                bg="#4ECDC4"
                justifyContent="left"
                pl="5"
                pt="2"
              >
                <Link path={`proyecto/${2}`}>Proyecto 2</Link>
              </Flex>
              <Flex
                w="xs"
                height="200px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                fontSize="3xl"
                fontWeight="bold"
                bg="#FBB5B1"
                justifyContent="left"
                pl="5"
                pt="2"
              >
                <Link path={`proyecto/${3}`}>Proyecto 3</Link>
              </Flex>
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
    )
  );
};

export default Profile;
