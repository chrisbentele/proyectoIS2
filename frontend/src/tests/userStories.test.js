//test de Endpoints de la API de US

const {createUserStory, editUS,eliminarUS,getUserStories} = require('../api/userStories')
const {getUser, deleteUser} = require('../api/users')
const {createProject, deleteProject} = require('../api/projects')

let projectId
let usId
beforeAll(async () => {
  await getUser('usTest', 'ustest@test.com', 'test uno').catch(err => console.log('error al crear usuario'))
  await getUser('usTest2', 'ustest2@test.com', 'test dos').catch(err => console.log('error al crear usuario'))
  const res = await createProject({projectName:'roleTest',estimation:"10", scrumMasterId:"usTest"}).catch(err => console.log('error al crear proyecto'))
  projectId = res.data.id
})

test('create user story', async () => {
  const usRes = await createUserStory({projectId, usName:'test us', description:'this is a test written in jest', creadoPor:'usTest'})
  usId = usRes.data.id
  const res = await getUserStories(projectId)
  expect(res.data).toEqual(expect.arrayContaining([expect.objectContaining({nombre:'test us', creadoPor:'usTest'})]))
});

test('edit user story', async () => {
  await editUS({projectId, usName:'editedUs', description:'edited desc', estado:1, usId })
  const res = await getUserStories(projectId)
  expect(res.data).toEqual(expect.arrayContaining([expect.objectContaining({nombre:'editedUs', creadoPor:'usTest'})]))
  expect(res.data).not.toEqual(expect.arrayContaining([expect.objectContaining({nombre:'test us'})]))
});

test('eliminar user story', async () => {
  await eliminarUS(projectId, usId)
  const res = await getUserStories(projectId)
  expect(res.data).not.toEqual(expect.arrayContaining([expect.objectContaining({nombre:'editedUs'})]))
});

afterAll(async () => {
  await deleteProject(projectId)
  deleteUser('member1')
  deleteUser('member2')
})