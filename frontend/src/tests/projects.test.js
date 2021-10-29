// tests de los Endpoints de los proyectos de la API
const { getUser, deleteUser } = require("../api/users");
const {
  createProject,
  deleteProject,
  editProject,
  getProjectById,
  getProjects,
} = require("../api/projects");
let projectId;
let createdProject;

beforeAll(async () => {
  const res = await getUser(998, "test@test.com", "project tests");
  const { email, nombre, id } = res;
  expect(email).toBe("test@test.com");
  expect(nombre).toBe("project tests");
  expect(id).toBe("998");
});

test("crear proyecto", async () => {
  const res = await createProject({
    projectName: "testProject2",
    estimation: "10",
    scrumMasterId: "998",
  });
  expect(Object.keys(res.data)).toEqual(
    expect.arrayContaining([
      "id",
      "duracionEstimada",
      "fechaInicio",
      "fechaFinalizacion",
      "estado",
      "miembros",
      "nombre",
    ])
  );
  expect(res.data.estado).toBe(0);
  projectId = res.data.id;
  createdProject = res.data;
});

test("proyecto agregado es retornado por getProjects", async () => {
  const res = await getProjects();
  expect(Array.isArray(res.data)).toBe(true);
  expect(res.data).toEqual(expect.arrayContaining([createdProject]));
});

test("editar proyecto", async () => {
  const res = await editProject({
    projectId: projectId,
    projectName: "newName",
    estimation: 14,
    status: 1,
  });
  const proyectoEditado = res.data;
  expect(proyectoEditado.estado).toBe(1);
  expect(proyectoEditado.nombre).toBe("newName");
  expect(proyectoEditado.duracionEstimada).toBe(14);
});
test("editar proyecto con valores erroneos", async () => {
  expect.assertions(2);
  await editProject({
    projectId: projectId,
    projectName: "newName",
    estimation: 14,
    status: 4,
  }).catch((err) => expect(err).toBeDefined());
  await editProject({
    projectId: projectId,
    projectName: "newName",
    estimation: -1,
    status: 4,
  }).catch((err) => expect(err).toBeDefined());
});

test("buscar proyecto por id", async () => {
  const res = await getProjectById(projectId);
  expect(res.data.id).toBe(projectId);
});

test("eliminar proyecto", async () => {
  const res = await deleteProject(projectId);
  expect(res.data).toBe(true);
});

afterAll(async () => {
  const res = await deleteUser(998);
  expect(res.data).toBe(true);
});
