import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dev-bg7tosd2.us.auth0.com/api/v2",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjB6RFhsU2RGLXNCVklYbWpLTWtneiJ9.eyJpc3MiOiJodHRwczovL2Rldi1iZzd0b3NkMi51cy5hdXRoMC5jb20vIiwic3ViIjoicWIwUzd2cWZTTE4wUU1QTldoeU9VTncyTU00WHJLdE9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWJnN3Rvc2QyLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjMwMjcwNzM1LCJleHAiOjE2MzAzNTcxMzUsImF6cCI6InFiMFM3dnFmU0xOMFFNUE5XaHlPVU53Mk1NNFhyS3RPIiwic2NvcGUiOiJyZWFkOnVzZXJzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.UdhuIitdjCdel7plt1b4-lC5Iqgy_jj31uNvpH59AXCad4M0sQm86_uglbgl-1ggVLyVgUv5sW7F6Ffi632yqWt8Ar4DJK4gdPQTJA-WH4NGW0dLVEdV-DC22d-81LOaaqswUEH2CEG_5T0pg0mYYau8W9WreHd5QezBBJPzZoY4krFL3yTkUowhAAYw1qduRAbzqKIVwICaSw9E_vcx6AUto1mSNxEXUS7zqzBcqNnjfC3jZNJ1zmOkBU1kYjDbw42oGiXNc7KuXRazJ3xQaT0O9WXvvqtrCvQt95TPt-ax2n4g4psokkUoIua9xtu18MIaIbCjevm7lGAMVXxkFA",
  },
});

//Projects
export const createProject = async (projectName, scrumMasterId) => {
  try {
    const res = await axiosInstance.post(projectName, scrumMasterId);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const editProject = async (projectId, projectConfig) => {
  try {
  } catch (error) {
    return error.message;
  }
};
export const getProjectById = async () => {
  try {
  } catch (error) {
    return error.message;
  }
};
export const deleteProject = async () => {
  try {
  } catch (error) {
    return error.message;
  }
};

export const getMembers = async (skip, take) => {
  try {
    const res = await axiosInstance.get("/members");
    return res;
  } catch (error) {
    return error.message;
  }
};

export const editMembersRole = async (memberId, roleId) => {
  try {
    const res = await axiosInstance.put(`/members/${memberId}`, { roleId });
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const addMember = async (projectId, userId) => {
  try {
    const res = await axiosInstance.put(`/projects/${projectId}`, {
      newUser: userId,
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
};

//Roles
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
