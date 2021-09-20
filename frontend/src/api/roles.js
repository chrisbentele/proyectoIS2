//importar la instancia de axios
import { axiosInstance } from ".";

//Endpoints de roles

//Agregar role
export const addRole = async (proyectoId, roleName, permissions) => {
  try {
    const res = await axiosInstance.post(`/proyectos/${proyectoId}/roles`, {
      roleName,
      permissions,
    });
    return res.status;
  } catch (error) {
    return error;
  }
};

//Eliminar rol
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

//trae el rol
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

//Editar rol
export const editRole = async (
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

export const asignarUserRole = async (roleId, projectId, userId) => {
  try {
    const res = await axiosInstance.post(
      `proyectos/${projectId}/miembros/${userId}/roles/${roleId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

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
