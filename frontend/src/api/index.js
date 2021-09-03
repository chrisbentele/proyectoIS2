import axios from "axios";

import {
  createProject,
  deleteProject,
  getProjectById,
  editProject,
} from "./projects";
import { getUsers, deleteUser, searchUsersByName } from "./users";
import { addRole, editRole, deleteRole } from "./roles";
import {
  addMemberToProject,
  removeMemberFromProject,
  editMembersRole,
  getMembers,
} from "./members";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const api = {
  //Projects
  createProject,
  deleteProject,
  getProjectById,
  editProject,
  //Users
  getUsers,
  deleteUser,
  searchUsersByName,
  //Roles
  addRole,
  editRole,
  deleteRole,
  //Members
  addMemberToProject,
  removeMemberFromProject,
  editMembersRole,
  getMembers,
};
