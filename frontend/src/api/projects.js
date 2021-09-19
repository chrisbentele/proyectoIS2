import { api, axiosInstance } from ".";

//Projects
export const createProject = async (projectData) => {
  console.log(projectData);
  const { projectName, scrumMasterId, estimation } = projectData;
  console.log(`estimation: ${estimation}`);
  console.log(`scrum master id: ${scrumMasterId}`);
  console.log(`project name:${projectName}`);
  if (!estimation || !scrumMasterId || !projectName) {
    return new Error(
      "Para crear proyecto debes proveer la duracion estimada, miembros y nombre del proyecto"
    );
  }
  try {
    const res = await axiosInstance.post("proyectos", {
      duracionEstimada: estimation,
      miembros: [scrumMasterId],
      nombre: projectName,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getProjects = async (userId) => {
  try {
    if (userId) {
      const res = await axiosInstance.get(`usuarios/${userId}/proyectos`);
      return res.data;
    } else {
      const res = await axiosInstance.get("proyectos");
      return res.data;
    }
  } catch (error) {
    return error;
  }
};
export const editProject = async (projectId, projectConfig) => {
  try {
  } catch (error) {
    return error;
  }
};
export const getProjectById = async (projectId) => {
  try {
    const res = await axiosInstance.get(`proyectos/${projectId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const deleteProject = async () => {
  try {
  } catch (error) {
    return error;
  }
};
