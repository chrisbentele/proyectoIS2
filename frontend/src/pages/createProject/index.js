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
  Square,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { createProject } from "../../api/projects";
import { useAuth } from "../../providers/DbAuth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { api } from "../../api";

export default function CreateProject() {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState({
    projectName: "",
    scrumMasterId: null,
    estimation: null,
  });
  useEffect(() => {
    api
      .getUsers()
      .then((fetchedUsers) => {
        if (!Array.isArray(fetchedUsers)) return;
        setUsers(fetchedUsers);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(users);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const history = useHistory();
  const { dbUser } = useAuth();
  async function onSubmit(values) {
    await api
      .createProject(formValues)
      .then((res) => {
        console.log(res);
        history.push(`/projects/${res.id}`);
      })
      .catch((err) => console.log(err));
  }

  console.log(formValues);
  return (
    <Center p="4" height="90vh">
      <Flex
        justifyContent="center"
        width="70ch"
        borderWidth="2px"
        borderRadius="4"
        p="4"
        bg={"#F7FFF7"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.nombre}>
            <FormLabel fontSize="30px">Crear Proyecto</FormLabel>
            <FormLabel fontSize="30px">Nombre del proyecto</FormLabel>
            <Input
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
          <FormLabel fontSize="30px">Scrum Master</FormLabel>
          <Select
            onChange={(e) =>
              setFormValues({ ...formValues, scrumMasterId: e.value })
            }
            options={users.map((user) => {
              return { value: user.id, label: user.nombre };
            })}
          />
          <FormControl isInvalid={errors["estimado"]}>
            <FormLabel fontSize="30px">Duracion estimada(semanas)</FormLabel>
            <Controller
              name="estimado"
              control={control}
              rules={{ required: "Valor Requerido" }}
              defaultValue={1}
              render={(props) => (
                <NumberInput
                  value={props.field.value}
                  onChange={props.field.onChange}
                >
                  <NumberInputField
                    //TODO: Only allow numbers, also accepts 'e' char
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
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
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
