import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { Spinner } from "@chakra-ui/spinner";
import { Box, Heading } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

export default function Index({ props }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const [project, setProject] = useState({}); //estado del proyecto

  //Al cargarse la pagina se busca el proyecto con el id del URL y se lo asigna a projectId
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
      {project ? ( //si ya se cargo el proyecto se muestra el mismo, si no se muestra la pantalla de carga
        <Box width="50%" borderWidth="5px" bg="#E2E8F0" height="50%">
          <Heading>{project.nombre}</Heading>
          <Heading>
            <Link to={`${projectId}/members`}>Miembros</Link>
          </Heading>
        </Box>
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
}
