import React, { useEffect, useState } from "react";
//! API del frontend.
import { api } from "../../api";
import { Spinner } from "@chakra-ui/spinner";
import {
  Box,
  Flex,
  HStack,
  Text,
  LinkBox,
  LinkOverlay,
  Divider,
} from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import EditarSprintModal from "../../components/EditarSprintModal/EditarSprintModal";
import USList from "../../components/userStoryList/userStoryList";
import { mapStateColor } from "../../styles/theme";
import { MdBuild } from "react-icons/md";
import { useHistory } from "react-router-dom";

import { tienePermiso } from "../../util";
import { PERMISOS_MACRO } from "../roles/permisos";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Función que contiene el código de la vista
 * @param { props } param0
 * @returns React Component
 */
export default function Index({ props, dispatchError }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const sprintId = props.computedMatch.params.sp_id; //id del sprint, se extrae del URL
  const [project, setProject] = useState(); //estado del proyecto
  const [userStories, setUserStories] = useState([]); //estado del proyecto
  const [sprint, setSprint] = useState();
  const [isOpenEditSp, setIsOpenEditSp] = useState(false);

  const history = useHistory();

  const { user } = useAuth0();
  const [thisMember, setThisMember] = useState();

  //Al cargarse la pagina se busca el proyecto con el id del URL y se lo asigna a projectId
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then(({ data }) => setProject(data))
      .catch((err) => console.log(err));

    api.userStories
      .getUserStories(projectId, sprintId)
      .then(({ data }) => setUserStories(data));

    api.sprints
      .getSprint(projectId, sprintId)
      .then(({ data }) => setSprint(data))
      .catch((err) => console.log(err));

    api
      .getMember(projectId, user.sub)
      .then(({ data: member }) => setThisMember(member))
      .catch((err) => console.log(err));
  }, [projectId, sprintId]);

  return (
    <Box
      minHeight="100vh"
      minWidth="full"
      bg={mapStateColor(project?.estado)}
      color="#2b2d42"
      d="flex"
      justifyContent="left"
      overflow="auto"
      top="55px"
    >
      {project ? ( //si ya se cargo el proyecto se muestra el mismo, si no se muestra la pantalla de carga
        <Box mt="3rem">
          <Box
            pos="fixed"
            top="55px"
            zIndex="100"
            bg={mapStateColor(project.estado) - 40}
            left="0"
            right="0"
            // boxShadow="md"
            width="full"
            pl="3"
            mb="3rem"
          >
            <HStack spacing="24px" fontSize="2xl" p="2">
              <Link to={`/projects/${projectId}`}>
                {/* <Link to="/projects">Projects</Link> */}
                <Text fontWeight="medium">{project.nombre}</Text>
              </Link>

              <Box fontWeight="thin">|</Box>

              {tienePermiso(thisMember, PERMISOS_MACRO.EDITAR_MIEMBROS_A_PROYECTO) ?
                <Button
                  colorScheme="yellow"
                  variant="solid"
                  // opacity="30%"
                  onClick={() => history.push(`/projects/${projectId}/members`)}
                >
                  Miembros
                </Button>
                :
                null
              }
              {tienePermiso(thisMember, PERMISOS_MACRO.EDITAR_ROL_DEL_USUARIO) ?
                <Button
                  colorScheme="yellow"
                  variant="solid"
                  // opacity="30%"
                  onClick={() => history.push(`/projects/${projectId}/roles`)}
                >
                  Configurar Roles
                </Button>
                :
                null
              }
              {tienePermiso(thisMember, PERMISOS_MACRO.MODIFICAR_SPRINT) ?
                <Button
                  leftIcon={<MdBuild />}
                  colorScheme="yellow"
                  variant="solid"
                  // opacity="30%"
                  onClick={() => setIsOpenEditSp(true)}
                >
                  Configurar Sprint
                </Button>
                :
                null
              }
            </HStack>
          </Box>
          <Box mt="50px">
            <HStack p="5" alignItems="top" float="top">
              <USList
                projectId={projectId}
                sprintId={sprintId}
                dispatchError={dispatchError}
                setUserStories={setUserStories}
                nombreLista="Pendiente"
                userStories={
                  //Es un array?
                  Array.isArray(userStories)
                    ? //Si es un array, qué elementos pertenecen a esta lista?
                    userStories?.filter((us) => us.estado === 0)
                    : //Si es un solo elemento, pertenece a esta lista?
                    userStories?.estado === 0
                      ? //Si pertenece retorno
                      userStories
                      : //Si no pertenece, null
                      null
                }
              ></USList>
              <USList
                projectId={projectId}
                sprintId={sprintId}
                dispatchError={dispatchError}
                setUserStories={setUserStories}
                nombreLista="En curso"
                userStories={
                  //Es un array?
                  Array.isArray(userStories)
                    ? //Si es un array, qué elementos pertenecen a esta lista?
                    userStories?.filter((us) => us.estado === 1)
                    : //Si es un solo elemento, pertenece a esta lista?
                    userStories?.estado === 1
                      ? //Si pertenece retorno
                      userStories
                      : //Si no pertenece, null
                      null
                }
              ></USList>
              <USList
                projectId={projectId}
                sprintId={sprintId}
                dispatchError={dispatchError}
                setUserStories={setUserStories}
                nombreLista="Hecho"
                userStories={
                  //Es un array?
                  Array.isArray(userStories)
                    ? //Si es un array, qué elementos pertenecen a esta lista?
                    userStories?.filter((us) => us.estado === 2)
                    : //Si es un solo elemento, pertenece a esta lista?
                    userStories?.estado === 2
                      ? //Si pertenece retorno
                      userStories
                      : //Si no pertenece, null
                      null
                }
              ></USList>
              <USList
                projectId={projectId}
                sprintId={sprintId}
                dispatchError={dispatchError}
                setUserStories={setUserStories}
                nombreLista="Backlog"
                userStories={userStories?.filter((us) => us.estado === 4)}
              ></USList>
            </HStack>
          </Box>
          <EditarSprintModal
            projectId={projectId}
            sprint={sprint}
            isOpen={isOpenEditSp}
            onClose={() => setIsOpenEditSp(false)}
          />
        </Box>
      ) : (
        <Flex align="center" ml="auto">
          <Spinner size="xl" />
        </Flex>
      )}
    </Box>
  );
}
