//! Importar la instancia de axios
// import axios from 'axios'
// let axiosInstance
// if(process.env.NODE_ENV === 'test'){

//   axiosInstance = axios.create({
//     baseURL: "http://localhost:8000/api",
//   });
// } else {
// axiosInstance = require(".");
// }
import { axiosInstance } from '.';


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
  console.log('create pro')
  const { projectName, scrumMasterId, estimation } = projectData;
  if (!estimation || !scrumMasterId || !projectName) {
    console.log("error");
    return new Error(
      "Para crear proyecto debes proveer la duracion estimada, miembros y nombre del proyecto"
    );
  }
  console.log(scrumMasterId)
  return await axiosInstance.post("proyectos", {
    duracionEstimada: estimation,
    miembros: [scrumMasterId],
    scrumMasterId: scrumMasterId,
    nombre: projectName,
  });
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
  if (userId) {
    return await axiosInstance.get(`usuarios/${userId}/proyectos`);
  }
  return await axiosInstance.get("proyectos");
};
//! Editar proyeto

export const editProject = async (projectData) => {
  const { projectId, projectName, estimation, status } = projectData;
  const res = await axiosInstance.put(`proyectos/${projectId}`, {
    duracionEstimada: estimation,
    nombre: projectName,
    estado: status
  });
  return res;
};


/** Listar proyecto por id
 * La funcion recibe como parametro el id del proyecto y luego retorna la informacion del mismo
 * @param projectId
 */
export const getProjectById = async (projectId) =>
  await axiosInstance.get(`proyectos/${projectId}`);

/** Eliminar proyecto
 * La funcion recibe como parametro el id del proyecto a eliminar, retorna true si se pudo eliminar el proyecto
 * @param projectId
 */
export const deleteProject = async (projectId) =>
  await axiosInstance.delete(`proyectos/${projectId}`);
