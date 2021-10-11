import React, { useState } from "react";
import { useTable } from "react-table";
//! API del frontend.
import { api } from "../../api";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function AddMemberTable(props) {
  const users = props.users;
  const setUsers = props.setUsers;
  const state = props.state;
  const projectId = props.projectId;
  const setMembers = props.setMembers;

  const [isOpen, setIsOpen] = useState();
  const [focusedMember, setFocusedMember] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const data = React.useMemo(() => {
    const onAdd = async () => {
      await addMemberById(focusedMember?.id);
      setIsOpen(false);
    };

    /**
     * funcion que se encarga de agregar un usuario al proyecto mediante la tabla
     */
    const addMemberById = (userId) => {
      api.addMemberToProject(projectId, userId).then((res) => {
        api.getUsers().then(({ data: usersRes }) => {
          api.getMembers(projectId).then(({ data: membersRes }) => {
            let membersIds = membersRes.map((member) => member.id);
            let filteredUsers = usersRes.filter(
              (user) => !membersIds.includes(user.id)
            );
            setUsers([...filteredUsers]);
            setMembers(membersRes);
          });
        });
      });
    }; //solicita la confirmacion al usuario

    return users
      .filter((user) =>
        user.nombre.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
      .map((user) => {
        return {
          nombre: user.nombre,
          add: (
            <>
              <Button
                onClick={() => {
                  setIsOpen(true);
                  setFocusedMember(user);
                }}
              >
                <AddIcon />
              </Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Agregar miembro
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      ¿Está seguro que desea agregar a este miembro?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button colorScheme="green" onClick={onAdd} ml={3}>
                        Agregar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          ),
        };
      });
  }, [state.searchTerm, users, isOpen, projectId, setMembers, setUsers]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "nombre", // String-based value accessors!
      },
      {
        Header: "Agregar",
        accessor: "add",
      },
    ],
    []
  );

  const tablaAdd = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tablaAdd;

  return (
    <Box borderWidth="2px" borderRadius="lg">
      <Table {...getTableProps()} variant="simple">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
