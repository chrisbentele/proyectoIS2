//! Componentes del Chakra UI
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
  Spinner,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Divider
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
//! Librerías de React.js.
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { projectStateToString } from "../../util";

export default function ProjectConfig({ props, dispatchError }) {
  const [project, setProject] = useState();

  const projectId = props.computedMatch.params.id;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const history = useHistory(); /*para poder redirigir al usuario luego de la
  crecion exitosa del proyecto*/

  const [isOpen, setIsOpen] = useState()
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  //Al cargarse la pagina se buscan todos los usuarios
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then(({ data: res }) => setProject(res))
      .catch((err) => console.log(err));

  }, [projectId]);

  async function onSubmit(values) {
    //funcion que define el comportamiento al confirmar el form
    await api
      .editProject({ projectId, ...values })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) =>
        dispatchError(null, "No se ha podido guardar los cambios del proyecto"));

    history.push(`/projects/${projectId}`)
    console.log(values)
  }

  return (
    project ?
      <Box mt="65px">
        <Button
          onClick={() => history.push(`/projects/${projectId}`)}
          style={{ marginLeft: "5px", alignSelf: "flex-start" }}
        >
          Volver al proyecto
        </Button>
        <Flex
          justifyContent="center"
          width="70ch"
          p="120px"
          bg="white"
          fontSize="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.nombre}>
              <FormLabel fontSize="25px">Nombre del proyecto</FormLabel>
              <Input
                defaultValue={project.nombre}
                fontSize="lg"
                id="projectName"
                placeholder="Proyecto 1"
                {...register("projectName", {
                  required: "Valor Requerido",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.nombre && errors.nombre.message}
              </FormErrorMessage>
            </FormControl>
            <FormLabel fontSize="25px">Estado</FormLabel>
            <Select
              {...register("status", {
                required: "Valor Requerido",
              })}>
              <option value={project.estado} hidden>{projectStateToString(project.estado)}</option>
              <option value="0">Pendiente</option>
              <option value="1">Activo</option>
              <option value="2">Terminado</option>
            </Select>
            <FormControl isInvalid={errors["estimado"]}>
              <FormLabel fontSize="25px">Duración estimada(semanas)</FormLabel>
              <Controller
                name="estimation"
                control={control}
                rules={{ required: "Valor Requerido" }}
                defaultValue={project.duracionEstimada}
                render={(props) => (
                  <NumberInput
                    fontSize="lg"
                    value={props.field.value}
                    onChange={props.field.onChange}
                  >
                    <NumberInputField
                      //TODO: Only allow numbers, also accepts 'e' char
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
              <FormErrorMessage>{errors["estimado"]?.message}</FormErrorMessage>
            </FormControl>
            <Flex>
              <Button
                mt={4}
                bg={"green.200"}
                isLoading={isSubmitting}
                type="submit"
                fontSize="lg"
                _hover={{ background: "green.400" }}
                _active={{ background: "green.400" }}
              >
                Guardar
              </Button>
              <Spacer />
              <Box
                color="richBlack"
                width="max-content"
                mt="6"
                mr="3"
                fontWeight="600"
                textDecorationLine="underline"
                fontSize="lg"
              >
                <Link
                  to={"/projects/" + projectId}
                  mt={4}
                  bg="black"
                >
                  Cancelar
                </Link>
              </Box>
            </Flex>
            <Box pt="25rem">
              <FormLabel fontSize="25px">Eliminar proyecto</FormLabel>
              <Button
                bg="red.400"
                color="white"
                _hover={{ background: "red.500" }}
                _active={{ background: "grey", }}
                onClick={() => setIsOpen(true)}
              >
                Eliminar
              </Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Eliminar el proyecto permanentemente
                    </AlertDialogHeader>
                    <AlertDialogBody>
                      ¿Está seguro que desea eliminar el proyecto permanentemente?
                      <Divider />
                      Esta acción no se puede revertir.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button
                        bg="red.400"
                        color="white"
                        _hover={{ background: "red.500" }}
                        _active={{ background: "grey", }}
                        onClick={
                          () => {
                            api
                              .deleteProject(projectId)
                              .then(res => {
                                console.log(res);
                                history.push(`/profile`);
                              }
                              );
                            setIsOpen(false);
                          }
                        }
                        ml={3}
                      >
                        Eliminar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
          </form>
        </Flex>
      </Box>
      :
      <>
        <Button
          onClick={() => history.push(`/projects/${projectId}`)}
          style={{ marginLeft: "5px", alignSelf: "flex-start" }}
        >
          Volver al proyecto
        </Button>
        <Flex
          justifyContent="center"
          width="70ch"
          p="120px"
          bg="white"
          fontSize="lg"
        >
          <Spinner size="xl" />
        </Flex>
      </>
  )
}
