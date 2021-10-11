//! Import la instancia de axios
import { axiosInstance }  from ".";

/**
 * @file members.js
 * @brief Endpoints para los miembros
 */

//!Listar todos los miembros
export const getMembers = async (projectId) =>
  await axiosInstance.get(`proyectos/${projectId}/miembros`);

//! Editar los roles de un miembro
export const editMembersRole = async (memberId, roleId) =>
  await axiosInstance.put(`/members/${memberId}`, { roleId });

//! Agregar los roles de un miembro
export const addMemberToProject = async (projectId, userId) =>
  await axiosInstance.post(`/proyectos/${projectId}/miembros/${userId}`);

//! Eliminar los roles de un miembro
export const removeMemberFromProject = async (projectId, userId) =>
  await axiosInstance.delete(`/proyectos/${projectId}/miembros/${userId}`);
