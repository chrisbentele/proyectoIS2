//Import la instancia de axios
import { axiosInstance } from ".";

//Endpoints para los miembros
//Listar todos los miembros
export const getMembers = async (projectId) => {
  try {
    const res = await axiosInstance.get(`proyectos/${projectId}/miembros`);
    return res.data;
  } catch (error) {
    return error;
  }
};

//Editar los roles de un miembro
export const editMembersRole = async (memberId, roleId) => {
  try {
    const res = await axiosInstance.put(`/members/${memberId}`, { roleId });
    return res.data;
  } catch (error) {
    return new Error("Error cargando los miembros del proyecto");
  }
};

export const addMemberToProject = async (projectId, userId) => {
  try {
    const res = await axiosInstance.post(
      `/proyectos/${projectId}/miembros/${userId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const removeMemberFromProject = async (projectId, userId) => {
  try {
    const res = await axiosInstance.delete(
      `/proyectos/${projectId}/miembros/${userId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
