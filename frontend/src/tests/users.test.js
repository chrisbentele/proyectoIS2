//test de Endpoints de la API de los users

//TODO: faltan tests de searchUserByName

const { getUser, getUsers, deleteUser, setAdmin } = require("../api/users");

test("getUsers retorna array", async () => {
  const res = await getUsers();
  expect(Array.isArray(res.data)).toBe(true);
});
//asegurar que no existe el usuario para tests
deleteUser(999).catch((err) => {});

test("buscar usuario que no existe y lo crea", async () => {
  await getUser(999, "userTest@test.com", "test test");
  await setAdmin(999);
  const res = await getUser(999);

  const { email, nombre, id, proy_admin } = res;

  expect(email).toBe("userTest@test.com");
  expect(nombre).toBe("test test");
  expect(id).toBe("999");
  expect(proy_admin).toBe(true);
});

test("buscar usuario que ya existe", async () => {
  const res = await getUser(999);
  const { email, nombre, id, proy_admin } = res;
  expect(email).toBe("userTest@test.com");
  expect(nombre).toBe("test test");
  expect(id).toBe("999");
  expect(proy_admin).toBe(true);
});

test("usuario esta en array", async () => {
  const user = {
    id: "999",
    email: "userTest@test.com",
    nombre: "test test",
    proy_admin: true,
  };

  const res = await getUsers();
  expect(res.data).toEqual(expect.arrayContaining([user]));
});

test("eliminar usuario", async () => {
  const res = await deleteUser(999);
  expect(res.data).toBe(true);
});
test("usuario no esta en array", async () => {
  const user = { id: "999", email: "userTest@test.com", nombre: "test test" };
  const res = await getUsers();
  expect(res.data).not.toEqual(expect.arrayContaining([user]));
});
test("eliminar usuario que no existe", async () => {
  expect.assertions(1);
  await deleteUser(999).catch((err) => expect(err).toBeDefined());
});
