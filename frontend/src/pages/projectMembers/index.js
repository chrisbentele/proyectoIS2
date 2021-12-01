import React, { useState, useEffect } from "react";
//! API del frontend.
import { api } from "../../api";
import { Box, Button, Grid, Input, Text, Heading } from "@chakra-ui/react";
import AddMemberTable from "../../components/table/addMemberTable";
import ProjectMembersTable from "../../components/table/projectMembersTable";

import { useHistory } from "react-router-dom";
import GoBack from "../../components/button/goBack";

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

  const [project, setProject] = useState();

  const history = useHistory();

  useEffect(() => {
    //Al cargar la pagina se buscan los usuarios
    api
      .getProjectById(projectId)
      .then(({ data: res }) => {
        setProject(res);

        api
          .getUsers()
          .then((usersRes) => {
            api
              .getMembers(projectId)
              .then((membersRes) => {
                let membersIds = membersRes.data.map((member) => member.id);
                let filteredUsers = usersRes.data.filter(
                  (user) => !membersIds.includes(user.id)
                );
                setState((state) => ({ ...state, loading: false }));
                setUsers([...filteredUsers]);
                setMembers(membersRes.data);
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
          .then((res) => setROLES(res.data))
          .catch(() =>
            dispatchError(null, "No se han podido cargar los roles")
          );
      })
      .catch((err) => {
        dispatchError("Error", "No existe proyecto con el ID proveido", 5000);
        history.push("/profile");
      });
  }, [projectId, dispatchError]);

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
  console.log(project?.estado);
  return (
    <Box mt="55px">
      <GoBack
        ruta={`/projects/${projectId}`}
        title="Volver al proyecto"
        ml="2"
        mt="2"
      />
      <Box display="flex" flexDirection="column" alignItems="center" top="3rem">
        <Heading>Miembros del proyecto</Heading>
        <ProjectMembersTable
          members={[...members]}
          setMembers={actualizarMiembros}
          projectId={projectId}
          ROLES={ROLES}
          users={[...users]}
          setUsers={actualizarUsuarios}
          state={state}
        />
        {!(project?.estado === 1) ? (
          <>
            <Text
              style={{
                marginTop: "50px",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
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
          </>
        ) : null}
      </Box>
    </Box>
  );
}
