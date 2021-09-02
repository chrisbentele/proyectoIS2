import { axiosInstance } from ".";

//Projects
export const createProject = async (projectName, scrumMasterId) => {
  try {
    const res = await axiosInstance.post(projectName, scrumMasterId);
    return res.data;
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
export const getProjectById = async () => {
  try {
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
