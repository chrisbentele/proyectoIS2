//Endpoints para crear User Stories
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
    return res.data; //retorna al usuario la respuesta del servidor
  } catch (error) {
    console.log(error);
  }
};

//Endpoint para obtener todas las user stories de un proyecto
//recibe como parametro el id del proyeto
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

export const editUS = async (usData) => {
  console.log(usData);
  const { projectId, usName, description, estado, usId } = usData;
  try {
    const res = await axiosInstance.put(
      `/proyectos/${projectId}/user_stories/${usId}`,
      {
        nombre: usName,
        contenido: description,
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
