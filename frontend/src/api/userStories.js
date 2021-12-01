//Endpoints para crear User Stories
import { axiosInstance } from ".";

export const createUserStory = async (usData) => {
  const { projectId, usName, description, creadoPor, prioridad } = usData;
  return await axiosInstance.post(`/proyectos/${projectId}/user_stories`, {
    nombre: usName,
    contenido: description,
    creadoPor,
    prioridad,
  });
};

//! Obtiene US de un sprint o proyecto
export const getUserStories = async (idProyecto, sprintId = null) => {
  if (sprintId == null) {
    return axiosInstance
      .get(`/proyectos/${idProyecto}/user_stories`)
      .then((res) => {
        let data = res.data?.filter((us) => us.sprint == null);
        console.log(data);
        res.data = data;
        console.log(res);
        return res;
      });
  } else {
    return axiosInstance.get(
      `/proyectos/${idProyecto}/sprints/${sprintId}/user_stories`
    );
  }
};

//! Edita info de una US

export const editUS = async ({
  projectId,
  usName,
  description,
  estado,
  usId,
  prioridad,
}) => {
  return await axiosInstance.put(
    `/proyectos/${projectId}/user_stories/${usId}`,
    {
      nombre: usName,
      contenido: description,
      estado,
      prioridad,
    }
  );
};

//! Asigna una US a un Usuario
export const asignarUsAUsuario = ({ projectId, sprintId, usId, userId }) => {
  if (userId) {
    return axiosInstance.post(
      `/proyectos/${projectId}/user_stories/${usId}/asignar/${userId}`
    );
  } else {
    return axiosInstance.delete(
      `/proyectos/${projectId}/user_stories/${usId}/asignar`
    );
  }
};

export const getUsuariosAsignados = ({ projectId, usId }) => {
  if (true) {
    return axiosInstance.get(
      `/proyectos/${projectId}/user_stories/${usId}/asignados`
    );
  } else {
    return null;
  }
};

//! Registra la estimacion de tiempo del usuario
export const estimarUs = ({ projectId, userId, usId, estimacion }) =>
  axiosInstance.post(`/proyectos/${projectId}/user_stories/${usId}/estimar`, {
    user_id: userId,
    estimacion,
  });

//! Asigna US a sprint
export const asignarUsASprint = ({ projectId, sprintId, usId }) =>
  axiosInstance.post(
    `/proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}`
  );

//! Desasigna US de sprint
export const desasignarUsASprint = ({ projectId, sprintId, usId }) =>
  axiosInstance.delete(
    `/proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}`
  );

//! Elimina US
export const eliminarUS = async (projectId, us_id) =>
  await axiosInstance.delete(`/proyectos/${projectId}/user_stories/${us_id}`);

export const registrarHoras = ({ projectId, sprintId, usId, horas, fecha, mensaje }) =>
  axiosInstance.post(
    `proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}/registro_horas`,
    { horas, fecha, mensaje }
  );

export const editRegistrosHoras = ({
  projectId,
  sprintId,
  usId,
  horas,
  fecha,
  mensaje
}) =>
  axiosInstance.put(
    `proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}/registro_horas`,
    { new_horas: horas, fecha, mensaje }
  );

export const deleteRegistrosHoras = ({ projectId, sprintId, usId, fecha }) =>
  axiosInstance.delete(
    `proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}/registro_horas`,
    { params: { fecha } }
  );

export const getRegistrosHoras = ({ projectId, sprintId, usId, fecha }) =>
  axiosInstance.get(
    `proyectos/${projectId}/sprints/${sprintId}/user_stories/${usId}/registro_horas`,
    { params: { fecha } }
  );

const userStories = {
  createUserStory,
  editUS,
  getUserStories,
  asignarUsAUsuario,
  asignarUsASprint,
  desasignarUsASprint,
  eliminarUS,
  estimarUs,
  getUsuariosAsignados,
  registrarHoras,
  getRegistrosHoras,
  editRegistrosHoras,
  deleteRegistrosHoras,
};

export default userStories;
