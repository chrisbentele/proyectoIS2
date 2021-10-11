import { useRef, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  Flex,
  Center,
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
import Select from "react-select";
const Editar = ({ projectId, US, isOpen, onClose, dispatchError }) => {
  const initialRef = useRef();
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    api.sprints
      .getSprints(projectId)
      .then(({ data }) => {
        setSprints(data);
      })
      .catch((err) =>
        dispatchError(null, "error cargando usuarios del proyecto")
      );
  }, [projectId, isOpen]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    if (US.asignado && US.estimacionSM && US.estimacionesDev) {
      api.userStories
        .asignarUsASprint({
          projectId,
          usId: US.id,
          sprintId: data.sprintId,
        })
        .catch((err) => dispatchError(null, "error asignando us a sprint"));
    } else if (!US.asignado) {
      return dispatchError(
        "No se pudo asignar la US al sprint",
        "Debe asignar a un desarrollador antes"
      );
    } else if (US.asignado && (!US.estimacionSM || US.estimacionesDev)) {
      return dispatchError(
        "No se pudo asignar la US al sprint",
        "Deben estimar ambos desarrolladores antes"
      );
    } else return dispatchError();
    onClose();
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asignar US a Sprint</ModalHeader>

        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormLabel fontSize="25px">Seleccionar un sprint</FormLabel>
            <Select
              onChange={(e) => setValue("sprintId", e.value)}
              options={sprints.map((sprint) => {
                return { value: sprint.id, label: sprint.nombre };
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
