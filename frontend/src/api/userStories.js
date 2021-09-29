import { axiosInstance } from ".";

export const createUserStory = async (usData) => {
  console.log(usData);
  const { projectId, usName, description, creadoPor } = usData;
  try {
    const res = await axiosInstance.post(
      `/proyectos/${projectId}/user_stories`,
      {
        nombre: usName,
        contenido: description,
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

export const cambiarEstadoUS = async (projectId, estado, us_id) => {
  try {
    const res = await axiosInstance.put(
      `/proyectos/${projectId}/user_stories/${us_id}`,
      {
        estado,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarUS = async (projectId, us_id) => {
  try {
    const res = await axiosInstance.delete(
      `/proyectos/${projectId}/user_stories/${us_id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
