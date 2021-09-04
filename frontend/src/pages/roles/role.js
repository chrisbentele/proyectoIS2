import { useState } from "react";
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
  Flex,
} from "@chakra-ui/react";
import { PERMISOS, ROLES } from "./permisos";
import React from "react";
import { set, useForm } from "react-hook-form";

export const Role = () => {
  const [add, setAdd] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const permisos_rol = watch("permisos", []); // Cambia los permisos de acuerdo al rol y permisos seleccionados
  const nombre_rol = watch("nombre_rol", []);

  return (
    <Flex p="8" justifyContent="center">
      <Box w="90ch">
        <Select
          pb="4"
          onChange={(e) => {
            const rol = ROLES[e.target.value];
            setAdd(true);
            setValue("nombre_rol", rol?.title || "");
            setValue(
              "permisos",
              ROLES[e.target.value]?.permisos.map((x) => x.toString()) || [] // Mapea los permisos si es un rol predefinido
            );
          }}
        >
          <option hidden>Seleccione un rol</option>
          {ROLES.map((x, i) => (
            <option key={i} value={i}>
              {x.title}
            </option>
          ))}
          <option onClick={() => setAdd(true)}>Agregar</option>
        </Select>
        <Box hidden={!add}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              isDisabled={
                ROLES.filter((x) => x.title == nombre_rol).length != 0 // si el rol es uno pre definido
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
                        ROLES.filter((x) => x.title == nombre_rol).length != 0 // si el rol es uno pre definido
                      }
                    >
                      {x.title}
                    </Checkbox>
                  ))}
                </Grid>
              </CheckboxGroup>
            </FormControl>
            <Button
              hidden={ROLES.filter((x) => x.title == nombre_rol).length != 0} // si el rol es uno pre definido
              type="submit"
            >
              Agregar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Role;
