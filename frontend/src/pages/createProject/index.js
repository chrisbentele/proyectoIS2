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
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/DbAuth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { api } from "../../api";

export default function CreateProject() {
  const [users, setUsers] = useState([]); //Los usuarios del sistema
  const [formValues, setFormValues] = useState({
    //Los valores del form
    projectName: "", //nombre del proyecto
    scrumMasterId: null, //id del scrum master
    estimation: null, //duracion estimada del proyecto
  });

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
  } = useForm();
  const history = useHistory(); //para poder redirigir al usuario luego de la crecion exitosa del proyecto
  const { dbUser } = useAuth();
  async function onSubmit(values) {
    //funcion que define el comportamiento al confirmar el form
    await api
      .createProject(formValues)
      .then((res) => {
        console.log(res);
        history.push(`/projects/${res.id}`); //luego de crear exitosamente el proyecto, se redirige a la pagina del proyecto
      })
      .catch((err) => console.log(err));
  }

  return (
    <Center p="4" minHeight="100vh" flexDirection="column" bg={"#2A262C"}>
      <Heading fontSize="4xl" mb="4" color={"#F5F4F5"}>
        Crear Proyecto
      </Heading>
      <Flex
        justifyContent="center"
        width="80ch"
        borderWidth="2px"
        borderRadius="4"
        p="150px"
        bg="white"
        fontSize="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.nombre}>
            <FormLabel fontSize="25px">Nombre del proyecto</FormLabel>
            <Input
              fontSize="lg"
              id="nombre"
              placeholder="Proyecto 1"
              borderColor="grey.300"
              {...register("nombre", {
                required: "Valor Requerido",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
              onChange={(e) =>
                setFormValues({ ...formValues, projectName: e.target.value })
              }
            />
            <FormErrorMessage>
              {errors.nombre && errors.nombre.message}
            </FormErrorMessage>
          </FormControl>
          <FormLabel fontSize="25px">Scrum Master</FormLabel>
          <Select
            onChange={(e) =>
              setFormValues({ ...formValues, scrumMasterId: e.value })
            }
            options={users.map((user) => {
              return { value: user.id, label: user.nombre };
            })}
          />
          <FormControl isInvalid={errors["estimado"]}>
            <FormLabel fontSize="25px">Duracion estimada(semanas)</FormLabel>
            <Controller
              name="estimado"
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
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        estimation: e.target.value,
                      })
                    }
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
