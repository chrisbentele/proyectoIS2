import axios from "axios";

import {
  createProject,
  deleteProject,
  getProjectById,
  editProject,
  getProjects,
} from "./projects";
import { getUsers, deleteUser, searchUsersByName } from "./users";
import {
  addRole,
  editRole,
  getRole,
  getRoles,
  deleteRole,
  asignarUserRole,
  removeUserRole,
} from "./roles";
import {
  addMemberToProject,
  removeMemberFromProject,
  editMembersRole,
  getMembers,
} from "./members";
import {
  createUserStory,
  getUserStories,
  deleteUserStory,
} from "./userStories";

//Instancia de axios, para no tener que escribir en cada request el URL
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

//Exportar todas las apis, para solo tener que importar un objeto
export const api = {
  //Projects
  createProject,
  deleteProject,
  getProjectById,
  editProject,
  getProjects,
  //Users
  getUsers,
  deleteUser,
  searchUsersByName,
  //Roles
  addRole,
  editRole,
  getRole,
  getRoles,
  deleteRole,
  asignarUserRole,
  removeUserRole,
  //Members
  addMemberToProject,
  removeMemberFromProject,
  editMembersRole,
  getMembers,
  //User Stories
  createUserStory,
  getUserStories,
  deleteUserStory,
};
