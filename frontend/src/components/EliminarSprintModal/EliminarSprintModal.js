import { useRef } from "react";
import { api } from "../../api";

const eliminarSprint = ({ projectId, spId, isOpen, onClose }) => {
  const cancelRef = useRef();

  const onDeleteSprint = () => {
    console.log(data);
    api.sprints.deleteSprint({ projectId, spId });
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
            <Button colorScheme="green" onClick={onDeleteSprint} ml={3}>
              Eliminar Sprint
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default eliminarSprint;
