import React, { useState } from 'react';
import { useTable } from 'react-table'
//! API del frontend.
import { api } from "../../api";
//! Botón de borrar
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tooltip
} from '@chakra-ui/react';

import { DeleteIcon } from "@chakra-ui/icons";

export default function ProjectMembersTable(props) {

  const setUsers = props.setUsers;
  const members = props.members;
  const projectId = props.projectId;
  const setMembers = props.setMembers;
  const ROLES = props.ROLES;

  const SCRUM_MASTER = 0;
  const DEV_TEAM = 1;
  const PROD_OWN = 2;

  const [isOpen, setIsOpen] = useState()
  const onClose = () => setIsOpen(false)
  const onDelete = (memberId) => {
    setIsOpen(false);
    removeMember(memberId);
  }
  const cancelRef = React.useRef()

  /**
   * funcion que se encarga de eliminar un usuario del proyecto mediante la
   * tabla
   */
  const removeMember = (memberId) => {
    api.removeMemberFromProject(projectId, memberId).then((res) => {
      
        api.getUsers().then(({data: usersRes}) => {
          api.getMembers(projectId).then(({data: membersRes}) => {
            let membersIds = membersRes.map((member) => member.id);
            let filteredUsers = usersRes.filter(
              (user) => !membersIds.includes(user.id)
            );
            setUsers([...filteredUsers]);
            setMembers(membersRes);
          });
        }
        )
      
    });
  };

  /**
   * Cambiar el role de un miembro del proyecto, si se cambia a un role
   * distinto al de Scrum Master, se procede normalmente, sino se verifica
   * quién es el Scrum Master actual y se lo parte del Dev team y luego se
   * asigna al Scrum Master nuevo (Se asume que el rol 1 está reservado para
   * el Scrum Master).
   * @param roleId      El rol a asignar  
   * @param memberId    Miembro al cual se le asignará 
   */
  const changeRole = (roleId, memberId) => {
    if (roleId !== ROLES[SCRUM_MASTER].id) {
      api
        .setUserRole(roleId, projectId, memberId);
      api.getMembers(projectId).then(membersRes => setMembers(membersRes));
      console.log(members)
    }
    else {
      console.log(members)
      //if (members.filter(x => x.rol.rol === ROLES[SCRUM_MASTER].rol).length > 0) {
      //   api.setUserRole(2, projectId, members.filter(x => x.rol.rol === 1)[0].id);
      //   api.setUserRole(roleId, projectId, memberId);
      //   api.getMembers(projectId).then(membersRes => setMembers(membersRes));
      // }
    }
  }

  const data = React.useMemo(() => {
    return (
      members.map(member => {
        if (member) {
          return {
            nombre: member.nombre,
            role:
              <Select
                pb="4"
                onChange={(e) => changeRole(ROLES[e.target.value].id, member.id)}
                isDisabled={member.rol?.rol === ROLES[SCRUM_MASTER].id}
              >
                <option hidden>{
                  ROLES.filter(x => x.id === member.rol?.rol).length > 0 ?
                    ROLES.filter(x => x.id === member.rol?.rol)[0].nombre :
                    null
                }
                </option>
                {ROLES.map((x, i) => (
                  <option key={i} value={i}>
                    {x.nombre}
                  </option>
                ))}
              </Select>,
            remove: member.rol?.rol !== ROLES[SCRUM_MASTER].id ?
              <>
              <Tooltip label="Eliminar este miembro del proyecto.">
                <Button onClick={() => setIsOpen(true)} >
                  <DeleteIcon />
                </Button>
                </Tooltip>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Eliminar miembro
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        ¿Está seguro que desea eliminar a este miembro?
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={() => onDelete(member.id)} ml={3}>
                          Eliminar
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </> :
              null,
          }
        } else {
          return {
            nombre: null,
            role: null,
            remove: null,
          }
        }
      }))
  }, [members, ROLES, projectId, changeRole])


  const columns = React.useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "nombre", // String-based value accessors!
      },
      {
        Header: "Rol",
        accessor: "role"
      },
      {
        Header: "Eliminar",
        accessor: "remove",
      },
    ],
    []
  );

  const tabla = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tabla;

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
  )
}