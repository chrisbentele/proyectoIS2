import { axiosInstance } from ".";

export const createUserStory = async (
  idProyecto,
  nombre,
  contenido,
  creadoPor
) => {
  try {
    const res = await axiosInstance.post(
      `/proyectos/${idProyecto}/user_stories`,
      {
        nombre,
        contenido,
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
