//! Componentes del Chakra UI
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Flex,
  Center,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
  useToast,
  Spinner,
  Select
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
//! Librerías de React.js.
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
import { projectStateToString } from "../../util";

export default function ProjectConfig({ props }) {
  const [users, setUsers] = useState([]); //Los usuarios del sistema
  const { user } = useAuth0();
  const toast = useToast();
  const [project, setProject] = useState();

  const projectId = props.computedMatch.params.id;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm();

  const history = useHistory(); /*para poder redirigir al usuario luego de la
  crecion exitosa del proyecto*/

  //Al cargarse la pagina se buscan todos los usuarios
  useEffect(() => {
    api
      .getUsers()
      .then((fetchedUsers) => {
        if (!Array.isArray(fetchedUsers)) return;
        setUsers(fetchedUsers);
      })
      .catch((err) => console.log(err));

    api
      .getProjectById(projectId)
      .then((res) => setProject(res))
      .catch((err) => console.log(err));

  }, []);

  async function onSubmit(values) {
    //funcion que define el comportamiento al confirmar el form
    console.log(values);
  }

  return (
    project ?
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
          <Select>
            <option hidden>{projectStateToString(project.estado)}</option>
            <option>Pendiente</option>
            <option>Iniciado</option>
            <option>Terminado</option>
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
              bg={"buttonScale.900"}
              isLoading={isSubmitting}
              type="submit"
              fontSize="lg"
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
        </form>
      </Flex> :
      <Flex
        justifyContent="center"
        width="70ch"
        p="120px"
        bg="white"
        fontSize="lg"
      >
        <Spinner size="xl" />
      </Flex>
  )
}