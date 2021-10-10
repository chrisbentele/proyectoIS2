//test de Endpoints de la API de miembros de los proyectos

const { getMembers, addMemberToProject, removeMemberFromProject} = require('../api/members')
const {getUser, deleteUser} = require('../api/users')
const {createProject, deleteProject, getProjectById} = require('../api/projects')

let projectId

beforeAll(async () => {
    await getUser('member1', 'member1@test.com', 'test uno').catch(err => console.log('error al crear usuario'))
    await getUser('member2', 'member2@test.com', 'test dos').catch(err => console.log('error al crear usuario'))
    const res = await createProject({projectName:'membersTestProject',estimation:"10", scrumMasterId:"member1"}).catch(err => console.log('error al crear proyecto'))
    projectId = res.data.id
})

test('agregar miembro', async () => {
    await addMemberToProject(projectId, 'member2').catch(err => console.log('error al agregar miembro', err))
    const res = await getProjectById(projectId)
    console.log(res.data.miembros)
    expect(res.data.miembros).toEqual(expect.arrayContaining(['member2','member1']))
});
test('buscar miembros', async () => {
    const res = await getMembers(projectId)
    expect(res.data).toEqual(expect.arrayContaining([expect.objectContaining({id:'member1'}),expect.objectContaining({id:'member2'})]))
});
test('quitar miembros de proyecto', async () => {
    await removeMemberFromProject(projectId, 'member2')
    const res = await getMembers(projectId)
    expect(res.data).toEqual(expect.arrayContaining([expect.objectContaining({id:'member1'})]))
    expect(res.data).not.toEqual(expect.arrayContaining([expect.objectContaining({id:'member2'})]))
});


afterAll(async () => {
    await deleteProject(projectId)
    deleteUser('member1')
    deleteUser('member2')
})