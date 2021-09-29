//Pagina de creacion de proyectos

import Select from "react-select";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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
import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/DbAuth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreateUserStory({ props }) {
  console.log(props);
  const projectId = props.computedMatch.params.id;
  const [users, setUsers] = useState([]); //Los usuarios del sistema
  const { user } = useAuth0();
  const toast = useToast();
  //Al cargarse la pagina se buscan todos los usuarios
  useEffect(() => {
    api
      .getUsers()
      .then((fetchedUsers) => {
        if (!Array.isArray(fetchedUsers)) return;
        setUsers(fetchedUsers);
      })
      .catch((err) => console.log(err));
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
    console.log(user);
    await api
      .createUserStory({ ...values, id: user.sub, idProyecto: projectId })
      .then((res) => {
        if (res.id) {
          toast({
            description: "US Creado.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            description: "US no pudo crearse.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }

        history.push(`/projects/${res.id}`); //luego de crear exitosamente el proyecto, se redirige a la pagina del proyecto
      })
      .catch((err) => console.log(err));
  }

  return (
    <Center p="4" minHeight="100vh" flexDirection="column" bg={"#2A262C"}>
      <Heading fontSize="4xl" mb="4" color={"#F5F4F5"}>
        Crear User Story
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
            <FormLabel fontSize="25px">Nombre de US</FormLabel>
            <Input
              fontSize="lg"
              id="usName"
              placeholder="Hacer..."
              borderColor="grey.300"
              {...register("usName", {
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
          <FormLabel fontSize="25px">Descripcion</FormLabel>
          <Input
            fontSize="lg"
            id="description"
            placeholder="Descripcion"
            borderColor="grey.300"
            {...register("description", {
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
