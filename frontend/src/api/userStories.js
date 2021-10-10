//Endpoints para crear User Stories
import { axiosInstance } from ".";

export const createUserStory = async (usData) => {
  const { projectId, usName, description, creadoPor } = usData;
  return await axiosInstance.post(`/proyectos/${projectId}/user_stories`, {
    nombre: usName,
    contenido: description,
    creadoPor,
  });
};

//Endpoint para obtener todas las user stories de un proyecto
//recibe como parametro el id del proyeto
export const getUserStories = async (idProyecto) =>
  await axiosInstance.get(`/proyectos/${idProyecto}/user_stories`);

export const editUS = async ({
  projectId,
  usName,
  description,
  estado,
  usId,
  estimacionSM,
  estimacionesDev,
}) => {
  return await axiosInstance.put(
    `/proyectos/${projectId}/user_stories/${usId}`,
    {
      nombre: usName,
      contenido: description,
      estado,
      estimacionSM,
      estimacionesDev,
    }
  );
};

export const asignarUsASprint = ({ projectId, sprintId }) =>
  axiosInstance.post(`/proyectos/${projectId}/sprints/${sprintId}/activar`);

export const desasignarUsASprint = ({ projectId, sprintId }) =>
  axiosInstance.post(`/proyectos/${projectId}/sprints/${sprintId}/desactivar`);

export const eliminarUS = async (projectId, us_id) =>
  await axiosInstance.delete(`/proyectos/${projectId}/user_stories/${us_id}`);
