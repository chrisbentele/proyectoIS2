/**
 * @file index.js
 * @brief Funciones de API para el frontend
 */

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
import {
  createUserStory,
  getUserStories,
  editUS,
  eliminarUS,
} from "./userStories";

import sprints from "./sprints";

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
  //Sprints
  sprints,
};
