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
  Grid,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { api } from "../../api";
import EstimarUsModal from "../../components/EstimarUsModal/EstimarUsModal";

import AsignarUsASprintModal from "../AsignarUsASprintModal/AsignarUsASprintModal";
import AsignarDevUsModal from "../../components/AsignarDevUsModal/AsignarDevUsModal";
import { MdTimer } from "react-icons/md";
import { BsFillPersonPlusFill, BsFillPeopleFill } from "react-icons/bs";
import { GiSprint } from "react-icons/gi";
import { tienePermiso } from "../../util";
import { PERMISOS_MACRO } from "../../pages/roles/permisos";

const USListUnset = ({
  projectId,
  setUserStories,
  userStories,
  nombreLista,
  children,
  dispatchError,
  thisMember,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEstimarModal, setShowEstimarModal] = useState(false);
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [showAsignarDevModal, setShowAsignarDevModal] = useState(false);
  const onClose = () => setIsOpen(false);
  const onDelete = (id) => {
    console.log(id);
    eliminarUS(id);
    setIsOpen(false);
  };
  const toast = useToast();
  const cancelRef = React.useRef();

  const eliminarUS = async (id) => {
    console.log(id);
    await api.eliminarUS(projectId, id);
    api.getUserStories(projectId).then(({ data }) => setUserStories(data));
  };

  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const onCloseModal = () => setIsOpenModal(false);
  const [isOpenModalAssign, setIsOpenModalAssign] = React.useState(false);
  const onCloseModalAssign = () => setIsOpenModalAssign(false);
  const [isOpenModalAssignDev, setIsOpenModalAssignDev] = React.useState(false);
  const onCloseModalAssignDev = () => setIsOpenModalAssignDev(false);

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
        console.log(res.statusText);
        if (res.statusText == "OK") {
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
    await api.userStories
      .getUserStories(projectId)
      .then(({ data }) => setUserStories(data));
    setIsOpenModal(false);
  }

  const onCloseAsignarSprint = async () => {
    setShowAsignarModal(false);
    await api
      .getUserStories(projectId)
      .then(({ data }) => setUserStories(data));
  };

  return (
    <Box
      minHeight="255px"
      maxHeight="80%"
      borderWidth="2px"
      borderRadius="lg"
      borderColor="#c9ccd1"
      fontSize="sm"
      bg={"#F5F4F5"}
      justifyContent="center"
      minW={1000}
    >
      <Flex justify="center">
        <Heading fontSize="3xl" marginTop={3}>
          {nombreLista}
        </Heading>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" paddingLeft={3} paddingRight={2}>
        {userStories
          ? userStories.map((us) => {
              return (
                <Box
                  borderRadius="8"
                  p="2"
                  m="2"
                  key={us.id}
                  bg="white"
                  boxShadow="md"
                  w="xs"
                  borderWidth={2}
                >
                  <Flex>
                    <Text fontSize="20px" fontWeight="semibold">
                      {us.nombre}
                    </Text>
                    <Text ml="auto" fontSize="xs">
                      {us.asignado ? (
                        <p>
                          Asignado a: <br /> {us.asignado.nombre}
                        </p>
                      ) : (
                        <p>No asignado</p>
                      )}
                    </Text>
                  </Flex>
                  <Text fontSize="15px">{us.contenido}</Text>
                  <Box mt="2">
                    <Text>{`Estimación SM: ${
                      us.estimacionSM || "Sin estimar"
                    }`}</Text>
                    <Text>{`Estimación Dev: ${
                      us.estimacionesDev || "Sin estimar"
                    }`}</Text>

                    <Text>
                      {`${
                        us.estimacionesDev && us.estimacionSM
                          ? (us.estimacionesDev + us.estimacionSM) / 2 +
                            " horas"
                          : ""
                      }`}
                    </Text>
                  </Box>

                  {thisMember?.rol.nombre === "Scrum Master" ||
                  thisMember?.id === us.asignado?.id ? (
                    <Flex>
                      {tienePermiso(thisMember, PERMISOS_MACRO.MODIFICAR_US) ? (
                        <Button
                          onClick={() => {
                            setIsOpenModal(true);
                            setFocusedUS(us);
                          }}
                          mt="2"
                        >
                          <EditIcon color="black.500" />
                        </Button>
                      ) : null}

                      {tienePermiso(thisMember, PERMISOS_MACRO.ESTIMAR_US) ? (
                        <Button
                          onClick={() => {
                            setFocusedUS(us);
                            setShowEstimarModal(true);
                          }}
                          mt="2"
                          ml="1"
                        >
                          <MdTimer />
                        </Button>
                      ) : null}
                      {focusedUS && (
                        <EstimarUsModal
                          projectId={projectId}
                          US={focusedUS}
                          rolUsuario={
                            thisMember?.rol.nombre === "Scrum Master"
                              ? "SM"
                              : "dev"
                          }
                          isOpen={showEstimarModal}
                          onClose={() => {
                            setShowEstimarModal(false);

                            api
                              .getUserStories(projectId)
                              .then(({ data }) => setUserStories(data));
                          }}
                        />
                      )}

                      {tienePermiso(
                        thisMember,
                        PERMISOS_MACRO.ASIGNAR_MIEMBROS_A_US
                      ) ? (
                        <>
                          <Button
                            onClick={() => {
                              setFocusedUS(us);
                              setShowAsignarDevModal(true);
                            }}
                            mt="2"
                            ml="1"
                          >
                            <BsFillPeopleFill />
                          </Button>
                          {focusedUS && (
                            <AsignarDevUsModal
                              projectId={projectId}
                              US={focusedUS}
                              isOpen={showAsignarDevModal}
                              dispatchError={dispatchError}
                              onClose={async () => {
                                setShowAsignarDevModal(false);

                                await api.userStories
                                  .getUserStories(projectId)
                                  .then(({ data }) => setUserStories(data));
                              }}
                            />
                          )}
                        </>
                      ) : null}

                      {thisMember?.rol.nombre === "Scrum Master" ? (
                        <Button
                          onClick={() => {
                            setFocusedUS(us);
                            setShowAsignarModal(true);
                          }}
                          mt="2"
                          ml="1"
                        >
                          Sprint{/* <GiSprint /> */}
                        </Button>
                      ) : null}
                      {focusedUS && (
                        <AsignarUsASprintModal
                          projectId={projectId}
                          US={focusedUS}
                          isOpen={showAsignarModal}
                          dispatchError={dispatchError}
                          onClose={onCloseAsignarSprint}
                        />
                      )}

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
                              <FormControl
                                isInvalid={errors.description}
                                mt={4}
                              >
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
                                  {errors.description &&
                                    errors.description.message}
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

                      {tienePermiso(thisMember, PERMISOS_MACRO.ELIMINAR_US) ? (
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
                      ) : null}
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
                  ) : null}
                </Box>
              );
            })
          : null}
      </Grid>

      {children}
    </Box>
  );
};

export default USListUnset;
