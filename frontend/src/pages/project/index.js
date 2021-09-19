import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { Spinner } from "@chakra-ui/spinner";
import { Box, Heading } from "@chakra-ui/layout";

export default function Index({ props }) {
  const projectId = props.computedMatch.params.id;
  const [project, setProject] = useState({});
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then((project) => setProject(project))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      minHeight="100vh"
      width="full"
      bg={"#F5F4F5"}
      color="#2b2d42"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      {project ? (
        <Box width="50%" borderWidth="5px" bg="#E2E8F0" height="50%">
          <Heading>{project.nombre}</Heading>
        </Box>
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
}
