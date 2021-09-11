import { axiosInstance } from ".";

//Users Endpoints

export const getUsers = async () => {
  try {
    const res = await axiosInstance.get("/usuario?get_all=true");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getUser = async (email, nombre) => {
  try {
    console.log(email);
    let res = await axiosInstance
      .get("usuario", {
        params: {
          email,
        },
      })
      .catch((e) => {
        console.log(e.response.status);
        if (e.response.status == 404) return false;
        else throw e;
      });
    console.log(res);

    if (!res) {
      // Si no existe el usuario crear
      res = await axiosInstance.post("usuario", {
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

export const deleteUser = async (userId) => {
  try {
    const res = await axiosInstance.delete(`/users/${userId}`);
    return res.status(204);
  } catch (error) {
    return error;
  }
};

export const searchUsersByName = async (string) => {
  try {
    const res = await axiosInstance.get(`/users?searchTerm=string`);
    return res.data;
  } catch (error) {
    return error;
  }
};
