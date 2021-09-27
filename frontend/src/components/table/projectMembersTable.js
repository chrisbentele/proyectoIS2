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
} from '@chakra-ui/react';

export default function ProjectMembersTable( props ) {

  const users = props.users;
  const setUsers = props.setUsers;
  const members = props.members;
  const projectId = props.projectId;
  const setMembers = props.setMembers;
  const ROLES = props.ROLES;

  //funcion que se encarga de eliminar un usuario del proyecto mediante la tabla
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

  const data = React.useMemo(() => {
    return (
      members.map((member) => {
        return {
          nombre: member.nombre,
          role:
            <Select
              pb="4"
              onChange={(e) => {
                api
                  .setUserRole(e.target.value, projectId, member.id);
              }}
            >
              <option hidden>{console.log(member)}</option>
              {ROLES.map((x, i) => (
                <option key={i} value={i}>
                  {x.nombre}
                </option>
              ))}
            </Select>,
          remove: <DeleteIcon id={member.id} deleteById={removeMember} />
        }
      }))
  }, [members, ROLES, projectId])


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