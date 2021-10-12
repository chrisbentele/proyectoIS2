/**
 * @file DesasignarUsModal.js
 * @brief Modal cuando se elimina una US del Sprint
 */

import { useRef } from "react";
import { api } from "../../api";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

const DesasignarUsSprint = ({
  projectId,
  spId,
  usId,
  isOpen,
  onClose,
  setSprints,
}) => {
  const cancelRef = useRef();

  const onRemoveUs = () => {
    api.userStories.desasignarUsASprint({ projectId, spId, usId });
    api.sprints.getSprints(projectId).then(({ data }) => setSprints(data)); //actualizar que se elimino
    onClose(true);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Eliminar Sprint
          </AlertDialogHeader>

          <AlertDialogBody>
            ¿Está seguro que desea Eliminar el Sprint?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onRemoveUs} ml={3}>
              Eliminar Sprint
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DesasignarUsSprint;
