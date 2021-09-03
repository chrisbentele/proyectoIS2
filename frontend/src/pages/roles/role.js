import { useState } from 'react';
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
  Grid, GridItem,
  Button, ButtonGroup
} from "@chakra-ui/react";
import { PERMISOS } from "./permisos";
import React from "react";
import { useForm } from 'react-hook-form';

export const Role = () => {
  const [rol, setRol] = useState();
  const [add, setAdd] = useState();
  let roles = [{ title: 'Admin', permisos: PERMISOS.map((x) => x.value) }, { title: 'Scrum Master', permisos: [1, 2] }];
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const onSubmit = data => console.log(data);
  console.log(watch("example")); // watch input value by passing the name of it

  console.log(rol);
  console.log(rol?.permisos.includes(0));
  return (
    <Box>
      <Select onChange={(e) => setRol(roles[e.target.value])}>
        <option hidden>Seleccione un rol</option>
        {roles.map((x, i) => (<option key={i} value={i} onClick={() => setAdd(false)}>{x.title}</option>))}
        <option onClick={() => setAdd(true)}>Agregar</option>
      </Select>
      <form onSubmit={handleSubmit(onSubmit)}>
        {add ? <Input placeholder="Nombre del Rol" {...register("example")} /> : null}
        <FormControl>
          <CheckboxGroup defaultValue="Itachi" onChange={(val) => setValue("ete", val)}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6} padding="10">
              {PERMISOS.map(x => (<Checkbox value={x.value.toString()} isDisabled={'Admin' === rol?.title || (!rol && !add)} isChecked={rol?.permisos.includes(x.value)}>{x.title}</Checkbox>))}
            </Grid>
          </CheckboxGroup>
        </FormControl>
        {add ? <Button type="submit">Agregar</Button> : null}
      </form>
    </Box>
  );
}

export default Role;

/* export const Role = () => {
  const [rol, setRol] = useState([]);

  console.log(rol);
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">Roles</FormLabel>
      <Select placeholder="Seleccione rol" onChange={(e)=>setRol(permisos[Object.keys(permisos)[parseInt(e.target.value)]])}>
        {Object.keys(permisos).map((x,i)=>(<option key={i} value={i.toString()}>{x}</option>))}
        <option>Agregar</option>
      </Select>
      <RadioGroup defaultValue="Itachi">
        <HStack spacing="24px">

          {rol.map(x=>(<Checkbox>{x.title}</Checkbox>))}
        </HStack>
      </RadioGroup>
      <FormHelperText>Select only if you're a fan.</FormHelperText>
    </FormControl>
  );
} */