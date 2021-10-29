import React, { useState, useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

import { BsFillPersonPlusFill, BsFillPeopleFill } from "react-icons/bs";

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
  Textarea,
  //useDisclosure,
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
  useToast,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { PlusSquareIcon, EditIcon, TimeIcon } from "@chakra-ui/icons";
import { api } from "../../api";
import Select from "react-select";
import AsignarDevUsModal from "../../components/AsignarDevUsModal/AsignarDevUsModal";
import { tienePermiso } from "../../util";
import { PERMISOS_MACRO } from "../../pages/roles/permisos";
import { useAuth0 } from "@auth0/auth0-react";
import { MdPriorityHigh, MdTimer } from "react-icons/md";

import { getUsers } from "../../api/users";
import { desasignarUsASprint } from "../../api/userStories";
const USList = ({
  projectId,
  sprint,
  setUserStories,
  userStories,
  nombreLista,
  children,
  dispatchError,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedUS, setFocusedUS] = useState();
  const [isOpenAlertSp, setIsOpenAlertSp] = useState(false);
  const [isOpenRegHoras, setIsOpenRegHoras] = useState(false);
  const onClose = () => setIsOpen(false);
  const onCloseAlertSp = () => setIsOpenAlertSp(false);
  const onCloseRegHoras = () => setIsOpenRegHoras(false);
  const [valorDefault, setValorDefault] = useState(0);
  const toast = useToast();
  const onDelete = () => {
    eliminarUS(focusedUS);
    setIsOpen(false);
  };
  const onRemove = () => {
    desasignarUsASprint({
      projectId,
      sprintId: sprint.id,
      usId: focusedUS?.id,
    });
    setIsOpenAlertSp(false);
  };
  const cancelRef = React.useRef();

  const { user } = useAuth0();
  const [thisMember, setThisMember] = useState();
  const [project, setProject] = useState();
  let [contadorChange, setContadorChange] = useState();

  useEffect(() => {
    api
      .getMember(projectId, user.sub)
      .then(({ data: member }) => setThisMember(member))
      .catch((err) => console.log(err));
    api
      .getProjectById(projectId)
      .then(({ data: res }) => setProject(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (focusedUS && isOpenRegHoras)
      api.userStories
        .getRegistrosHoras({
          projectId,
          sprintId: sprint?.id,
          usId: focusedUS?.id,
        })
        .then((res) => {
          let regHoras = 0;
          if (res.data.length > 0) {
            res.data.forEach((reg) => {
              regHoras += reg.horas;
            });
            setValorDefault(regHoras);
          }
        })
        .catch((err) => err);
  }, [isOpenRegHoras, focusedUS?.id]);

  const moverUS = async (estado, usId) => {
    await api.editUS({ projectId, estado, usId });
    api
      .getUserStories(projectId, sprint.id)
      .then(({ data }) => setUserStories(data));
  };

  // const editarUS = async (usName, description, usId) => {
  //   await api.editUS({ projectId, usName, description, usId });
  //   api.getUserStories(projectId).then(({ data }) => setUserStories(data));
  // };

  const eliminarUS = async (id) => {
    await api.eliminarUS(projectId, id);
    api
      .getUserStories(projectId, sprint.id)
      .then(({ data }) => setUserStories(data));
  };

  //const { onOpen } = useDisclosure();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const onCloseModal = () => setIsOpenModal(false);
  // const onEdit = (nombre, contenido, id) => {
  //   editarUS(nombre, contenido, id);
  //   setIsOpenModal(false);
  // };

  const initialRef = React.useRef();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const {
    handleSubmit: handleSubmitRegHoras,
    register: registerRegHoras,
    formState: { errors: errorsRegHoras, isSubmitting: isSubmittingRegHoras },
    control: controlRegHoras,
  } = useForm();

  const {
    handleSubmit: handleSubmitPrio,
    register: registerPrio,
    formState: { errors: errorsPrio, isSubmitting: isSubmittingPrio },
    control: controlPrio,
  } = useForm();

  async function onSubmitPrio(values) {
    //funcion que define el comportamiento al confirmar el form
    console.log(values);
    await api
      .editUS({ ...values, projectId, usId: values.id })
      .then((res) => {
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
      .getUserStories(projectId, sprint.id)
      .then(({ data }) => setUserStories(data));
    setIsOpenModal(false);
  }

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
    await api.userStories
      .getUserStories(projectId, sprint.id)
      .then(({ data }) => setUserStories(data));
    setIsOpenModal(false);
  }

  async function onSubmitRegHoras(values) {
    //funcion que define el comportamiento al confirmar el form
    console.log({
      ...values,
      sprintId: sprint.id,
      projectId,
      usId: focusedUS?.id,
    });
    await api.userStories
      .registrarHoras({
        ...values,
        sprintId: sprint.id,
        projectId,
        usId: focusedUS?.id,
      })
      .then((res) => {
        if (res.data) {
          toast({
            description: "Horas registradas.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            description: "Horas no pudieron ser registradas.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  const onRemoverUsDeSprint = async () => {
    await moverUS(4, focusedUS?.id);
    await onRemove(focusedUS?.id);
  };

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
            return (
              <Box
                borderRadius="8"
                p="2"
                m="2"
                key={us.id}
                bg="white"
                boxShadow="md"
              >
                <Flex>
                  <Text fontSize="20px" fontWeight="semibold">
                    {us.nombre}
                  </Text>
                  <Text ml="auto" fontSize="xs">
                    Asignado a: <br />
                    {us.asignado?.nombre || "nadie"}
                  </Text>
                </Flex>
                <Text fontSize="15px">{us.contenido}</Text>
                {thisMember?.rol.nombre === "Scrum Master" ||
                thisMember?.id === us.asignado?.id ? (
                  <>
                    <Select
                      placeholder="cambiar estado"
                      size="sm"
                      onChange={(e) => {
                        moverUS(e.value, us.id);
                      }}
                      isDisabled={!sprint?.activo}
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
                          value: "3",
                          label: "QA",
                          isDisabled: us.estado === 3,
                        },
                      ]}
                    />
                    <Flex>
                      {tienePermiso(thisMember, PERMISOS_MACRO.MODIFICAR_US) &&
                      !sprint?.activo &&
                      !(project?.estado === 1) ? (
                        <Button
                          onClick={() => {
                            setIsOpenModal(true);
                            setFocusedUS(us);
                          }}
                          mt="2"
                          mr="2"
                          disabled={sprint?.activo}
                        >
                          <EditIcon color="black.500" />
                        </Button>
                      ) : null}

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
                                colorScheme="green"
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

                      {tienePermiso(
                        thisMember,
                        PERMISOS_MACRO.MODIFICAR_SPRINT
                      ) &&
                      !sprint?.activo &&
                      !(project?.estado === 1) ? (
                        <>
                          <Button
                            mt="2"
                            onClick={() => {
                              setIsOpenAlertSp(true);
                              setFocusedUS(us);
                            }}
                            ml="1"
                            bg=""
                            color="red.500"
                            borderWidth="1px"
                            borderColor="red.500"
                            _hover={{
                              background: "grey.200",
                            }}
                            _active={{
                              background: "white.200",
                            }}
                            disabled={sprint?.activo}
                          >
                            Remover del Sprint
                          </Button>
                          <AlertDialog
                            isOpen={isOpenAlertSp}
                            leastDestructiveRef={cancelRef}
                            onClose={onCloseAlertSp}
                          >
                            <AlertDialogOverlay>
                              <AlertDialogContent>
                                <AlertDialogHeader
                                  fontSize="lg"
                                  fontWeight="bold"
                                >
                                  Remover US del Sprint
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                  ¿Está seguro que desea remover esta US del
                                  sprint?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                  <Button
                                    ref={cancelRef}
                                    onClick={onCloseAlertSp}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button
                                    colorScheme="red"
                                    onClick={onRemoverUsDeSprint}
                                    ml={3}
                                  >
                                    Remover
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialogOverlay>
                          </AlertDialog>
                        </>
                      ) : null}

                      {tienePermiso(
                        thisMember,
                        PERMISOS_MACRO.MODIFICAR_SPRINT
                      ) && sprint?.activo ? (
                        <>
                          <Button
                            onClick={() => {
                              setFocusedUS(us);
                              setIsOpenRegHoras(true);
                            }}
                            mt="2"
                            ml="1"
                          >
                            <TimeIcon />
                          </Button>
                          <AlertDialog
                            isOpen={isOpenRegHoras}
                            onClose={onCloseRegHoras}
                          >
                            <AlertDialogOverlay>
                              <AlertDialogContent>
                                <AlertDialogHeader
                                  fontSize="lg"
                                  fontWeight="bold"
                                >
                                  Registrar horas de '{focusedUS?.nombre}'
                                </AlertDialogHeader>

                                <form
                                  onSubmit={handleSubmitRegHoras(
                                    onSubmitRegHoras
                                  )}
                                >
                                  <AlertDialogBody pb={6}>
                                    <FormControl
                                      isInvalid={errorsRegHoras["horas"]}
                                    >
                                      <FormLabel>
                                        Agregue la s horas trabajadas en esta US
                                        en el sprint actual.
                                      </FormLabel>
                                      <FormLabel>
                                        Horas totales ya registradas:{" "}
                                        {valorDefault}
                                      </FormLabel>
                                      <Controller
                                        name="horas"
                                        control={controlRegHoras}
                                        rules={{ required: "Valor Requerido" }}
                                        defaultValue={valorDefault}
                                        render={(props) => (
                                          <NumberInput
                                            fontSize="lg"
                                            value={props.field.value}
                                            onChange={(n) => {
                                              if (n > 0) {
                                                props.field.onChange(n);
                                              }
                                            }}
                                          >
                                            <NumberInputField
                                              fontSize="lg"
                                              borderColor="grey.300"
                                            />
                                            <NumberInputStepper>
                                              <NumberIncrementStepper />
                                              <NumberDecrementStepper />
                                            </NumberInputStepper>
                                          </NumberInput>
                                        )}
                                      />
                                    </FormControl>
                                    <FormControl
                                      isInvalid={errorsRegHoras["mensaje"]}
                                    >
                                      <FormLabel>Detalles</FormLabel>
                                      <Textarea
                                        {...registerRegHoras("mensaje", {
                                          required: "Valor Requerido",
                                          minLength: {
                                            value: 4,
                                            message:
                                              "Minimum length should be 4",
                                          },
                                        })}
                                      />
                                      <FormErrorMessage>
                                        {errorsRegHoras["mensaje"]?.message}
                                      </FormErrorMessage>
                                    </FormControl>
                                  </AlertDialogBody>

                                  <AlertDialogFooter>
                                    <Button
                                      isLoading={isSubmittingRegHoras}
                                      type="submit"
                                    >
                                      <PlusSquareIcon />
                                    </Button>
                                  </AlertDialogFooter>
                                </form>
                              </AlertDialogContent>
                            </AlertDialogOverlay>
                          </AlertDialog>
                        </>
                      ) : null}
                      <form onSubmit={handleSubmitPrio(onSubmitPrio)}>
                        {tienePermiso(
                          thisMember,
                          PERMISOS_MACRO.MODIFICAR_SPRINT
                        ) && sprint?.activo ? (
                          <>
                            <Flex
                              mt="2"
                              ml="1"
                              align="center"
                              width="fit-content"
                              bg="gray.100"
                              borderRadius="5"
                            >
                              <Text ml="2" mr="2">
                                Prioridad
                              </Text>
                              <Controller
                                name="prioridad"
                                control={controlPrio}
                                render={(props) => (
                                  <NumberInput
                                    max={10}
                                    min={1}
                                    defaultValue={us?.prioridad || 5}
                                    width="100px"
                                    borderWidth="0"
                                    value={props.field.value}
                                    onChange={(n) => {
                                      if (n > 0) {
                                        props.field.onChange(n);
                                        onSubmitPrio({ ...us, prioridad: n });
                                      }
                                    }}
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                )}
                              />
                            </Flex>
                          </>
                        ) : null}
                      </form>
                    </Flex>
                  </>
                ) : null}
              </Box>
            );
          })
        : null}
      {children}
    </Box>
  );
};

export default USList;
