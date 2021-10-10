import { axiosInstance } from ".";


const createSprint = ({ projectId, creadoPor, nombre, estimacion }) => {
  return axiosInstance.post(`/proyectos/${projectId}/sprints`, {
    creadoPor,
    estimacion,
    nombre,
  });
};

export const getSprints = async (idProyecto) =>
  await axiosInstance.get(`/proyectos/${idProyecto}/sprints`);

const editSprint = async ({ projectId, spId, ...data }) =>
  await axiosInstance.put(`/proyectos/${projectId}/sprints/${spId}`, data);

const activarSprint = async ({ projectId, spId }) =>
  await axiosInstance.post(`/proyectos/${projectId}/sprints/${spId}/activar`);

const desactivarSprint = async ({ projectId, spId }) =>
  await axiosInstance.post(
    `/proyectos/${projectId}/sprints/${spId}/desactivar`
  );

export const terminarSprint = async ({ projectId, spId }) =>
  await axiosInstance.put(`/proyectos/${projectId}/sprints/${spId}`, {
    activo: false,
    fechaFinalizacion: new Date().getDate().toString(),
  });

export const deleteSprint = async ({ projectId, spId }) =>
  await axiosInstance.delete(`/proyectos/${projectId}/sprints/${spId}`);

const getSprint = async (idProyecto, spId) =>
  await axiosInstance.get(`/proyectos/${idProyecto}/sprints/${spId}`);

const sprints = {
  createSprint,
  getSprints,
  editSprint,
  terminarSprint,
  deleteSprint,
  activarSprint,
  desactivarSprint,
  getSprint,
};
export default sprints;
