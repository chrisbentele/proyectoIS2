import { VStack, Flex } from "@chakra-ui/react";
import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="homepage">
      <VStack>
        <Flex w="100%">
          <h1>Ohayou~</h1>
        </Flex>
      </VStack>
    </div>
  );
}
