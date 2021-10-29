//test de Endpoints de la API de roles en los proyectos

import {
  addRole,
  deleteRole,
  editRole,
  getRole,
  getRoles,
  setUserRole,
} from "../api/roles";
const { getMembers, addMemberToProject } = require("../api/members");
const { getUser, deleteUser } = require("../api/users");
const { createProject, deleteProject } = require("../api/projects");

let projectId;
let roleId;

beforeAll(async () => {
  await getUser("test", "test1@test.com", "test uno").catch((err) =>
    console.log("error al crear usuario")
  );
  await getUser("test2", "test2@test.com", "test dos").catch((err) =>
    console.log("error al crear usuario")
  );
  const res = await createProject({
    projectName: "roleTest",
    estimation: "10",
    scrumMasterId: "test",
  }).catch((err) => console.log("error al crear proyecto"));
  projectId = res.data.id;
  await addMemberToProject(projectId, "test2");
});

test("tiene roles default", async () => {
  const res = await getRoles(projectId);
  expect(res.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ nombre: "Scrum Master" }),
      expect.objectContaining({ nombre: "Product Owner" }),
      expect.objectContaining({ nombre: "Developer" }),
    ])
  );
});

test("crear rol", async () => {
  const addRoleRes = await addRole(projectId, "testRole", [1, 2]);
  roleId = addRoleRes.data.id;
  const res = await getRoles(projectId);
  expect(res.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ nombre: "testRole", permisos: [1, 2] }),
    ])
  );
});

// test('crear rol con permisos que no existen', async () => {
//     expect.assertions(1)
//     await addRole(projectId,'testRole2',[1,2,53532]).catch(err => {
//         console.log(err)
//         expect(err).toBeDefined()})
// });

test("get role", async () => {
  const res = await getRole(projectId, roleId);
  expect(res.data).toEqual(expect.objectContaining({ nombre: "testRole" }));
});

test("edit role", async () => {
  await editRole(projectId, roleId, "newTestRole", [1, 2, 3, 4]);
  const res = await getRoles(projectId);
  expect(res.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        nombre: "newTestRole",
        permisos: [1, 2, 3, 4],
      }),
    ])
  );
  expect(res.data).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ nombre: "testRole" })])
  );
});

test("dar rol a miembro", async () => {
  await setUserRole(roleId, projectId, "test2");
  const res = await getMembers(projectId);
  expect(res.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: "test2",
        rol: expect.objectContaining({ nombre: "newTestRole" }),
      }),
    ])
  );
});

test("eliminar rol", async () => {
  let res = await deleteRole(projectId, roleId);
  expect(res.data).toBe(true);
  res = await getRoles(projectId);
  expect(res.data).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        nombre: "newTestRole",
        permisos: [1, 2, 3, 4],
      }),
    ])
  );
});

afterAll(async () => {
  await deleteProject(projectId);
  deleteUser("member1");
  deleteUser("member2");
});
