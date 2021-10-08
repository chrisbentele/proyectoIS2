/**
 * @file index.js
 * @brief Página de creación de proyectos
 */
//! Componente de React Select
import Select from "react-select";
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
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
//! Librerías de React.js.
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Función principal de esta vista
 * @returns React Component
 */
export default function CreateProject({ dispatchError }) {
  const [users, setUsers] = useState([]); //Los usuarios del sistema
  const { user } = useAuth0();
  const toast = useToast();
  //Al cargarse la pagina se buscan todos los usuarios
  useEffect(() => {
    api
      .getUsers()
      .then(({ data }) => {
        if (!Array.isArray(data)) return;
        setUsers(data);
      })
      .catch((err) =>
        dispatchError(null, "error cargando usuarios del sistema")
      );
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm();
  const history = useHistory(); //para poder redirigir al usuario luego de la crecion exitosa del proyecto
  async function onSubmit(values) {
    //funcion que define el comportamiento al confirmar el form
    await api
      .createProject({ ...values, id: user.sub })
      .then(({ data }) => {
        console.log(data);
        history.push(`/projects/${data.id}`); //luego de crear exitosamente el proyecto, se redirige a la pagina del proyecto
      })
      .catch((err) => dispatchError(null, "No se ha podido crear el proyecto"));
  }

  return (
    <Center p="4" minHeight="100vh" flexDirection="column" bg={"#2A262C"}>
      <Heading fontSize="4xl" mb="4" color={"#F5F4F5"}>
        Crear Proyecto
      </Heading>
      <Flex
        justifyContent="center"
        width="70ch"
        borderWidth="2px"
        borderRadius="4"
        p="120px"
        bg="white"
        fontSize="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.nombre}>
            <FormLabel fontSize="25px">Nombre del proyecto</FormLabel>
            <Input
              fontSize="lg"
              id="projectName"
              placeholder="Proyecto 1"
              borderColor="grey.300"
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
          <FormLabel fontSize="25px">Scrum Master</FormLabel>
          <Select
            onChange={(e) => setValue("scrumMasterId", e.value)}
            options={users.map((user) => {
              return { value: user.id, label: user.nombre };
            })}
          />
          <FormControl isInvalid={errors["estimado"]}>
            <FormLabel fontSize="25px">Duración estimada(semanas)</FormLabel>
            <Controller
              name="estimation"
              control={control}
              rules={{ required: "Valor Requerido" }}
              defaultValue={1}
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
              colorScheme={"buttonScale"}
              isLoading={isSubmitting}
              type="submit"
              fontSize="lg"
            >
              Submit
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
                to="/profile"
                mt={4}
                colorScheme="teal"
                borderColor="black"
                bg="black"
              >
                Cancelar
              </Link>
            </Box>
          </Flex>
        </form>
      </Flex>
    </Center>
  );
}
