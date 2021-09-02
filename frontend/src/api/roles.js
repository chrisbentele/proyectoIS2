import { axiosInstance } from ".";

//Roles Endpoints

export const addRole = async (roleName, permissions) => {
  try {
    const res = await axiosInstance.post("/roles", { roleName, permissions });
    return res.status;
  } catch (error) {
    return error.message;
  }
};

export const deleteRole = async (roleId) => {
  try {
    const res = await axiosInstance.delete(`/roles/${roleId}`);
    return res.status;
  } catch (error) {
    return error.message;
  }
};

export const editRole = async (roleId, permissions) => {
  try {
    const res = await axiosInstance.put(`/roles/${roleId}`, { permissions });
    return res.data;
  } catch (error) {
    return error.message;
  }
};
