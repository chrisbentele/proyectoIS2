import React from 'react';
import { useTable } from 'react-table'
//! API del frontend.
import { api } from "../../api";
//! Botón de borrar
import DeleteIcon from "../../components/deleteIcon/deleteIcon";
import {
  Box,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast
} from '@chakra-ui/react';

export default function ProjectMembersTable(props) {

  const users = props.users;
  const setUsers = props.setUsers;
  const members = props.members;
  const projectId = props.projectId;
  const setMembers = props.setMembers;
  const ROLES = props.ROLES;
  const toast = useToast();

  /**
   * funcion que se encarga de eliminar un usuario del proyecto mediante la
   * tabla
   */
  const removeMember = (memberId) => {
    if (window.confirm(`desea eliminar al usuario del proyecto?`)) {
      //solicita la confirmacion al usuario
      api.removeMemberFromProject(projectId, memberId).then((res) => {
        if (res) {
          let removedUser;
          const updatedMembers = members.filter((member) => {
            if (member.id !== memberId) {
              return true;
            } else {
              removedUser = { ...member };
              return false;
            }
          });
          setUsers([...users, removedUser]);
          setMembers(updatedMembers);
        }
      });
    }
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
      if (roleId !== 1) {
        api
          .setUserRole(roleId, projectId, memberId);
        api.getMembers(projectId).then(membersRes => setMembers(membersRes));
      }
      else {
        if (members.filter(x => x.rol.rol === 1).length > 0) {
          api.setUserRole(2, projectId, members.filter(x => x.rol.rol === 1)[0].id);
          api.setUserRole(roleId, projectId, memberId);
          api.getMembers(projectId).then(membersRes => setMembers(membersRes));
        }
      }
  }

  const data = React.useMemo(() => {
    return (
      members.map(member => {
        if (member) {
          return {
            nombre: member.nombre,
            role: member.rol.rol !== 1 ?
              <Select
                pb="4"
                onChange={(e) => changeRole(parseInt(e.target.value) + 1, member.id)}
              >
                <option hidden>{
                  ROLES.filter(x => x.id === member.rol.rol).length > 0 ?
                    ROLES.filter(x => x.id === member.rol.rol)[0].nombre :
                    null
                }
                </option>
                {ROLES.map((x, i) => (
                  <option key={i} value={i}>
                    {x.nombre}
                  </option>
                ))}
              </Select> :
              <Select
              pb="4"
              isDisabled="true"
              >
                <option hidden>{
                  ROLES.filter(x => x.id === member.rol.rol).length > 0 ?
                    ROLES.filter(x => x.id === member.rol.rol)[0].nombre :
                    null
                }
                </option>
            </Select>,
            remove: member.rol.rol !== 1 ?
              <DeleteIcon id={member.id} deleteById={removeMember} /> :
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
  }, [members, ROLES, removeMember, projectId, changeRole])


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