/**
 * @file EditarSprintModal.js
 * @brief Modal cuando se edita el sprint
 */

import { useRef } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../api";
const Editar = ({ projectId, sprint, isOpen, onClose }) => {
  const initialRef = useRef();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const onSubmit = (data) => {
    api.sprints.editSprint({ projectId, spId: sprint.id, ...data });
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Sprint</ModalHeader>

        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.nombre}>
              <FormLabel fontSize="25px" htmlFor="nombre">
                Nombre
              </FormLabel>
              <Input
                id="nombre"
                ref={initialRef}
                defaultValue={sprint?.nombre}
                {...register("nombre", {
                  required: "This is required",
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

            <FormControl isInvalid={errors["estimado"]}>
              <FormLabel fontSize="25px">Duración estimada(dias)</FormLabel>
              <Controller
                name="estimacion"
                control={control}
                rules={{ required: "Valor Requerido" }}
                defaultValue={sprint?.estimacion}
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
                    <NumberInputField fontSize="lg" borderColor="grey.300" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              <FormErrorMessage>{errors["estimado"]?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={4}
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
              onClick={onClose}
            >
              Editar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Editar;
