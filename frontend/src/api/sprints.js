import { axiosInstance } from ".";

const createSprint = async (usData) => {
  console.log(usData);
  const { projectId, creadoPor } = usData;
  try {
    const res = await axiosInstance.post(`/proyectos/${projectId}/sprints`, {
      creadoPor,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getSprints = async (idProyecto) => {
  try {
    const res = await axiosInstance.get(`/proyectos/${idProyecto}/sprints`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const editSprint = async ({ projectId, spId, activo }) => {
  try {
    const res = await axiosInstance.put(
      `/proyectos/${projectId}/sprints/${spId}`,
      {
        activo,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const terminarSprint = async ({ projectId, spId }) => {
  try {
    const res = await axiosInstance.put(
      `/proyectos/${projectId}/sprints/${spId}`,
      {
        activo: false,
        fechaFinalizacion: new Date().getDate().toString(),
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteSprint = async ({ projectId, spId }) => {
  try {
    const res = await axiosInstance.delete(
      `/proyectos/${projectId}/sprints/${spId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const sprints = {
  createSprint,
  getSprints,
  editSprint,
  terminarSprint,
  deleteSprint,
};
export default sprints;
