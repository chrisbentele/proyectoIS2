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
