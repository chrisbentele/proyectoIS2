import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { api } from "../../api";
import Select from "react-select";

const USList = ({
  projectId,
  setUserStories,
  userStories,
  nombreLista,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const onDelete = (id) => {
    console.log(id);
    eliminarUS(id);
    setIsOpen(false);
  };
  const cancelRef = React.useRef();

  const moverUS = async (estado, usId) => {
    console.log(estado);
    console.log(usId);
    await api.editUS({ projectId, estado, usId });
    api.getUserStories(projectId).then((uss) => setUserStories(uss));
  };

  const editarUS = async (nombre, contenido, usId) => {
    console.log(nombre);
    console.log(usId);
    await api.editUS({ projectId, nombre, contenido, usId });
    api.getUserStories(projectId).then((uss) => setUserStories(uss));
  };

  const eliminarUS = async (id) => {
    console.log(id);
    await api.eliminarUS(projectId, id);
    api.getUserStories(projectId).then((uss) => setUserStories(uss));
  };

  return (
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
        <Heading fontSize="2xl">{nombreLista}</Heading>
      </Flex>
      {userStories
        ? userStories.map((us) => {
            console.log("hola");
            console.log(us.id);
            console.log(us.estado);
            console.log(us.estado === 0);
            return (
              <Box border="2px" borderRadius="8" p="2" m="2" key={us.id}>
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
                    {
                      value: "0",
                      label: "Pendiente",
                      isDisabled: us.estado === 0,
                    },
                    {
                      value: "1",
                      label: "En curso",
                      isDisabled: us.estado === 1,
                    },
                    {
                      value: "2",
                      label: "Hecho",
                      isDisabled: us.estado === 2,
                    },
                    {
                      value: "4",
                      label: "Backlog",
                      isDisabled: us.estado === 4,
                    },
                  ]}
                />
                <Flex>
                  <Button onClick={() => editarUS(us.id)} mt="2">
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
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
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
            );
          })
        : null}
      {children}
    </Box>
  );
};

export default USList;
