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
  Spacer,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import { createProject } from "../../api/projects";
import { useAuth } from "../../providers/DbAuth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const history = useHistory();
  const { dbUser } = useAuth();
  async function onSubmit(values) {
    const proy_id = await createProject(
      values.nombre,
      dbUser.id,
      values.estimado
    );
    return history.push("/profile");
  }

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
            />
            <FormErrorMessage>
              {errors.nombre && errors.nombre.message}
            </FormErrorMessage>
          </FormControl>
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
                  <NumberInputField borderColor="grey.300" />
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
