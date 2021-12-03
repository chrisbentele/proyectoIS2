//test de Endpoints de la API de sprints

const {
  createSprint,
  deleteSprint,
  editSprint,
  getSprints,
  terminarSprint,
  generarReporteSprintBacklog,
  generarReporteUSPrioridad,
} = require("../api/sprints");
const { getMembers, addMemberToProject } = require("../api/members");
const { getUser, deleteUser } = require("../api/users");
const { createProject, deleteProject } = require("../api/projects");

let projectId;
let sprintId;

beforeAll(async () => {
  await getUser("sprintTest", "sprintTest@test.com", "test uno").catch((err) =>
    console.log("error al crear usuario")
  );
  await getUser("sprintTest2", "sprintTest2@test.com", "test dos").catch(
    (err) => console.log("error al crear usuario")
  );
  const res = await createProject({
    projectName: "roleTest",
    estimation: "10",
    scrumMasterId: "sprintTest",
  }).catch((err) => console.log("error al crear proyecto"));
  projectId = res.data.id;
});

test("crear sprint", async () => {
  const res = await createSprint({
    projectId,
    creadoPor: "sprintTest",
    estimacion: 1,
    nombre: "sprint",
  });
  expect(res.data).toEqual(
    expect.objectContaining({
      activo: false,
      terminado: false,
      creadoPor: "sprintTest",
      estimacion: 1,
      nombre: "sprint",
    })
  );
  sprintId = res.data.id;
});

test("get sprints", async () => {
  const res = await getSprints(projectId);
  expect(res.data.length).toBe(1);
  expect(res.data).toEqual(
    expect.arrayContaining([expect.objectContaining({ id: sprintId })])
  );
});

test("edit sprint", async () => {
  await editSprint({ projectId, spId: sprintId, activo: true });
  const res = await getSprints(projectId);
  expect(res.data.length).toBe(1);
  expect(res.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: sprintId, activo: true, terminado: false }),
    ])
  );
});

test("Generar reporte Sprint Backlog", async () => {
  const res = await generarReporteSprintBacklog({ projectId, spId: sprintId });
  expect(res.statusText).toBe("OK");
  expect(res.headers["content-type"]).toBe("application/pdf");
});

test("Generar reporte US Prioridad", async () => {
  const res = await generarReporteUSPrioridad({ projectId, spId: sprintId });
  expect(res.statusText).toBe("OK");
  expect(res.headers["content-type"]).toBe("application/pdf");
});

// test('terminar sprint', async () => {
//   await terminarSprint({projectId, spId:sprintId}).catch(err => console.log(err))
//   const res = await getSprints(projectId)
//   expect(res.data.length).toBe(1)
//   expect(res.data).toEqual(expect.arrayContaining([expect.objectContaining({id:sprintId, terminado: true})]))
// });

afterAll(async () => {
  await deleteProject(projectId);
  deleteUser("sprintTest");
  deleteUser("sprintTest2");
});
