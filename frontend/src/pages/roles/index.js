/**
 * @file index.js
 * @brief Componente de la página para configurar roles.
 */
//! Librerías de React.js.
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Checkbox,
  CheckboxGroup,
  Select,
  Grid,
  Button,
  Flex,
} from "@chakra-ui/react";
import { PERMISOS } from "./permisos";
import { useForm } from "react-hook-form";
import { api } from "../../api/";
import { useHistory } from "react-router-dom";

export default function Roles({ props }) {
  const [add, setAdd] = useState();
  const projectId = props.computedMatch.params.id;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    const rolesFetch = await api.getRoles(projectId);
    if (rolesFetch.filter((x) => x.nombre === data.nombre_rol).length === 0) {
      api.addRole(projectId, data.nombre_rol, data.permisos);
      window.location.reload(false);
    }
  };
  const permisos_rol = watch("permisos", []); // Cambia los permisos de acuerdo al rol y permisos seleccionados
  const nombre_rol = watch("nombre_rol", []);
  const [listaRoles, setListaRoles] = useState([]);

  const url = props.computedMatch.url;

  const history = useHistory();

  useEffect(() => {
    api.getRoles(projectId).then((listaR) => setListaRoles(listaR));
  }, []);
  console.log(listaRoles);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "70px",
      }}
    >
      <Button
        onClick={() => history.push(`/projects/${projectId}`)}
        style={{ marginLeft: "5px", alignSelf: "flex-start" }}
      >
        Volver al proyecto
      </Button>
      <Flex p="16" justifyContent="center">
        <Box w="90ch">
          <Select
            pb="4"
            onChange={(e) => {
              const id = e.target.value;
              const rol = listaRoles.filter((x) => x.id === id)[0];
              console.log(e.target.value);
              setAdd(true);
              setValue("nombre_rol", rol?.nombre || "");
              setValue(
                "permisos",
                rol?.permisos.map((x) => x.toString()) || [] // Mapea los permisos si es un rol predefinido
              );
            }}
          >
            <option hidden>Seleccione un rol</option>
            {/* {ROLES.map((x, i) => (
            <option key={i} value={i}>
              {x.title}
            </option>
          ))} */}
            {listaRoles.map((x, i) => (
              <option key={i} value={x.id}>
                {x.nombre}
              </option>
            ))}
            <option onClick={() => setAdd(true)}>Agregar</option>
          </Select>
          <Box hidden={!add}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                isDisabled={
                  listaRoles.filter((x) => x.title === nombre_rol).length !== 0 // si el rol es uno pre definido
                }
                placeholder="Nombre del Rol"
                {...register("nombre_rol")}
              />
              <FormControl>
                <CheckboxGroup
                  value={permisos_rol}
                  onChange={(val) => setValue("permisos", val)}
                >
                  <Grid templateColumns="repeat(5, 1fr)" gap={6} padding="10">
                    {PERMISOS.map((x) => (
                      <Checkbox
                        key={x.value.toString()}
                        value={x.value.toString()}
                        isDisabled={
                          listaRoles.filter((x) => x.title === nombre_rol)
                            .length !== 0 // si el rol es uno pre definido
                        }
                      >
                        {x.title}
                      </Checkbox>
                    ))}
                  </Grid>
                </CheckboxGroup>
              </FormControl>
              <Button
                hidden={
                  listaRoles.filter((x) => x.title === nombre_rol).length !== 0
                } // si el rol es uno pre definido
                type="submit"
              >
                Agregar
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}
