import {
  Box,
  Button,
  VStack,
  Flex,
  HStack,
  Icon,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";

export default function Home() {
  return (
    <Box overflow="auto" as="main">
      <Box
        minHeight="80vh"
        width="full"
        bgImage="url('https://www.kindpng.com/picc/m/236-2362818_anime-sempai-animegirl-heart-kawaii-cute-anime-girl.png')"
        backgroundColor="backWhite"
        color="backWhite"
      >
        <VStack>
          <Flex w="100%">
            <h1>Ohayou~</h1>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}
