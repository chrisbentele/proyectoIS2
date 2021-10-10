//! Importar la instancia de axios
import { axiosInstance } from ".";

/**
 * @file users.js
 * @brief Endpoints de usuarios
 */

//! Listar todos los usuarios
export const getUsers = async () => await axiosInstance.get("/usuarios");

/**
 * Obtener usuario \n
 * La funcion sirve para que al iniciar sesion con el SSO, se busque al usuario en la base de datos,si no se encuentra al mismo se lo agregara a la base de datos manda como parametro el email del usuario
 * @param id
 * @param email
 * @param nombre
 * @returns Resultado de la operación
 */
export const getUser = async (id = null, email = null, nombre = null) => {
  try {
    let res;
    if (id) {
      res = await axiosInstance.get(`usuarios/${id}`).catch((e) => {
        console.log(e.response.status);
        if (e.response.status === 404) return false;
        else throw e;
      });
    } else if (email) {
      res = await axiosInstance
        .get("usuarios", {
          params: {
            email,
          },
        })
        .catch((e) => {
          if (e.response.status === 404) return false;
          else throw e;
        });
    }

    if (!res) {
      // Si no existe el usuario crear
      res = await axiosInstance.post("usuarios", {
        id,
        email,
        nombre,
      });
    }
    return res.data;
  } catch (error) {
    return error;
  }
};

/**
 * Eliminar usuario \n
 * La funcion recibe como parametro el id del usuario a eliminar
 * @param userId
 * @returns Resultado de la operación
 */
export const deleteUser = async (userId) =>
  await axiosInstance.delete(`/usuarios/${userId}`);

/**
 * Buscar a usuarios por nombre \n
 * La funcion recibe como parametro un string, que seria el nombre del usuario, retorna los usuarios que contienen este string
 * @param string
 * @returns Resultado de la operación
 */
export const searchUsersByName = async (string) =>
  await axiosInstance.get(`/usuarios?searchTerm=string`);

