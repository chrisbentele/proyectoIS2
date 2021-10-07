import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//! API del frontend.
import { api } from "../../api";
import { Box, Button, Grid, Input, Text } from "@chakra-ui/react";
import AddMemberTable from "../../components/table/addMemberTable";
import ProjectMembersTable from "../../components/table/projectMembersTable";

export default function ProjectMembers({ props, dispatchError }) {
  const [members, setMembers] = useState([]);
  const [ROLES, setROLES] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    loading: true,
    getMembersError: false,
    searchUsersError: "",
    searchTerm: "",
  });

  const projectId = props.computedMatch.params.id;
  const url = props.computedMatch.url;

  useEffect(() => {
    //Al cargar la pagina se buscan los usuarios
    api
      .getUsers()
      .then((usersRes) => {
        api
          .getMembers(projectId)
          .then((membersRes) => {
            let membersIds = membersRes.map((member) => member.id);
            let filteredUsers = usersRes.filter(
              (user) => !membersIds.includes(user.id)
            );
            setState({ ...state, loading: false });
            setUsers([...filteredUsers]);
            setMembers(membersRes);
          })
          .catch(() =>
            dispatchError(null, "error cargando miembros del proyecto")
          );
      })
      .catch((err) =>
        dispatchError(null, "error cargando usuarios del sistema")
      );
    api
      .getRoles(projectId)
      .then((listaR) => setROLES(listaR))
      .catch(() => dispatchError(null, "No se han podido cargar los roles"));
  }, []);

  const handleSearchChange = async (e) => {
    //TODO: add timeout
    try {
      setState({ ...state, searchTerm: e.target.value });
    } catch (error) {
      setState({ ...state, searchUsersError: "error buscando usuarios" });
    }
  };

  const actualizarMiembros = (miembrosNuevos) => {
    setMembers(miembrosNuevos);
  };

  const actualizarUsuarios = (usuariosNuevos) => {
    setUsers(usuariosNuevos);
  };

  return (
    <Box
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
      <Text>Miembros del proyecto</Text>
      <ProjectMembersTable
        members={[...members]}
        setMembers={actualizarMiembros}
        projectId={projectId}
        ROLES={ROLES}
        users={[...users]}
        setUsers={actualizarUsuarios}
        state={state}
      />

      <Text
        style={{ marginTop: "50px", marginBottom: "10px", fontWeight: "bold" }}
      >
        Agregar nuevo miembro
      </Text>

      <Grid gap={6}>
        <Input onChange={handleSearchChange} width="400px" />
        <AddMemberTable
          members={[...members]}
          setMembers={actualizarMiembros}
          projectId={projectId}
          ROLES={ROLES}
          users={[...users]}
          setUsers={actualizarUsuarios}
          state={state}
        />
      </Grid>
    </Box>
  );
}
