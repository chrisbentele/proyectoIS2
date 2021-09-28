//Endpoints para crear User Stories
import { axiosInstance } from ".";

//La funcion para crear user stories
//Recibe id del proyecto, Nombre de la user storie, descripcion de la user story, y el id del creador de la user story
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

//Endpoint para eliminar una user story
//toma como parametros el id del proyecto y el id de la user story
export const deleteUserStory = async (idProyecto, idUserStory) => {
  try {
    const res = await axiosInstance.delete(
      `/proyectos/${idProyecto}/user_stories/${idUserStory}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
