//Pagina donde se muestran los miembros de un proyecto

import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import DeleteIcon from "../../components/deleteIcon/deleteIcon";
import "react-table-v6/react-table.css";
import { api } from "../../api";
import AddIcon from "../../components/addIcon";

export default function ProjectMembers({ props }) {
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const projectId = props.computedMatch.params.id;

  useEffect(() => {
    //Al cargar la pagina se buscan los usuarios
    api.getUsers().then((usersRes) => {
      api.getMembers(projectId).then((membersRes) => {
        let membersIds = membersRes.map((member) => member.id);
        let filteredUsers = usersRes.filter(
          (user) => !membersIds.includes(user.id)
        );
        setState({ ...state, loading: false });
        setUsers([...filteredUsers]);
        setMembers(membersRes);
      });
    });
  }, []);

  //funcion que se encarga de agregar un usuario al proyecto mediante la tabla
  const addMemberById = (userId) => {
    window.confirm(`desea agregar al usuario al proyecto?`); //solicita la confirmacion al usuario
    api.addMemberToProject(projectId, userId).then((res) => {
      if (res) {
        let addedUser;
        const updatedUsers = users.filter((user) => {
          if (user.id != userId) {
            return true;
          } else {
            addedUser = { ...user };
            return false;
          }
        });
        setMembers([...members, addedUser]);
        setUsers(updatedUsers);
      }
    });
  };

  //funcion que se encarga de eliminar un usuario del proyecto mediante la tabla
  const removeMember = (memberId) => {
    window.confirm(`desea eliminar al usuario del proyecto?`); //solicita la confirmacion al usuario
    api.removeMemberFromProject(projectId, memberId).then((res) => {
      if (res) {
        let removedUser;
        const updatedMembers = members.filter((member) => {
          if (member.id != memberId) {
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
  };

  const [state, setState] = useState({
    loading: true,
    getMembersError: false,
    searchUsersError: "",
    searchTerm: "",
  });

  const columns = [
    {
      Header: "Nombre",
      accessor: "nombre", // String-based value accessors!
    },
    {
      Header: "Eliminar",
      accessor: "remove",
    },
  ];
  const addTableColumns = [
    {
      Header: "Nombre",
      accessor: "nombre", // String-based value accessors!
    },
    {
      Header: "Agregar",
      accessor: "add",
    },
  ];

  const handleSearchChange = async (e) => {
    //TODO: add timeout
    try {
      setState({ ...state, searchTerm: e.target.value });
    } catch (error) {
      setState({ ...state, searchUsersError: "error buscando usuarios" });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "70px",
      }}
    >
      <h2>Miembros del proyecto</h2>
      <ReactTable
        data={members.map((member) => {
          return {
            nombre: member.nombre,
            remove: <DeleteIcon id={member.id} deleteById={removeMember} />,
          };
        })}
        columns={columns}
        showPaginationTop={false} //no mostrar las paginas arriba
        showPaginationBottom={false} //no mostrar las paginas abajo
        minRows={1} // la minima cantidade de filas
        loadingText={"Cargando"} //Texto de carga
        noDataText={"No se han encontrado miembros"} //Texto a mostrar cuando no se han encontrado miembros
        style={{ width: 700 }} //ancho de la tabla
      />
      <h2
        style={{ marginTop: "50px", marginBottom: "10px", fontWeight: "bold" }}
      >
        Agregar nuevo miembro
      </h2>
      <p>Buscar por nombre</p>
      <input
        onChange={handleSearchChange}
        style={{ border: "2px black solid", marginBottom: "20px" }}
      />
      <p>{state.searchUsersError}</p>
      {users.length > 0 ? (
        <ReactTable
          data={users
            .filter((user) =>
              user.nombre.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
            .map((user) => {
              return {
                nombre: user.nombre,
                add: <AddIcon id={user.id} addById={addMemberById} />,
              };
            })}
          columns={addTableColumns}
          showPaginationTop={false} //no mostrar las paginas arriba
          showPaginationBottom={false} //no mostrar las paginas abajo
          minRows={1} //minima cantidad de filas
          loading={state.loading} //estado de busqueda
          defaultPageSize={100} //cantidad de filas default
          loadingText={"Cargando"} //texto de carga
          noDataText={"No se han encontrado Usuarios"} //texto a mostrar cuando no se han encontrado usuarios
          style={{ width: 700 }}
        />
      ) : null}
    </div>
  );
}
