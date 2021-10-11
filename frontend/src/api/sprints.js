import { axiosInstance } from ".";

export const createSprint = ({ projectId, creadoPor, nombre, estimacion }) => {
  return axiosInstance.post(`/proyectos/${projectId}/sprints`, {
    creadoPor,
    estimacion,
    nombre,
  });
};

export const getSprints = async (idProyecto) =>
  await axiosInstance.get(`/proyectos/${idProyecto}/sprints`);

export const editSprint = async ({ projectId, spId, ...data }) =>
  await axiosInstance.put(`/proyectos/${projectId}/sprints/${spId}`, data);

export const activarSprint = async ({ projectId, spId }) =>
  await axiosInstance.post(`/proyectos/${projectId}/sprints/${spId}/activar`);

export const desactivarSprint = async ({ projectId, spId }) =>
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

export const getSprint = async (idProyecto, spId) =>
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
