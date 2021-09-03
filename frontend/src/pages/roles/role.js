import { useState } from 'react';
import {
  Box,
  FormControl,
  Input,
  Checkbox,
  CheckboxGroup,
  Select,
  Grid, Button
} from "@chakra-ui/react";
import { PERMISOS } from "./permisos";
import React from "react";
import { useForm } from 'react-hook-form';

export const Role = () => {
  const [rol, setRol] = useState();
  const [add, setAdd] = useState();
  let roles = [
    { title: 'Admin', permisos: PERMISOS.map((x) => x.value) },
    { title: 'Scrum Master', permisos: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { title: 'Developer team', permisos: [1, 2, 5, 6, 7, 8, 10, 11] }
  ];
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const onSubmit = data => console.log(data);
  //console.log(watch("example")); // watch input value by passing the name of it
  //value={x.value.toString()}

  //console.log(rol);
  //console.log(rol?.permisos.includes(0));
  //{PERMISOS.map(x => (console.log(rol?.permisos.includes(x.value))))}
  //{add ? x.value.toString():null}
  return (
    <Box>
      <Select onChange={(e) => setRol(roles[e.target.value])}>
        <option hidden>Seleccione un rol</option>
        {roles.map((x, i) => (
          <option key={i} value={i} onClick={() => setAdd(false)}>{x.title}</option>))}
        <option onClick={() => setAdd(true)}>Agregar</option>
      </Select>
      <form onSubmit={handleSubmit(onSubmit)}>
        {add ? <Input placeholder="Nombre del Rol" {...register("example")} /> : null}
        <FormControl>
          <CheckboxGroup defaultValue="Itachi" onChange={(val) => setValue("ete", val)}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6} padding="10">
              {PERMISOS.map(x => (
                <Checkbox
                  value={add ? x.value.toString() : undefined}
                  isDisabled={'Admin' === rol?.title || (!rol && !add)}
                  isChecked={rol?.permisos.includes(x.value)}>
                  {x.title}
                </Checkbox>))}
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