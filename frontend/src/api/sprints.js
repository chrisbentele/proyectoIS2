import { axiosInstance } from ".";

const createSprint = async (usData) => {
  const { projectId, creadoPor } = usData;
  return await axiosInstance.post(`/proyectos/${projectId}/sprints`, {
    creadoPor,
  });
};

const getSprints = async (idProyecto) =>
  await axiosInstance.get(`/proyectos/${idProyecto}/sprints`);

const editSprint = async ({ projectId, spId, activo }) =>
  await axiosInstance.put(`/proyectos/${projectId}/sprints/${spId}`, {
    activo,
  });

const terminarSprint = async ({ projectId, spId }) =>
  await axiosInstance.put(`/proyectos/${projectId}/sprints/${spId}`, {
    activo: false,
    fechaFinalizacion: new Date().getDate().toString(),
  });

const deleteSprint = async ({ projectId, spId }) =>
  await axiosInstance.delete(`/proyectos/${projectId}/sprints/${spId}`);

const sprints = {
  createSprint,
  getSprints,
  editSprint,
  terminarSprint,
  deleteSprint,
};
export default sprints;
