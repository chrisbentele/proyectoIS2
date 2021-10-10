import { useRef, useEffect, useState, setValue } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  Flex,
  Center,
  Select,
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
const Editar = ({
  projectId,
  US,
  rolUsuario,
  isOpen,
  onClose,
  dispatchError,
}) => {
  const initialRef = useRef();
  const [users, setUsers] = useState([]);

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
  }, [dispatchError]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const onSubmit = (data) => {
    if (rolUsuario == "SM") {
      api.editUS({ projectId, usId: US.id, estimacionSM: data.estimacion });
    } else if (rolUsuario == "dev") {
      api.editUS({ projectId, usId: US.id, estimacionesDev: data.estimacion });
    }
    onClose();
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asignar US</ModalHeader>

        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormControl isInvalid={errors["estimado"]}>
              <FormLabel fontSize="25px">awa</FormLabel>
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
                  <Select
                    onChange={(e) => setValue("scrumMasterId", e.value)}
                    options={users.map((user) => {
                      return { value: user.id, label: user.nombre };
                    })}
                  />
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
