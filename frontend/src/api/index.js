/**
 * @file index.js
 * @brief Funciones de API para el frontend
 */

import axios from "axios";

import projects, {
  createProject,
  deleteProject,
  getProjectById,
  editProject,
  getProjects,
} from "./projects";
import users, {
  getUsers,
  getUser,
  deleteUser,
  searchUsersByName,
} from "./users";
import {
  addRole,
  editRole,
  getRole,
  getRoles,
  deleteRole,
  setUserRole,
  removeUserRole,
} from "./roles";
import {
  addMemberToProject,
  removeMemberFromProject,
  editMembersRole,
  getMembers,
  getMember,
} from "./members";
import userStories, {
  createUserStory,
  getUserStories,
  editUS,
  eliminarUS,
} from "./userStories";

import sprints from "./sprints";

//Instancia de axios, para no tener que escribir en cada request el URL
export const axiosInstance = axios.create({
  baseURL: "http://localhost/api",
});

//Exportar todas las apis, para solo tener que importar un objeto
export const api = {
  //Projects
  projects,
  createProject,
  deleteProject,
  getProjectById,
  editProject,
  getProjects,
  //Users
  users,
  getUser,
  getUsers,
  deleteUser,
  searchUsersByName,
  //Roles
  addRole,
  editRole,
  getRole,
  getRoles,
  deleteRole,
  setUserRole,
  removeUserRole,
  //Members
  addMemberToProject,
  removeMemberFromProject,
  editMembersRole,
  getMembers,
  getMember,
  //User Stories
  createUserStory,
  getUserStories,
  editUS,
  eliminarUS,
  userStories,
  //Sprints
  sprints,
};
