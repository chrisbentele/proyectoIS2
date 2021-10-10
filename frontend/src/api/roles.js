//! Importar la instancia de axios
import { axiosInstance }  from ".";

/**
 * @file roles.js
 * @brief Endpoints de roles
 */

/**
 * Agregar role
 * @param proyectoId
 * @param roleName
 * @param permissions
 */
export const addRole = async (proyectoId, roleName, permissions) =>
  await axiosInstance.post(`/proyectos/${proyectoId}/roles`, {
    nombre: roleName,
    permisos: permissions,
  });

/**
 * Eliminar role
 * @param proyectoId
 * @param roleId
 */
export const deleteRole = async (proyectoId, roleId) =>
  await axiosInstance.delete(`/proyectos/${proyectoId}/roles/${roleId}`);
/**
 * Conseguir un rol
 * @param proyectoId
 * @param roleId
 */
export const getRole = async (proyectoId, roleId) =>
  await axiosInstance.get(`/proyectos/${proyectoId}/roles/${roleId}`);

/**
 * Conseguir un roles
 * @param proyectoId
 */
export const getRoles = async (proyectoId) =>
  await axiosInstance.get(`/proyectos/${proyectoId}/roles`);

/**
 * Editar un rol
 * @param proyectoId
 * @param roleId
 * @param role_name
 * @param permissions
 */
export const editRole = async (
  proyectoId,
  roleId,
  role_name = null,
  permissions = null
) => {
  let req_data = {};
  if (role_name) req_data.nombre = role_name;
  if (permissions) req_data.permisos = permissions;
  return await axiosInstance.put(
    `/proyectos/${proyectoId}/roles/${roleId}`,
    req_data
  );
};
/**
 * Asignar un rol
 * @param roleId
 * @param proyectoId
 * @param userId
 */
export const setUserRole = async (roleId, projectId, userId) =>
  await axiosInstance.post(
    `proyectos/${projectId}/miembros/${userId}/roles/${roleId}`
  );

/**
 * Quitar un rol a un usuario
 * @param roleId
 * @param proyectoId
 * @param userId
 */
export const removeUserRole = async (roleId, projectId, userId) =>
  await axiosInstance.delete(
    `proyectos/${projectId}/miembros/${userId}/roles/${roleId}`
  );
