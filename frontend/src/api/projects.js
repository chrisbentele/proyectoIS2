//Importar la instancia de axios
import { axiosInstance } from ".";

//Endpoints de Proyectos

//Crear proyecto, recibe como parametro un objeto con los siguientes atributos
//estimation: la estimacion de duracion del proyecto
//scrumMasterId: en el backend seria un array, los miembros, pero el primer miembro tiene que ser el scrum master
//projectName: nombre del proyecto
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

//Editar proyeto
export const editProject = async (projectId, projectConfig) => {
  try {
  } catch (error) {
    return error;
  }
};

//Listar proyecto por id
//La funcion recibe como parametro el id del proyecto y luego retorna la informacion del mismo
export const getProjectById = async (projectId) => {
  try {
    const res = await axiosInstance.get(`proyectos/${projectId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

//Eliminar proyecto
//La funcion recibe como parametro el id del proyecto a eliminar, retorna true si se pudo eliminar el proyecto
export const deleteProject = async (projectId) => {
  try {
    const res = await axiosInstance.delete(`proyectos/${projectId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
