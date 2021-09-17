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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { createProject } from "../../api/projects";
import { useAuth } from "../../providers/DbAuth";
import { useHistory } from "react-router";
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
      .then((users) => setUsers(users))
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
    <Center p="4">
      <Flex justifyContent="center" width="70ch">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.nombre}>
            <FormLabel fontSize="20px">Nombre del proyecto</FormLabel>
            <Input
              id="nombre"
              placeholder="nombre"
              borderColor="grey.300"
              {...register("nombre", {
                required: "Valor Requerido",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
              onChange={(e) =>
                setFormValues({ ...formValues, projectName: e.target.value })
              }
            />
            <FormErrorMessage>
              {errors.nombre && errors.nombre.message}
            </FormErrorMessage>
          </FormControl>
          Scrum Master
          <Select
            onChange={(e) =>
              setFormValues({ ...formValues, scrumMasterId: e.value })
            }
            options={users.map((user) => {
              return { value: user.id, label: user.nombre };
            })}
          />
          <FormControl isInvalid={errors["estimado"]}>
            <FormLabel fontSize="20px">Duracion estimada(semanas)</FormLabel>
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
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Flex>
    </Center>
  );
}
