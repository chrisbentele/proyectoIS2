import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Radio,
  Stack,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { PERMISOS } from "./permisos";
import React from "react";
import { useForm } from "react-hook-form";

export const Role = () => {
  const [rol, setRol] = useState();
  let roles = [
    { title: "Admin", permisos: PERMISOS.map((x) => x.value) },
    { title: "Scrum Master", permisos: [1, 2] },
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data) => {};

  return (
    <Box>
      <Select
        onChange={(e) => {
          setRol(roles[e.target.value]);
        }}
      >
        <option hidden>Seleccione un rol</option>
        {roles.map((x, i) => (
          <option key={i} value={i}>
            {x.title}
          </option>
        ))}
      </Select>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <CheckboxGroup>
            <Grid templateColumns="repeat(5, 1fr)" gap={6} padding="10">
              {PERMISOS.map((x, i) => (
                <Checkbox
                  isChecked={rol?.permisos?.includes(x.value)}
                  key={i.toString()}
                >
                  {x.title}
                </Checkbox>
              ))}
            </Grid>
          </CheckboxGroup>
        </FormControl>

        <Button type="submit">Agregar</Button>
      </form>
    </Box>
  );
};

export default Role;
