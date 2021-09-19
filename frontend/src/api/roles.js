//importar la instancia de axios
import { axiosInstance } from ".";

//Endpoints de roles

//Agregar role
export const addRole = async (roleName, permissions) => {
  try {
    const res = await axiosInstance.post("/roles", { roleName, permissions });
    return res.status;
  } catch (error) {
    return error;
  }
};

//Eliminar rol
export const deleteRole = async (roleId) => {
  try {
    const res = await axiosInstance.delete(`/roles/${roleId}`);
    return res.status;
  } catch (error) {
    return error;
  }
};

//Editar rol
export const editRole = async (roleId, permissions) => {
  try {
    const res = await axiosInstance.put(`/roles/${roleId}`, { permissions });
    return res.data;
  } catch (error) {
    return error;
  }
};
