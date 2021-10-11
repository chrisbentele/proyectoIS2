import { useRef } from "react";
import { useHistory } from "react-router";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
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
import { useAuth0 } from "@auth0/auth0-react";

const Editar = ({ projectId, US, rolUsuario, isOpen, onClose }) => {
  const initialRef = useRef();
  const { user } = useAuth0();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const history = useHistory()

  const onSubmit = async (data) => {
    await api.userStories.estimarUs({
      projectId,
      userId: user.sub,
      usId: US.id,
      estimacion: data.estimacion,
    });
        //TODO: quitar history y cambiar estado
    history.go(0)
    onClose();
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Estimar US</ModalHeader>

        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormControl isInvalid={errors["estimado"]}>
              <FormLabel fontSize="25px">Duración estimada(horas)</FormLabel>
              <Controller
                name="estimacion"
                control={control}
                rules={{ required: "Valor Requerido" }}
                defaultValue={
                  rolUsuario == "SM"
                    ? parseInt(US.estimacionSM || 1)
                    : parseInt(US.estimacionesDev || 1) || 1
                }
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
