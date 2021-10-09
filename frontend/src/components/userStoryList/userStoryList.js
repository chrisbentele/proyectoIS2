import React, { useState } from "react";

import { useForm } from "react-hook-form";

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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  toast,
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
  const [isOpen, setIsOpen] = useState(false);
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
    api.getUserStories(projectId).then(({ data }) => setUserStories(data));
  };

  const editarUS = async (usName, description, usId) => {
    console.log(usName);
    console.log(usId);
    await api.editUS({ projectId, usName, description, usId });
    api.getUserStories(projectId).then(({ data }) => setUserStories(data));
  };

  const eliminarUS = async (id) => {
    console.log(id);
    await api.eliminarUS(projectId, id);
    api.getUserStories(projectId).then(({ data }) => setUserStories(data));
  };

  const { onOpen } = useDisclosure();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const onCloseModal = () => setIsOpenModal(false);
  const onEdit = (nombre, contenido, id) => {
    console.log(id);
    editarUS(nombre, contenido, id);
    setIsOpenModal(false);
  };

  const initialRef = React.useRef();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [focusedUS, setFocusedUS] = useState();

  async function onSubmit(values) {
    //funcion que define el comportamiento al confirmar el form
    await api
      .editUS({ ...values, projectId, usId: focusedUS?.id })
      .then((res) => {
        if (res.id) {
          toast({
            description: "US cambiada.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            description: "US no pudo ser cambiada.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => console.log(err));
    api.getUserStories(projectId).then(({ data }) => setUserStories(data));
    setIsOpenModal(false);
  }

  return (
    <Box
      w="xs"
      minHeight="100px"
      maxHeight="80%"
      borderWidth="1px"
      borderRadius="lg"
      fontSize="sm"
      bg={"#F5F4F5"}
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
              <Box
                borderRadius="8"
                p="2"
                m="2"
                key={us.id}
                bg="white"
                boxShadow="md"
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
                  <Button
                    onClick={() => {
                      setIsOpenModal(true);
                      setFocusedUS(us);
                    }}
                    mt="2"
                  >
                    <EditIcon color="black.500" />
                  </Button>

                  <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpenModal}
                    onClose={onCloseModal}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Editar US</ModalHeader>

                      <ModalCloseButton />
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody pb={6}>
                          <FormControl isInvalid={errors.name}>
                            <FormLabel htmlFor="name">Nombre US</FormLabel>
                            <Input
                              id="name"
                              ref={initialRef}
                              defaultValue={us.nombre}
                              {...register("usName", {
                                required: "This is required",
                                minLength: {
                                  value: 4,
                                  message: "Minimum length should be 4",
                                },
                              })}
                            />
                            <FormErrorMessage>
                              {errors.name && errors.name.message}
                            </FormErrorMessage>
                          </FormControl>
                          <FormControl isInvalid={errors.description} mt={4}>
                            <FormLabel htmlFor="description" mt={4}>
                              Descripción
                            </FormLabel>
                            <Input
                              id="description"
                              defaultValue={us.contenido}
                              {...register("description", {
                                required: "This is required",
                                minLength: {
                                  value: 4,
                                  message: "Minimum length should be 4",
                                },
                              })}
                            />
                            <FormErrorMessage>
                              {errors.description && errors.description.message}
                            </FormErrorMessage>
                          </FormControl>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            mr={4}
                            colorScheme="blue"
                            isLoading={isSubmitting}
                            type="submit"
                          >
                            Guardar
                          </Button>
                          <Button onClick={onCloseModal}>Cancelar</Button>
                        </ModalFooter>
                      </form>
                    </ModalContent>
                  </Modal>

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
