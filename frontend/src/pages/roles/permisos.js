/**
 * @file permisos.js
 * @brief Aquí se encuentran los templates para algunos roles ya predefinidos
 */
//! Lista de permisos generales
export const PERMISOS = [
  { title: "Crear proyecto", value: 0 },
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
  { value: 18, title: "Crear Sprint" },
  { value: 19, title: "Modificar Sprint" },
  { value: 20, title: "Eliminar Sprint" },
  { value: 21, title: "Estimar Sprint" },
];

//! Lista de roles predefinidos
export const ROLES = [
  { title: "Admin", permisos: PERMISOS.map((x) => x.value) },
  { title: "Scrum Master", permisos: [1, 2] },
];
