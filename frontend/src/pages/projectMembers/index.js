import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import DeleteIcon from "../../components/deleteIcon/deleteIcon";
import "react-table-v6/react-table.css";
import { api } from "../../api";
import AddIcon from "../../components/addIcon";

export default function ProjectMembers(params) {
  useEffect(() => {
    const populateUsers = async () => {
      try {
        const data = await api.getUsers();
        if (!data instanceof Error) setUsers(data);
      } catch (error) {
        console.log("Error cargando usuarios");
      }
    };
    const populateMembers = async () => {
      try {
        const data = await api.getMembers();
        setState({ ...state, loading: false });
        if (!data instanceof Error) setMembers(data);

        let filteredUsers = [...users];
        const membersIds = members.map((member) => member.id);
        filteredUsers = filteredUsers.filter(
          (user) => !membersIds.includes(user.id)
        );
        setUsers([...filteredUsers]);
      } catch (err) {
        setState({ ...state, error: true });
        console.log(err);
      }
    };
    async function populateData() {
      await populateUsers();
      await populateMembers();
    }
    populateData();
  }, []);

  const addMemberById = (userId) => {
    window.confirm(`desea agregar al usuario al proyecto?`);
    api.addMemberToProject(params.match.params.id, userId);
  };

  const removeMember = (memberId) => {
    window.confirm(`desea eliminar al usuario del proyecto?`);
    api.removeMemberFromProject(params.match.params.id, memberId);
  };

  const [state, setState] = useState({
    loading: true,
    getMembersError: false,
    searchUsersError: "",
    searchTerm: "",
  });
  const [members, setMembers] = useState([
    { firstname: "Chris", id: 1, lastname: "Bentele", nickname: "jeje" },
  ]);
  const [users, setUsers] = useState([
    { firstname: "Chris", id: 1 },
    { firstname: "Jose", id: 2 },
  ]);

  const columns = [
    {
      Header: "Last Name",
      accessor: "lastname", // String-based value accessors!
    },
    {
      Header: "First Name",
      accessor: "firstname",
    },
    {
      Header: "Eliminar",
      accessor: "remove",
    },
  ];
  const addTableColumns = [
    {
      Header: "Last Name",
      accessor: "lastname", // String-based value accessors!
    },
    {
      Header: "First Name",
      accessor: "firstname",
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
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Miembros del proyecto</h2>
      <ReactTable
        data={members.map((member) => {
          return {
            firstname: member.firstname,
            lastname: member.lastname,
            remove: <DeleteIcon id={member.id} deleteById={removeMember} />,
          };
        })}
        columns={columns}
        showPaginationTop={false}
        showPaginationBottom={false}
        minRows={1}
        loadingText={"Loading"}
        noDataText={"No members found"}
        style={{ width: 700 }}
      />
      <h2>Agregar nuevo miembro</h2>
      <input
        onChange={handleSearchChange}
        style={{ border: "2px black solid" }}
      />
      <p>{state.searchUsersError}</p>
      {users.length > 0 && state.searchTerm.length > 0 ? (
        <ReactTable
          data={users
            .filter((user) =>
              user.firstname
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase())
            )
            .map((user) => {
              return {
                firstname: user.firstname,
                lastname: user.lastname,
                add: <AddIcon id={user.id} addById={addMemberById} />,
              };
            })}
          columns={addTableColumns}
          showPaginationTop={false}
          showPaginationBottom={false}
          minRows={1}
          loading={state.loading}
          defaultPageSize={10}
          loadingText={"Loading"}
          noDataText={"No members found"}
          style={{ width: 700 }}
        />
      ) : null}
    </div>
  );
}
