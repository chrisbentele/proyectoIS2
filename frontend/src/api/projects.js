//! Importar la instancia de axios
import { axiosInstance } from ".";

/**
 * @file project.js
 * @brief Endpoints de Proyectos
 */

/**
 * Crear proyecto, recibe como parametro un objeto con los siguientes atributos \n
 * estimation: la estimacion de duracion del proyecto \n
 * scrumMasterId: en el backend seria un array, los miembros, pero el primer miembro tiene que ser el scrum master \n
 * projectName: nombre del proyecto
 * @param {*} projectData
 * @returns Resultado de la operación
 */
export const createProject = async (projectData) => {
  console.log(projectData);
  const { projectName, scrumMasterId, estimation } = projectData;
  console.log(`estimation: ${estimation}`);
  console.log(`scrum master id: ${scrumMasterId}`);
  console.log(`project name:${projectName}`);
  if (!estimation || !scrumMasterId || !projectName) {
    return new Error(
      "Para crear proyecto debes proveer la duracion estimada, miembros y nombre del proyecto"
    );
  }
  try {
    const res = await axiosInstance.post("proyectos", {
      duracionEstimada: estimation,
      miembros: [scrumMasterId],
      scrumMasterId: scrumMasterId,
      nombre: projectName,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

//Listar proyectos
//La funcion recibe opcionalmente un parametro userId
//Si no se provee el id de usuario la funcion solicita al servidor todos los proyectos
//Si se provee el id de usuario la funcion solicita todos los proyectos de un usuario en especifico

/**
 * Listar proyectos \n
 * Si no se provee el id de usuario la funcion solicita al servidor todos los proyectos. \n
 * Si se provee el id de usuario la funcion solicita todos los proyectos de un usuario en especifico. \n
 * @param {*} userId
 * @returns Resultado de la operación
 */
export const getProjects = async (userId) => {
  try {
    if (userId) {
      const res = await axiosInstance.get(`usuarios/${userId}/proyectos`);
      return res.data;
    } else {
      const res = await axiosInstance.get("proyectos");
      return res.data;
    }
  } catch (error) {
    return error;
  }
};

//! Editar proyeto
export const editProject = async (projectData) => {
  const { projectId, projectName, estimation } = projectData;
  const res = await axiosInstance.put(`proyectos/${projectId}`, {
    duracionEstimada: estimation,
    nombre: projectName,
  });
  return res;
};

/** Listar proyecto por id
 * La funcion recibe como parametro el id del proyecto y luego retorna la informacion del mismo
 * @param projectId
 */
export const getProjectById = async (projectId) => {
  try {
    const res = await axiosInstance.get(`proyectos/${projectId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

/** Eliminar proyecto
 * La funcion recibe como parametro el id del proyecto a eliminar, retorna true si se pudo eliminar el proyecto
 * @param projectId
 */
export const deleteProject = async (projectId) => {
  try {
    const res = await axiosInstance.delete(`proyectos/${projectId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
