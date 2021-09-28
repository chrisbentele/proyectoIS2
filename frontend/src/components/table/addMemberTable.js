import React from 'react';
import { useTable } from 'react-table'
//! API del frontend.
import { api } from "../../api";
//! Botón de agregar
import AddIcon from "../../components/addIcon";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

export default function AddMemberTable( props ) {

  const users = props.users;
  const setUsers = props.setUsers;
  const state = props.state;
  let members = props.members;
  const projectId = props.projectId;
  const setMembers = props.setMembers;

  
  /** 
   * funcion que se encarga de agregar un usuario al proyecto mediante la tabla
   */
  const addMemberById = (userId) => {
    console.log('members antes');
    console.log(members);
    if (window.confirm(`desea agregar al usuario al proyecto?`)) {
      api.addMemberToProject(projectId, userId).then((res) => {
        console.log(res);
        if (res) {
          let addedUser;
          const updatedUsers = users.filter((user) => {
            if (user.id !== userId) {
              return true;
            } else {
              addedUser = { ...user };
              return false;
            }
          });
          console.log('hola');
          setMembers([...members, addedUser]);
          console.log('members despues');
          console.log(members);
          setUsers(updatedUsers);
        }
      });
    } //solicita la confirmacion al usuario
  };

  const data = React.useMemo(() => {
    return (
      users
        .filter((user) =>
          user.nombre.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
        .map((user) => {
          return {
            nombre: user.nombre,
            add: <AddIcon id={user.id} addById={addMemberById} />,
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

  return(
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