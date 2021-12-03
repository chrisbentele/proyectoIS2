/**
 * @file permisos.js
 * @brief Aquí se encuentran los templates para algunos roles ya predefinidos
 */

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
  REPORTE_PRODUCT_BACKLOG: 22,
  REPORTE_SPRINT_BACKLOG: 23,
  REPORTE_US_PRIORIDAD: 24,
};

//! Lista de permisos generales
export const PERMISOS = [
  { title: "Crear proyecto", value: PERMISOS_MACRO.CREAR_PROYECTO },
  { title: "Ver proyecto", value: PERMISOS_MACRO.VER_PROYECTO },
  {
    title: "Editar configuración del proyecto",
    value: PERMISOS_MACRO.EDITAR_CONFIGURACIÓN_DEL_PROYECTO,
  },
  {
    title: "Editar miembros a proyecto",
    value: PERMISOS_MACRO.EDITAR_MIEMBROS_A_PROYECTO,
  },
  { title: "Eliminar proyecto", value: PERMISOS_MACRO.ELIMINAR_PROYECTO },
  { title: "Crear US", value: PERMISOS_MACRO.CREAR_US },
  { title: "Modificar US", value: PERMISOS_MACRO.MODIFICAR_US },
  { title: "Eliminar US", value: PERMISOS_MACRO.ELIMINAR_US },
  { title: "Estimar US", value: PERMISOS_MACRO.ESTIMAR_US },
  {
    title: "Asignar miembros a US",
    value: PERMISOS_MACRO.ASIGNAR_MIEMBROS_A_US,
  },
  { title: "Cambiar estado US", value: PERMISOS_MACRO.CAMBIAR_ESTADO_US },
  { title: "Crear rol", value: PERMISOS_MACRO.CREAR_ROL },
  {
    title: "Editar parámetros del rol",
    value: PERMISOS_MACRO.EDITAR_PARÁMETROS_DEL_ROL,
  },
  { title: "Eliminar rol", value: PERMISOS_MACRO.ELIMINAR_ROL },
  { title: "Asignar rol", value: PERMISOS_MACRO.ASIGNAR_ROL },
  { title: "Agregar usuario", value: PERMISOS_MACRO.AGREGAR_USUARIO },
  {
    title: "Editar rol del usuario",
    value: PERMISOS_MACRO.EDITAR_ROL_DEL_USUARIO,
  },
  { title: "Eliminar usuario", value: PERMISOS_MACRO.ELIMINAR_USUARIO },
  { title: "Crear Sprint", value: PERMISOS_MACRO.CREAR_SPRINT },
  { title: "Modificar Sprint", value: PERMISOS_MACRO.MODIFICAR_SPRINT },
  { title: "Eliminar Sprint", value: PERMISOS_MACRO.ELIMINAR_SPRINT },
  { title: "Estimar Sprint", value: PERMISOS_MACRO.ESTIMAR_SPRINT },
  {
    title: "Reporte product backlog",
    value: PERMISOS_MACRO.REPORTE_PRODUCT_BACKLOG,
  },
  {
    title: "Reporte sprint backlog",
    value: PERMISOS_MACRO.REPORTE_SPRINT_BACKLOG,
  },
  {
    title: "Reporte us - prioridad",
    value: PERMISOS_MACRO.REPORTE_US_PRIORIDAD,
  },
];

//! Lista de roles predefinidos
export const ROLES = [
  { title: "Admin", permisos: PERMISOS.map((x) => x.value) },
  { title: "Scrum Master", permisos: [1, 2] },
];
