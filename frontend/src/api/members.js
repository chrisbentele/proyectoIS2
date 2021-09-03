import { axiosInstance } from ".";

//Members endpoints

export const getMembers = async (skip, take) => {
  try {
    const res = await axiosInstance.get("/members");
    return res;
  } catch (error) {
    return error;
  }
};

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
    const res = await axiosInstance.put(`/projects/${projectId}`, {
      newUser: userId,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const removeMemberFromProject = async (projectId, userId) => {
  try {
    const res = await axiosInstance.delete(`/projects/${projectId}`, {
      userId,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
