/**
 * @file permisos.js
 * @brief Aquí se encuentran los templates para algunos roles ya predefinidos
 */
//! Lista de permisos generales
export const PERMISOS = [
  { title: "Crear proyecto", value: 0,  },
  { title: "Ver proyecto", value: 1 },
  { title: "Editar configuración del proyecto", value: 2 },
  { title: "Editar miembros a proyecto", value: 3 },
  { title: "Eliminar proyecto", value: 4 },
  { title: "Crear US", value: 5 },
  { title: "Modificar US", value: 6 },
  { title: "Eliminar US", value: 7 },
  { title: "Estimar US", value: 8 },
  { title: "Asignar miembros a US", value: 9 },
  { title: "Cambiar estado US", value: 10 },
  { title: "Crear rol", value: 11 },
  { title: "Editar parámetros del rol", value: 12 },
  { title: "Eliminar rol", value: 13 },
  { title: "Asignar rol", value: 14 },
  { title: "Agregar usuario", value: 15 },
  { title: "Editar rol del usuario", value: 16 },
  { title: "Eliminar usuario", value: 17 },
  { title: "Crear Sprint", value: 18 },
  { title: "Modificar Sprint", value: 19 },
  { title: "Eliminar Sprint", value: 20 },
  { title: "Estimar Sprint", value: 21 },
];

export const PERMISOS_MACRO = {
  CREAR_PROYECTO: 0,
  VER_PROYECTO: 1,
  EDITAR_CONFIGURACIÓN_DEL_PROYECTO: 2,
  EDITAR_MIEMBROS_A_PROYECTO: 3,
  ELIMINAR_PROYECTO: 4,
  CREAR_US: 5,
  MODIFICAR_US: 6,
  ELIMINAR_US: 7,
  ESTIMAR_US: 8,
  ASIGNAR_MIEMBROS_A_US: 9,
  CAMBIAR_ESTADO_US: 10,
  CREAR_ROL: 11,
  EDITAR_PARÁMETROS_DEL_ROL: 12,
  ELIMINAR_ROL: 13,
  ASIGNAR_ROL: 14,
  AGREGAR_USUARIO: 15,
  EDITAR_ROL_DEL_USUARIO: 16,
  ELIMINAR_USUARIO: 17,
  CREAR_SPRINT: 18,
  MODIFICAR_SPRINT: 19,
  ELIMINAR_SPRINT: 20,
  ESTIMAR_SPRINT: 21,
};

//! Lista de roles predefinidos
export const ROLES = [
  { title: "Admin", permisos: PERMISOS.map((x) => x.value) },
  { title: "Scrum Master", permisos: [1, 2] },
];
