import React, { useState } from 'react';
import { useTable } from 'react-table'
//! API del frontend.
import { api } from "../../api";
import {
  Box,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";

export default function AddMemberTable(props) {

  const users = props.users;
  const setUsers = props.setUsers;
  const state = props.state;
  let members = props.members;
  const projectId = props.projectId;
  const setMembers = props.setMembers;
  const ROLES = props.ROLES;

  const SCRUM_MASTER = 0;
  const DEV_TEAM = 1;
  const PROD_OWN = 2;

  const [isOpen, setIsOpen] = useState()
  const onClose = () => setIsOpen(false)
  const onAdd = (memberId) => {
    setIsOpen(false);
    addMemberById(memberId);
  }
  const cancelRef = React.useRef()


  /** 
   * funcion que se encarga de agregar un usuario al proyecto mediante la tabla
   */
  const addMemberById = (userId) => {
    api.addMemberToProject(projectId, userId).then((res) => {
      if (res) {
        api.setUserRole(ROLES[DEV_TEAM].id, projectId, userId);
        api.getUsers().then((usersRes) => {
          api.getMembers(projectId).then((membersRes) => {
            let membersIds = membersRes.map((member) => member.id);
            let filteredUsers = usersRes.filter(
              (user) => !membersIds.includes(user.id)
            );
            setUsers([...filteredUsers]);
            setMembers(membersRes);
          });
        }
        )
      }
    }
    )
  };//solicita la confirmacion al usuario


  const data = React.useMemo(() => {
    return (
      users
        .filter((user) =>
          user.nombre.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
        .map((user) => {
          return {
            nombre: user.nombre,
            add:
            <>
              <Button onClick={() => setIsOpen(true)} >
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
                      <Button colorScheme="green" onClick={() => onAdd(user.id)} ml={3}>
                        Agregar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>,
          };
        })
    )
  }, [members, addMemberById, state.searchTerm, users]);


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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tablaAdd;

  return (
    <Box borderWidth="2px" borderRadius="lg">
      <Table
        {...getTableProps()}
        variant="simple"
      >
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  );

}