import { axiosInstance } from ".";

export const createSprint = async (usData) => {
  const { projectId, creadoPor } = usData;
  return await axiosInstance.post(`/proyectos/${projectId}/sprints`, {
    creadoPor,
  });
};

export const getSprints = async (idProyecto) =>
  await axiosInstance.get(`/proyectos/${idProyecto}/sprints`);

export const editSprint = async ({ projectId, spId, activo }) =>
  await axiosInstance.put(`/proyectos/${projectId}/sprints/${spId}`, {
    activo,
  });

export const terminarSprint = async ({ projectId, spId }) =>
  await axiosInstance.put(`/proyectos/${projectId}/sprints/${spId}`, {
    activo: false,
    fechaFinalizacion: new Date().getDate().toString(),
  });

export const deleteSprint = async ({ projectId, spId }) =>
  await axiosInstance.delete(`/proyectos/${projectId}/sprints/${spId}`);

const sprints = {
  createSprint,
  getSprints,
  editSprint,
  terminarSprint,
  deleteSprint,
};
export default sprints;
