import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
//! API del frontend.
import { api } from "../../api";
import { Button } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import AddMemberTable from '../../components/table/addMemberTable';
import ProjectMembersTable from '../../components/table/projectMembersTable';


export default function ProjectMembers({ props }) {
  const [members, setMembers] = useState([]);
  const [ROLES, setROLES] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    loading: true,
    getMembersError: false,
    searchUsersError: "",
    searchTerm: "",
  });
  const [thisUserRole, setThisUserRole] = useState([]);

  const projectId = props.computedMatch.params.id;
  const url = props.computedMatch.url;

  const { user } = useAuth0();
  
  console.log(thisUserRole);

  useEffect(() => {
    //Al cargar la pagina se buscan los usuarios
    api.getUsers().then((usersRes) => {
      api.getMembers(projectId).then((membersRes) => {
        let membersIds = membersRes.map((member) => member.id);
        let filteredUsers = usersRes.filter(
          (user) => !membersIds.includes(user.sub)
        );
        setState({ ...state, loading: false });
        setUsers([...filteredUsers]);
        setMembers(membersRes);
      });
    });
    api
      .getRoles(projectId)
      .then((listaR) => setROLES(listaR));

  }, []);

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
      < ProjectMembersTable
          members={members}
          setMembers={setMembers}
          projectId={projectId}
          ROLES={ROLES}
          users={users}
          setUsers={setUsers}
          state={state}
      />

      <h2
        style={{ marginTop: "50px", marginBottom: "10px", fontWeight: "bold" }}
      >
        Agregar nuevo miembro
      </h2>
      <input
        onChange={handleSearchChange}
        style={{ border: "2px black solid", marginBottom: "20px" }}
      />
      < AddMemberTable 
          members={members}
          setMembers={setMembers}
          projectId={projectId}
          ROLES={ROLES}
          users={users}
          setUsers={setUsers}
          state={state}
      />
    </div>
  )
}