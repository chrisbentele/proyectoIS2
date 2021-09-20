import { axiosInstance } from ".";

export const createUserStory = async (
  idProyecto,
  usName,
  description,
  creadoPor
) => {
  try {
    const res = await axiosInstance.post(
      `/proyectos/${idProyecto}/user_stories`,
      {
        usName,
        description,
        creadoPor,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserStories = async (idProyecto) => {
  try {
    const res = await axiosInstance.get(
      `/proyectos/${idProyecto}/user_stories`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
