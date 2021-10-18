/**
 * @file index.js
 * @brief Vista principal de un proyecto
 */
//! Librerías de React.js.
import React, { useEffect, useState } from "react";
//! API del frontend.
import { api } from "../../api";
import { Spinner } from "@chakra-ui/spinner";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  LinkBox,
  LinkOverlay,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { mapStateColor } from "../../styles/theme";
import USListUnset from "../../components/userStoryListUnset/userStoryListUnset";
import CrearSprintModal from "../../components/CrearSprintModal/CrearSprintModal";
import { useHistory } from "react-router-dom";
import { MdBuild } from "react-icons/md";
import EliminarSprintModal from "../../components/EliminarSprintModal/EliminarSprintModal";

import { useAuth0 } from "@auth0/auth0-react";
import { tienePermiso } from "../../util";
import { PERMISOS_MACRO } from "../roles/permisos";

/**
 * Función que contiene el código de la vista
 * @param {Object} obj Un objeto.
 * @param {function} obj.dispatchError Función que despliega el mensaje de error en la página.
 * @param {props} obj.props Propiedades del entorno.
 * @returns React Component
 */
export default function Index({ dispatchError, props }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const [project, setProject] = useState(); //estado del proyecto
  const [userStories, setUserStories] = useState([]); //estado del proyecto
  const [sprints, setSprints] = useState([]); //estado del proyecto
  const [isOpenCrearSp, setIsOpenCrearSp] = useState(false); //estado del proyecto
  const [isOpenEditSp, setIsOpenEditSp] = useState(false); //estado del proyecto
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const history = useHistory();
  const { user } = useAuth0();
  const [thisMember, setThisMember] = useState();

  const [focusedSprint, setFocusedSprint] = useState();
  //Al cargarse la pagina se busca el proyecto con el id del URL y se lo asigna a projectId
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then((res) => setProject(res.data))
      .catch((err) => console.log(err));

    api.userStories
      .getUserStories(projectId)
      .then((US) => setUserStories(US.data))
      .catch((err) => console.log(err));

    api.sprints
      .getSprints(projectId)
      .then(({ data }) => setSprints(data))
      .catch((err) => console.log(err));

    api
      .getMember(projectId, user.sub)
      .then(({ data: member }) => setThisMember(member))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      minHeight="100vh"
      minWidth="full"
      bg={mapStateColor(project?.estado)}
      color="#2b2d42"
      d="flex"
      // justifyContent="left"
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
              {tienePermiso(
                thisMember,
                PERMISOS_MACRO.EDITAR_MIEMBROS_A_PROYECTO
              ) ? (
                <Button
                  colorScheme="yellow"
                  variant="solid"
                  // opacity="30%"
                  onClick={() => history.push(`/projects/${projectId}/members`)}
                >
                  Miembros
                </Button>
              ) : null}
              {tienePermiso(
                thisMember,
                PERMISOS_MACRO.EDITAR_ROL_DEL_USUARIO
              ) ? (
                <Button
                  colorScheme="yellow"
                  variant="solid"
                  // opacity="30%"
                  onClick={() => history.push(`/projects/${projectId}/roles`)}
                >
                  Configurar Roles
                </Button>
              ) : null}
              {tienePermiso(
                thisMember,
                PERMISOS_MACRO.EDITAR_CONFIGURACIÓN_DEL_PROYECTO
              ) ? (
                <Button
                  leftIcon={<MdBuild />}
                  colorScheme="yellow"
                  variant="solid"
                  // opacity="30%"
                  onClick={() => history.push(`/projects/${projectId}/config`)}
                >
                  Configurar Proyecto
                </Button>
              ) : null}
            </HStack>
          </Box>
          <Box as="main" mt="50px" w="100vw">
            <HStack p="5">
              <HStack w="fit-content">
                <USListUnset
                  projectId={projectId}
                  setUserStories={setUserStories}
                  nombreLista="Backlog"
                  dispatchError={dispatchError}
                  thisMember={thisMember}
                  userStories={userStories?.filter((us) => us.estado === 4)}
                >
                  <Flex justify="center">
                    <LinkBox
                      to={`projects/${projectId}/createUS`}
                      pt="2px"
                      pl="2"
                      pr="2"
                      borderRadius="5"
                      m="10px"
                      justify="center"
                      d="flex"
                      _hover={{
                        background: "#F5F4F5",
                        color: "teal.500",
                      }}
                    >
                      {tienePermiso(thisMember, PERMISOS_MACRO.CREAR_ROL) ? (
                        <LinkOverlay
                          href={`/projects/${projectId}/createUS`}
                          fontSize="lg"
                        >
                          + agregar nueva tarjeta
                        </LinkOverlay>
                      ) : null}
                    </LinkBox>
                  </Flex>
                </USListUnset>
              </HStack>
              {/* sprints */}
              <Box>
                <VStack>
                  {tienePermiso(thisMember, PERMISOS_MACRO.CREAR_SPRINT) ? (
                    <Box
                      display="flex"
                      w="lg"
                      height="180px"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      fontSize="3xl"
                      fontWeight="bold"
                      bg="white"
                      justifyContent="center"
                      alignItems="center"
                      onClick={() => setIsOpenCrearSp(true)}
                      cursor="pointer"
                    >
                      <Text>Crear sprint</Text>
                    </Box>
                  ) : null}
                  <CrearSprintModal
                    projectId={projectId}
                    isOpen={isOpenCrearSp}
                    onClose={async () => {
                      await api.sprints
                        .getSprints(projectId)
                        .then(({ data }) => setSprints(data));
                      setIsOpenCrearSp(false);
                    }}
                  />

                  {sprints?.map((sprint, index) => (
                    <>
                      <VStack
                        display="flex"
                        w="lg"
                        height="180px"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        fontSize="3xl"
                        fontWeight="bold"
                        bg="white"
                        justifyContent="center"
                        alignItems="center"
                        key={index}
                        cursor="pointer"
                      >
                        <Box
                          onClick={() =>
                            history.push(
                              `/projects/${projectId}/sprints/${sprint.id}`
                            )
                          }
                        >
                          <Text>{sprint.nombre}</Text>
                        </Box>
                        <Box fontSize="18px">
                          <Text>Total US: {sprint.cuentaUs}</Text>
                        </Box>
                        <Box fontSize="18px">
                          <Text>
                            {sprint.activo ? "Activo" : "No activado"}
                          </Text>
                        </Box>
                        {tienePermiso(
                          thisMember,
                          PERMISOS_MACRO.ELIMINAR_SPRINT
                        ) ? (
                          <Button
                            onClick={() => {
                              setFocusedSprint(sprint);
                              setShowEliminarModal(true);
                            }}
                          >
                            Eliminar :o
                          </Button>
                        ) : null}
                        {focusedSprint && (
                          <EliminarSprintModal
                            projectId={projectId}
                            spId={focusedSprint.id}
                            isOpen={showEliminarModal}
                            onClose={() => {
                              setShowEliminarModal(false);
                            }}
                            setSprints={setSprints}
                          />
                        )}
                      </VStack>
                    </>
                  ))}
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Flex align="center" ml="auto">
          <Spinner size="xl" />
        </Flex>
      )}
    </Box>
  );
}
