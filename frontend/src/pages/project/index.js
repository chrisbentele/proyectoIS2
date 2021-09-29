import React, { useEffect, useState } from "react";
//! API del frontend.
import { api } from "../../api";
import { Spinner } from "@chakra-ui/spinner";
import {
  Box,
  Heading,
  Flex,
  HStack,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

/**
 * Función que contiene el código de la vista
 * @param { props } param0
 * @returns React Component
 */
export default function Index({ props }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const [project, setProject] = useState(); //estado del proyecto
  const [userStories, setUserStories] = useState([]); //estado del proyecto
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const onDelete = (id) => {
    console.log(id);
    eliminarUS(id);
    setIsOpen(false);
  };
  const cancelRef = React.useRef();

  const kanbanSection = (sectionTitle, userStories) => {
    return <Box></Box>;
  };

  //Al cargarse la pagina se busca el proyecto con el id del URL y se lo asigna a projectId
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then((res) => setProject(res))
      .catch((err) => console.log(err));

    api
      .getUserStories(projectId)
      .then((US) => setUserStories(US))
      .catch((err) => console.log(err));
  }, []);

  const moverUS = async (estado, usId) => {
    console.log(estado);
    console.log(usId);
    await api.editUS({ projectId, estado, usId });
    api.getUserStories(projectId).then((uss) => setUserStories(uss));
  };

  const eliminarUS = async (id) => {
    console.log(id);
    await api.eliminarUS(projectId, id);
    api.getUserStories(projectId).then((uss) => setUserStories(uss));
  };

  console.log(project);
  console.log(userStories);
  return (
    <Box
      minHeight="100vh"
      minWidth="full"
      bg={"#ffe66d"}
      color="#2b2d42"
      d="flex"
      justifyContent="left"
      overflow="auto"
    >
      {project ? ( //si ya se cargo el proyecto se muestra el mismo, si no se muestra la pantalla de carga
        <Box mt="3rem">
          <Box
            pos="fixed"
            top="55px"
            zIndex="100"
            bg={"#FFE047"}
            left="0"
            right="0"
            // boxShadow="md"
            width="full"
            pl="3"
            mb="3rem"
          >
            <HStack spacing="24px" fontSize="2xl">
              <Box>
                {/* <Link to="/projects">Projects</Link> */}
                <Text fontWeight="medium">{project.nombre}</Text>
              </Box>
              <Text fontWeight="medium">
                <Link to={`${projectId}/members`}>Miembros</Link>
              </Text>
              <Text fontWeight="medium">
                <Link to={`${projectId}/roles`}>Configurar roles</Link>
              </Text>
            </HStack>
          </Box>
          <Box mt="50px">
            <HStack p="5" alignItems="top" float="top">
              <Box
                w="xs"
                minHeight="100px"
                maxHeight="80%"
                borderWidth="1px"
                borderRadius="lg"
                fontSize="sm"
                bg="white"
                justifyContent="center"
              >
                <Flex justify="center">
                  <Heading fontSize="2xl">Pendiente</Heading>
                </Flex>
                {userStories
                  ? userStories
                      .filter((us) => us.estado === 0)
                      .map((us) => {
                        console.log(us.id);
                        return (
                          <Box
                            border="2px"
                            borderRadius="8"
                            p="2"
                            m="2"
                            key={us.id}
                          >
                            <Text fontSize="20px" fontWeight="semibold">
                              {us.nombre}
                            </Text>
                            <Text fontSize="15px">{us.contenido}</Text>
                            <Select
                              placeholder="cambiar estado"
                              size="sm"
                              onChange={(e) => {
                                moverUS(e.value, us.id);
                              }}
                              options={[
                                // { value: "0", label: "To do" },
                                { value: "1", label: "En curso" },
                                { value: "2", label: "Hecho" },
                                { value: "4", label: "Backlog" },
                              ]}
                            />
                            <Flex>
                              <Button onClick={() => eliminarUS(us.id)} mt="2">
                                <EditIcon color="black.500" />
                              </Button>
                              <Button
                                onClick={() => setIsOpen(true)}
                                mt="2"
                                ml="auto"
                                bg="red.500"
                                _hover={{
                                  background: "red.600",
                                  color: "teal.500",
                                }}
                                _active={{
                                  background: "red.600",
                                }}
                              >
                                <DeleteIcon color={"#F5F4F5"} />
                              </Button>
                              <AlertDialog
                                isOpen={isOpen}
                                leastDestructiveRef={cancelRef}
                                onClose={onClose}
                              >
                                <AlertDialogOverlay>
                                  <AlertDialogContent>
                                    <AlertDialogHeader
                                      fontSize="lg"
                                      fontWeight="bold"
                                    >
                                      Eliminar US
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                      ¿Está seguro que desea eliminar a esta US?
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                      <Button ref={cancelRef} onClick={onClose}>
                                        Cancelar
                                      </Button>
                                      <Button
                                        colorScheme="red"
                                        onClick={() => onDelete(us.id)}
                                        ml={3}
                                      >
                                        Eliminar
                                      </Button>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialogOverlay>
                              </AlertDialog>
                            </Flex>

                            {/* <Button size="sm" mt="2" bg="red">
                            Eliminar
                          </Button> */}
                          </Box>
                        );
                      })
                  : null}
                {/* <Box p="5">
                <Link to={`${projectId}/createUS`}>
                  + agregar nueva tarjeta
                </Link>
              </Box> */}
              </Box>
              <Box
                w="xs"
                minHeight="100px"
                maxHeight="80%"
                borderWidth="1px"
                borderRadius="lg"
                fontSize="sm"
                bg="white"
                justifyContent="center"
              >
                <Flex justify="center">
                  <Heading fontSize="2xl">En curso</Heading>
                </Flex>
                {userStories
                  ? userStories
                      .filter((us) => us.estado === 1)
                      .map((us) => (
                        <Box
                          border="2px"
                          borderRadius="8"
                          p="2"
                          m="2"
                          key={us.id}
                        >
                          <Text fontSize="20px" fontWeight="semibold">
                            {us.nombre}
                          </Text>
                          <Text fontSize="15px">{us.contenido}</Text>
                          <Select
                            onChange={(e) => {
                              moverUS(e.value, us.id);
                            }}
                            options={[
                              { value: "0", label: "Pendiente" },
                              // { value: "1", label: "Doing" },
                              { value: "2", label: "Hecho" },
                              { value: "4", label: "Backlog" },
                            ]}
                          />
                          <Flex>
                            <Button onClick={() => eliminarUS(us.id)} mt="2">
                              <EditIcon color="black.500" />
                            </Button>
                            <Button
                              onClick={() => setIsOpen(true)}
                              mt="2"
                              ml="auto"
                              bg="red.500"
                              _hover={{
                                background: "red.600",
                                color: "teal.500",
                              }}
                              _active={{
                                background: "red.600",
                              }}
                            >
                              <DeleteIcon color={"#F5F4F5"} />
                            </Button>
                            <AlertDialog
                              isOpen={isOpen}
                              leastDestructiveRef={cancelRef}
                              onClose={onClose}
                            >
                              <AlertDialogOverlay>
                                <AlertDialogContent>
                                  <AlertDialogHeader
                                    fontSize="lg"
                                    fontWeight="bold"
                                  >
                                    Eliminar US
                                  </AlertDialogHeader>

                                  <AlertDialogBody>
                                    ¿Está seguro que desea eliminar a esta US?
                                  </AlertDialogBody>

                                  <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                      Cancelar
                                    </Button>
                                    <Button
                                      colorScheme="red"
                                      onClick={() => onDelete(us.id)}
                                      ml={3}
                                    >
                                      Eliminar
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialogOverlay>
                            </AlertDialog>
                          </Flex>
                        </Box>
                      ))
                  : null}
                {/* <Box p="5">
                <Link to={`${projectId}/createUS`}>
                  + agregar nueva tarjeta
                </Link>
              </Box> */}
              </Box>
              <Box
                w="xs"
                minHeight="100px"
                maxHeight="80%"
                borderWidth="1px"
                borderRadius="lg"
                fontSize="sm"
                bg="white"
                justifyContent="center"
              >
                <Flex justify="center">
                  <Heading fontSize="2xl">Hecho</Heading>
                </Flex>
                {userStories
                  ? userStories
                      .filter((us) => us.estado === 2)
                      .map((us) => (
                        <Box
                          border="2px"
                          borderRadius="8"
                          p="2"
                          m="2"
                          key={us.id}
                        >
                          <Text fontSize="xl" fontWeight="semibold">
                            {us.nombre}
                          </Text>
                          <Text fontSize="sm">{us.contenido}</Text>
                          <Select
                            onChange={(e) => {
                              moverUS(e.value, us.id);
                            }}
                            options={[
                              { value: "0", label: "Pendiente" },
                              { value: "1", label: "En curso" },
                              // { value: "2", label: "Done" },
                              { value: "4", label: "Backlog" },
                            ]}
                          />
                          <Flex>
                            <Button onClick={() => eliminarUS(us.id)} mt="2">
                              <EditIcon color="black.500" />
                            </Button>
                            <Button
                              onClick={() => setIsOpen(true)}
                              mt="2"
                              ml="auto"
                              bg="red.500"
                              _hover={{
                                background: "red.600",
                                color: "teal.500",
                              }}
                              _active={{
                                background: "red.600",
                              }}
                            >
                              <DeleteIcon color={"#F5F4F5"} />
                            </Button>
                            <AlertDialog
                              isOpen={isOpen}
                              leastDestructiveRef={cancelRef}
                              onClose={onClose}
                            >
                              <AlertDialogOverlay>
                                <AlertDialogContent>
                                  <AlertDialogHeader
                                    fontSize="lg"
                                    fontWeight="bold"
                                  >
                                    Eliminar US
                                  </AlertDialogHeader>

                                  <AlertDialogBody>
                                    ¿Está seguro que desea eliminar a esta US?
                                  </AlertDialogBody>

                                  <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                      Cancelar
                                    </Button>
                                    <Button
                                      colorScheme="red"
                                      onClick={() => onDelete(us.id)}
                                      ml={3}
                                    >
                                      Eliminar
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialogOverlay>
                            </AlertDialog>
                          </Flex>
                        </Box>
                      ))
                  : null}
                {/* <Box p="5">
                <Link to={`${projectId}/createUS`}>
                  + agregar nueva tarjeta
                </Link>
              </Box> */}
              </Box>
              <Box
                w="xs"
                minHeight="100px"
                maxHeight="80%"
                borderWidth="1px"
                borderRadius="lg"
                fontSize="sm"
                bg="white"
                justifyContent="center"
              >
                <Flex justify="center">
                  <Heading fontSize="2xl">Backlog</Heading>
                </Flex>
                {userStories
                  ? userStories
                      .filter((us) => us.estado == 4)
                      .map((us) => (
                        <Box
                          border="2px"
                          borderRadius="8"
                          p="2"
                          m="2"
                          key={us.id}
                        >
                          <Text fontSize="xl" fontWeight="semibold">
                            {us.nombre}
                          </Text>
                          <Text fontSize="md">{us.contenido}</Text>
                          <Select
                            onChange={(e) => {
                              moverUS(e.value, us.id);
                            }}
                            options={[
                              // { value: "4", label: "Backlog" },
                              { value: "0", label: "Pendiente" },
                              { value: "1", label: "En curso" },
                              { value: "2", label: "Hecho" },
                            ]}
                          />
                          <Flex>
                            <Button onClick={() => eliminarUS(us.id)} mt="2">
                              <EditIcon color="black.500" />
                            </Button>
                            <Button
                              onClick={() => setIsOpen(true)}
                              mt="2"
                              ml="auto"
                              bg="red.500"
                              _hover={{
                                background: "red.600",
                                color: "teal.500",
                              }}
                              _active={{
                                background: "red.600",
                              }}
                            >
                              <DeleteIcon color={"#F5F4F5"} />
                            </Button>
                            <AlertDialog
                              isOpen={isOpen}
                              leastDestructiveRef={cancelRef}
                              onClose={onClose}
                            >
                              <AlertDialogOverlay>
                                <AlertDialogContent>
                                  <AlertDialogHeader
                                    fontSize="lg"
                                    fontWeight="bold"
                                  >
                                    Eliminar US
                                  </AlertDialogHeader>

                                  <AlertDialogBody>
                                    ¿Está seguro que desea eliminar a esta US?
                                  </AlertDialogBody>

                                  <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                      Cancelar
                                    </Button>
                                    <Button
                                      colorScheme="red"
                                      onClick={() => onDelete(us.id)}
                                      ml={3}
                                    >
                                      Eliminar
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialogOverlay>
                            </AlertDialog>
                          </Flex>
                        </Box>
                      ))
                  : null}
                <Flex justify="center">
                  <LinkBox
                    to={`${projectId}/createUS`}
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
                    <LinkOverlay href={`${projectId}/createUS`} fontSize="lg">
                      + agregar nueva tarjeta
                    </LinkOverlay>
                  </LinkBox>
                </Flex>
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
