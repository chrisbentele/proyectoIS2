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

export const getUserStoriesSprint = async (idProyecto, sprintId = null) => {
  if (sprintId == null) {
    return axiosInstance
      .get(`/proyectos/${idProyecto}/user_stories`)
      .then((uss) => uss.filter((us) => us.sprint == null));
  } else {
    return axiosInstance.get(
      `/proyectos/${idProyecto}/user_stories/${sprintId}`
    );
  }
};

export const editUS = async ({
  projectId,
  usName,
  description,
  estado,
  usId,
}) => {
  return await axiosInstance.put(
    `/proyectos/${projectId}/user_stories/${usId}`,
    {
      nombre: usName,
      contenido: description,
      estado,
    }
  );
};

//! Asigna una US a un Usuario
export const asignarUsAUsuario = ({ projectId, sprintId, usId, userId }) => {
  if (userId) {
    return axiosInstance.post(
      `/proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}/asignar/${userId}`
    );
  } else {
    return axiosInstance.delete(
      `/proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}/asignar`
    );
  }
};

//! Registra la estimacion de tiempo del usuario
export const estimarUs = ({ projectId, userId, usId, estimacion }) =>
  axiosInstance.post(`/proyectos/${projectId}/user_stories/${usId}/estimar`, {
    user_id: userId,
    estimacion,
  });

export const asignarUsASprint = ({ projectId, sprintId, usId }) =>
  axiosInstance.post(
    `/proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}`
  );

export const desasignarUsASprint = ({ projectId, sprintId, usId }) =>
  axiosInstance.delete(
    `/proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}`
  );

export const eliminarUS = async (projectId, us_id) =>
  await axiosInstance.delete(`/proyectos/${projectId}/user_stories/${us_id}`);

const userStories = {
  createUserStory,
  getUserStories,
  editUS,
  getUserStoriesSprint,
  asignarUsAUsuario,
  asignarUsASprint,
  desasignarUsASprint,
  eliminarUS,
  estimarUs,
};

export default userStories;
