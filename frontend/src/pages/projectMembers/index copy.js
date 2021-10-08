/**
 * @file index.js
 * @brief Página donde se muestran los miembros de un proyecto.
 */

//! Librerías de React.js.
import React, { useState, useEffect } from "react";
//! A fast, lightweight, opinionated table and datagrid built on React.
import ReactTable from "react-table-v6";
//! Botón de borrar
import DeleteIcon from "../../components/deleteIcon/deleteIcon";
//! Estilo de la tabla
import "react-table-v6/react-table.css";
//! API del frontend.
import { api } from "../../api";
//! Botón de agregar
import AddIcon from "../../components/addIcon";
import { Button, Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Componente principal de esta página
 * @param { props } param0
 * @returns Reavt Component
 */
export default function ProjectMembers({ props, dispatchError }) {
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const projectId = props.computedMatch.params.id;
  const url = props.computedMatch.url;
  const [ROLES, setROLES] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    //Al cargar la pagina se buscan los usuarios
    api
      .getUsers()
      .then(({data}) => {
        api
          .getMembers(projectId)
          .then((membersRes) => {
            let membersIds = membersRes.map((member) => member.id);
            let filteredUsers = data.filter(
              (user) => !membersIds.includes(user.sub)
            );
            setState({ ...state, loading: false });
            setUsers([...filteredUsers]);
            setMembers(membersRes.data);
          })
          .catch((err) =>
            dispatchError(null, "error cargando miembros del proyecto")
          );
      })
      .catch((err) =>
        dispatchError(null, "error cargando usuarios del sistema")
      );
    api
      .getRoles(projectId)
      .then((listaR) => setROLES(listaR))
      .catch((err) => dispatchError(null, "error cargando roles"));
    console.log(ROLES);
  }, []);

  //funcion que se encarga de agregar un usuario al proyecto mediante la tabla
  const addMemberById = (userId) => {
    if (window.confirm(`desea agregar al usuario al proyecto?`)) {
      api.addMemberToProject(projectId, userId).then((res) => {
        if (res.data) {
          let addedUser;
          const updatedUsers = users.filter((user) => {
            if (user.sub != userId) {
              return true;
            } else {
              addedUser = { ...user };
              return false;
            }
          });
          setMembers([...members, addedUser]);
          setUsers(updatedUsers);
        }
      }).catch(err => dispatchError(null, 'error agregando usuario a proyecto'));
    } //solicita la confirmacion al usuario
  };

  //funcion que se encarga de eliminar un usuario del proyecto mediante la tabla
  const removeMember = (memberId) => {
    if (window.confirm(`desea eliminar al usuario del proyecto?`)) {
      //solicita la confirmacion al usuario
      api.removeMemberFromProject(projectId, memberId).then((res) => {
        if (res.data) {
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
      }).catch(err => dispatchError(null, 'error removiendo a miembro del proyecto'));
    }
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
      Header: "Rol",
      accessor: "role",
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
      <Button style={{ marginLeft: "5px", alignSelf: "flex-start" }}>
        <Link to={url.replace("/members", "")}>Volver al Proyecto</Link>
      </Button>
      <h2>Miembros del proyecto</h2>
      <ReactTable
        data={members.map((member) => {
          return {
            nombre: member.nombre,
            role: (
              <Select
                pb="4"
                onChange={(e) => {
                  api.setUserRole(e.target.value, projectId, member.id);
                }}
              >
                {" "}
                <option hidden>Seleccione un rol</option>
                {ROLES.map((x, i) => (
                  <option key={i} value={i}>
                    {x.nombre}
                  </option>
                ))}
              </Select>
            ),
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
                add: <AddIcon id={user.sub} addById={addMemberById} />,
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
