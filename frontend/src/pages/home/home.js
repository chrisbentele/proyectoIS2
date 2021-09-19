//Pagina de inicio

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
import LoginButton from "../../components/auth/loginButton/loginButton";
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
                proyectos, ayudando a más de xxx empresas mundialmente.
              </Text>
              <Text fontSize={["xl", "3xl"]} pt="3rem" textAlign="left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ex
                tellus, eleifend quis eros nec, fringilla pharetra elit. Nunc
                vehicula arcu eu lacus aliquet, faucibus egestas metus interdum.
                Donec vehicula suscipit lectus, ac varius lectus malesuada eu.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Donec malesuada a lorem at iaculis. In id
                nisl nec quam porttitor vehicula a eu magna. Cras at volutpat
                lorem. Maecenas consequat pulvinar nisi ac lobortis. Duis a ex
                eu nisi vestibulum pretium. Nunc elementum velit eu pulvinar
                laoreet. Mauris laoreet nibh eu viverra laoreet. Sed nec massa
                sodales, accumsan enim quis, auctor tortor. Duis vel accumsan
                orci. Morbi mollis mi vitae tortor viverra varius.
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
