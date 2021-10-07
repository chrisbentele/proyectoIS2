//Pagina de creacion de proyectos

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
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreateUserStory({ props, dispatchError }) {
  const [users, setUsers] = useState([]); //Los usuarios del sistema
  const { user } = useAuth0();
  const toast = useToast();
  console.log(props);
  const projectId = props.computedMatch.params.id;

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
      )
      .catch((err) => console.log(err));
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const history = useHistory(); //para poder redirigir al usuario luego de la crecion exitosa del proyecto
  async function onSubmit(values) {
    //funcion que define el comportamiento al confirmar el form
    await api
      .createUserStory({ ...values, projectId, creadoPor: user.sub })
      .then(({ data }) => {
        if (data.id) {
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

        history.push(`/projects/${projectId}`); //luego de crear exitosamente el proyecto, se redirige a la pagina del proyecto
      })
      .catch((err) => dispatchError(null, "error creando US"));
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
          <FormControl isInvalid={errors.usName}>
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
              {errors.usName && errors.usName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.description}>
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
              {errors.description && errors.description.message}
            </FormErrorMessage>
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
                to={`/projects/${projectId}`}
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
