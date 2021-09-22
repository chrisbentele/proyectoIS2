//! Importar la instancia de axios
import { axiosInstance } from ".";

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
export const addRole = async (proyectoId, roleName, permissions) => {
  try {
    const res = await axiosInstance.post(`/proyectos/${proyectoId}/roles`, {
      nombre: roleName,
      permisos: permissions,
    });
    return res.status;
  } catch (error) {
    return error;
  }
};

/**
 * Eliminar role
 * @param proyectoId
 * @param roleId
 */
export const deleteRole = async (proyectoId, roleId) => {
  try {
    const res = await axiosInstance.delete(
      `/proyectos/${proyectoId}/roles/${roleId}`
    );
    return res.status;
  } catch (error) {
    return error;
  }
};

/**
 * Conseguir un rol
 * @param proyectoId
 * @param roleId
 */
export const getRole = async (proyectoId, roleId) => {
  try {
    const res = await axiosInstance.get(
      `/proyectos/${proyectoId}/roles/${roleId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

/**
 * Conseguir un roles
 * @param proyectoId
 */
export const getRoles = async (proyectoId) => {
  try {
    const res = await axiosInstance.get(
      `/proyectos/${proyectoId}/roles`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

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
  try {
    let req_data = {};
    if (role_name) req_data.nombre = role_name;
    if (permissions) req_data.permisos = permissions;
    const res = await axiosInstance.put(
      `/proyectos/${proyectoId}/roles/${roleId}`,
      req_data
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

/**
 * Asignar un rol
 * @param roleId
 * @param proyectoId
 * @param userId
 */
export const setUserRole = async (roleId, projectId, userId) => {
  try {
    const res = await axiosInstance.post(
      `proyectos/${projectId}/miembros/${userId}/roles/${roleId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

/**
 * Quitar un rol a un usuario
 * @param roleId
 * @param proyectoId
 * @param userId
 */
export const removeUserRole = async (roleId, projectId, userId) => {
  try {
    const res = await axiosInstance.delete(
      `proyectos/${projectId}/miembros/${userId}/roles/${roleId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
