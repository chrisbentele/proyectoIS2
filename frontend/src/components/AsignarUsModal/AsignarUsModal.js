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
import { useForm } from "react-hook-form";
import { api } from "../../api";
const Editar = ({
  projectId,
  US,
  sprintId,
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
  } = useForm();

  const onSubmit = (data) => {
    api.userStories.asignarUsAUsuario({
      projectId,
      usId: US.id,
      sprintId,
      userId: data.id,
    });

    onClose();
  };
  console.log(users);

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asignar US</ModalHeader>

        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormLabel fontSize="25px">Seleccionar un desarrollador</FormLabel>
            <Select
              onChange={(e) => setValue("developer", e.value)}
              options={users.map((user) => {
                return { value: user.id, label: user.nombre };
              })}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr={4}
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
            >
              Asignar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Editar;
