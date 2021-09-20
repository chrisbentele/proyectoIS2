//Importar la instancia de axios
import { axiosInstance } from ".";

//Endpoints de usuarios

//Listar todos los usuarios
export const getUsers = async () => {
  try {
    const res = await axiosInstance.get("/usuarios");
    return res.data;
  } catch (error) {
    return error;
  }
};

//Obtener usuario
//La funcion sirve para que al iniciar sesion con el SSO, se busque al usuario en la base de datos,
//si no se encuentra al mismo se lo agregara a la base de datos
//manda como parametro el email del usuario
export const getUser = async (id = null, email = null, nombre = null) => {
  try {
    console.log(email);
    let res;
    if (id) {
      res = await axiosInstance.get(`usuarios/${id}`).catch((e) => {
        console.log(e.response.status);
        if (e.response.status == 404) return false;
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
          console.log(e.response.status);
          if (e.response.status == 404) return false;
          else throw e;
        });
    }
    console.log(res);

    if (!res) {
      // Si no existe el usuario crear
      res = await axiosInstance.post("usuarios", {
        id,
        email,
        nombre,
      });
    }
    console.log(res);
    return res.data;
  } catch (error) {
    return error;
  }
};

//Eliminar usuario
//La funcion recibe como parametro el id del usuario a eliminar
export const deleteUser = async (userId) => {
  try {
    const res = await axiosInstance.delete(`/usuarios/${userId}`);
    return res.status(204);
  } catch (error) {
    return error;
  }
};

//Buscar a usuarios por nombre
//La funcion recibe como parametro un string, que seria el nombre del usuario, retorna los usuarios que contienen este string
export const searchUsersByName = async (string) => {
  try {
    const res = await axiosInstance.get(`/usuarios?searchTerm=string`);
    return res.data;
  } catch (error) {
    return error;
  }
};
