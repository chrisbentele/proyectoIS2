//test de Endpoints de la API de US

const {
  createUserStory,
  editUS,
  eliminarUS,
  getUserStories,
} = require("../api/userStories");
const userStories = require("../api/userStories").default;
const sprints = require("../api/sprints").default;

const { getUser, deleteUser } = require("../api/users");
const { createProject, deleteProject } = require("../api/projects");

let projectId;
let usId;
beforeAll(async () => {
  await getUser("usTest", "ustest@test.com", "test uno").catch((err) =>
    console.log("error al crear usuario")
  );
  await getUser("usTest2", "ustest2@test.com", "test dos").catch((err) =>
    console.log("error al crear usuario")
  );
  const res = await createProject({
    projectName: "roleTest",
    estimation: "10",
    scrumMasterId: "usTest",
  }).catch((err) => console.log("error al crear proyecto"));
  projectId = res.data.id;
});

test("create user story", async () => {
  const usRes = await createUserStory({
    projectId,
    usName: "test us",
    description: "this is a test written in jest",
    creadoPor: "usTest",
  });
  usId = usRes.data.id;
  const res = await getUserStories(projectId);
  expect(res.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ nombre: "test us", creadoPor: "usTest" }),
    ])
  );
});

test("edit user story", async () => {
  await editUS({
    projectId,
    usName: "editedUs",
    description: "edited desc",
    estado: 1,
    usId,
  });
  const res = await getUserStories(projectId);
  expect(res.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ nombre: "editedUs", creadoPor: "usTest" }),
    ])
  );
  expect(res.data).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ nombre: "test us" })])
  );
});

test("registrar horas", async () => {
  const res_sprint = await sprints
    .createSprint({
      projectId,
      creadoPor: "usTest",
      estimacion: 2,
      nombre: "sprint",
    })
    .catch((e) => console.error(e));
  let sprintId = res_sprint.data["id"];
  const res_asignar_us_usuario = await userStories
    .asignarUsAUsuario({
      projectId,
      sprintId,
      usId,
      userId: "usTest",
    })
    .catch((e) => console.error(e));

  const res_asignar_us_sp = await userStories
    .asignarUsASprint({
      projectId,
      sprintId,
      usId,
    })
    .catch((e) => console.error(e));

  const res_reg = await userStories
    .registrarHoras({
      projectId,
      sprintId,
      usId,
      horas: 1,
    })
    .catch((e) => console.error(e));
  const res_registros = await userStories
    .getRegistrosHoras({
      projectId,
      sprintId,
      usId,
    })
    .catch((e) => console.error(e));

  // const res_g = await userStories.getRegistrosHoras({
  //   projectId,
  //   sprintId,
  //   usId,
  // });

  expect(res_registros.data[0]).toEqual(res_reg.data);
});

test("eliminar user story", async () => {
  await eliminarUS(projectId, usId);
  const res = await getUserStories(projectId);
  expect(res.data).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ nombre: "editedUs" })])
  );
});

afterAll(async () => {
  await deleteProject(projectId);
  deleteUser("member1");
  deleteUser("member2");
});
