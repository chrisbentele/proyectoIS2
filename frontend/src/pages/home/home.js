/**
 * @file home.js
 * @brief Página de inicio
 */

//! Componentes del Chakra UI
import { Stack, Flex, Box, Center, Text, Heading } from "@chakra-ui/react";
//! Librerías de React.js.
import React from "react";
//! Botón del login
import LoginButton from "../../components/auth/loginButton/loginButton";

// export default function Home() {
//   return (
//     <div className="homepage">
//       <VStack>
//         <Flex w="100%">
//           <h1>Ohayouu~</h1>
//         </Flex>
//       </VStack>
//     </div>
//   );
// }

/**
 * Función principal de esta vista
 * @returns React Component
 */
export default function Home() {
  return (
    <Box overflow="auto" as="main">
      <Box
        minHeight="100vh"
        width="full"
        // bgImage="url('https://www.kindpng.com/picc/m/236-2362818_anime-sempai-animegirl-heart-kawaii-cute-anime-girl.png')"
        // bgRepeat="no-repeat"
        bgGradient="linear(to-r, #A3E6DE, #FBB5B1, #FFE66D)"
        color="#2b2d42"
        d="flex"
        justifyContent="center"
        // mt="0 !important"
      >
        <Flex height="30%" minWidth="40%" maxWidth="70%" pl="2rem">
          <Center>
            <Stack mt="5rem" mb="3rem">
              <Heading fontSize={["3xl", "6xl"]} textAlign="center">
                Trellon't
              </Heading>
              <Text fontSize={["xl", "3xl"]} pt="3rem" textAlign="left">
                Software diseñado para la organización y realización de
                proyectos, ayudando a más de 1250 empresas mundialmente.
              </Text>
              <Text fontSize={["xl", "3xl"]} pt="3rem" textAlign="left">
                Queremos ayudarte a llevar la eficiencia y eficacia de tu empresa al siguiente nivel. Con User stories, roles, Sprints, Burndown Charts y muchas otras features organizar proyectos agiles ya no tiene que ser dificil. 
                <br/>
                <br/>
                Actualmente estamos en la version 5.0 y mejorando cada dia!
              </Text>
              <Box fontSize="xl" pt="8">
                <LoginButton title="Empezar a crear proyectos" />
              </Box>
            </Stack>
          </Center>
        </Flex>
      </Box>
    </Box>
  );
}
