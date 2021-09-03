import {
  VStack,
  Stack,
  Flex,
  Box,
  Center,
  Text,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import LoginButton from "/home/fabri/proyectoIS2/frontend/src/components/auth/loginButton/loginButton";
import { Link } from "react-router-dom";

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
      >
        <Flex height="30%" minWidth="40%" maxWidth="70%" pl="2rem">
          <Center>
            <Stack>
              <Heading fontSize={["3xl", "6xl"]} textAlign="center">
                Ohayou~
              </Heading>
              <Text fontSize={["xl", "3xl"]} pt="3rem" textAlign="left">
                Software diseñado para la organización y realización de
                proyectos, ayudando a más de xxx empresas mundialmente.
              </Text>
              <Box pt="2">
                <LoginButton />
              </Box>
            </Stack>
          </Center>
        </Flex>
      </Box>
    </Box>
  );
}
