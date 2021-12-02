import { AiOutlineArrowRight } from "react-icons/ai";
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

export const getSprintMiembros = async ({ projectId, spId }) =>
  await axiosInstance.get(`/proyectos/${projectId}/sprints/${spId}/miembros`);

export const getHoras = async ({ projectId, spId }) =>
  await axiosInstance.get(`/proyectos/${projectId}/sprints/${spId}`);

export const terminarSprint = async ({ projectId, spId }) =>
  await axiosInstance.put(`/proyectos/${projectId}/sprints/${spId}`, {
    activo: false,
    fechaFinalizacion: new Date().getDate().toString(),
  });

export const deleteSprint = async ({ projectId, spId }) =>
  await axiosInstance.delete(`/proyectos/${projectId}/sprints/${spId}`);

export const getSprint = async (idProyecto, spId) =>
  await axiosInstance.get(`/proyectos/${idProyecto}/sprints/${spId}`);

export const getRegistrosHoras = async ({ projectId, spId }) =>
  await axiosInstance.get(
    `proyectos/${projectId}/sprints/${spId}/registro_horas`
  );

export const generarReporteSprintBacklog = async ({ projectId, spId }) =>
  await axiosInstance.get(
    `proyectos/${projectId}/sprints/${spId}/reporte_sprint_backlog`,
    { responseType: "blob" }
  );

export const generarReporteUSPrioridad = async ({ projectId, spId }) =>
  await axiosInstance.get(
    `proyectos/${projectId}/sprints/${spId}/reporte_US_prioridad`,
    { responseType: "blob" }
  );

const sprints = {
  createSprint,
  getSprints,
  editSprint,
  terminarSprint,
  deleteSprint,
  activarSprint,
  desactivarSprint,
  getSprintMiembros,
  getSprint,
  getHoras,
  getRegistrosHoras,
  generarReporteUSPrioridad,
  generarReporteSprintBacklog,
};
export default sprints;
