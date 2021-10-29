var searchData=
[
  ['templates_281',['TEMPLATES',['../namespacecontroller_1_1settings.html#a049247735b924169691cb0e2e8af326f',1,'controller::settings']]],
  ['terminado_282',['terminado',['../classapi_1_1models_1_1Sprint.html#ad554343452c363f8aa4803472b99e065',1,'api::models::Sprint']]],
  ['terminarsprint_283',['terminarSprint',['../sprints_8js.html#a44a0a9c3d999cdd58f046cd150597e76',1,'sprints.js']]],
  ['test_284',['test',['../userStories_8test_8js.html#a7aa28142349c79e44dbc4315894be058',1,'test(&quot;create user story&quot;, async()=&gt; { const usRes=await createUserStory({ projectId, usName:&quot;test us&quot;, description:&quot;this is a test written in jest&quot;, creadoPor:&quot;usTest&quot;, });usId=usRes.data.id;const res=await getUserStories(projectId);expect(res.data).toEqual(expect.arrayContaining([expect.objectContaining({ nombre:&quot;test us&quot;, creadoPor:&quot;usTest&quot; }),]));}):&#160;userStories.test.js'],['../users_8test_8js.html#a827107515b4d56086bf18a4e9983a55e',1,'test(&quot;getUsers retorna array&quot;, async()=&gt; { const res=await getUsers();expect(Array.isArray(res.data)).toBe(true);}):&#160;users.test.js'],['../sprints_8test_8js.html#a4ed2f50b83fbbc61acabffe5b26602b7',1,'test(&quot;crear sprint&quot;, async()=&gt; { const res=await createSprint({ projectId, creadoPor:&quot;sprintTest&quot;, estimacion:1, nombre:&quot;sprint&quot;, });expect(res.data).toEqual(expect.objectContaining({ activo:false, terminado:false, creadoPor:&quot;sprintTest&quot;, estimacion:1, nombre:&quot;sprint&quot;, }));sprintId=res.data.id;}):&#160;sprints.test.js'],['../roles_8test_8js.html#a5515f4394540da087d91029e9ad8a77f',1,'test(&quot;tiene roles default&quot;, async()=&gt; { const res=await getRoles(projectId);expect(res.data).toEqual(expect.arrayContaining([expect.objectContaining({ nombre:&quot;Scrum Master&quot; }), expect.objectContaining({ nombre:&quot;Product Owner&quot; }), expect.objectContaining({ nombre:&quot;Developer&quot; }),]));}):&#160;roles.test.js'],['../projects_8test_8js.html#ac2a1c591995d4ecefa4ce56a941b6931',1,'test(&quot;crear proyecto&quot;, async()=&gt; { const res=await createProject({ projectName:&quot;testProject2&quot;, estimation:&quot;10&quot;, scrumMasterId:&quot;998&quot;, });expect(Object.keys(res.data)).toEqual(expect.arrayContaining([&quot;id&quot;, &quot;duracionEstimada&quot;, &quot;fechaInicio&quot;, &quot;fechaFinalizacion&quot;, &quot;estado&quot;, &quot;miembros&quot;, &quot;nombre&quot;,]));expect(res.data.estado).toBe(0);projectId=res.data.id;createdProject=res.data;}):&#160;projects.test.js'],['../members_8test_8js.html#ae10610eb3379c913da2fc073d963a2bb',1,'test(&quot;agregar miembro&quot;, async()=&gt; { await addMemberToProject(projectId, &quot;member2&quot;).catch((err)=&gt; console.log(&quot;error al agregar miembro&quot;, err));const res=await getProjectById(projectId);expect(res.data.miembros).toEqual(expect.arrayContaining([&quot;member2&quot;, &quot;member1&quot;]));}):&#160;members.test.js']]],
  ['test_5fasignar_5fuser_285',['test_asignar_user',['../classapi_1_1tests_1_1User__Stories__Asignar__Tests.html#aefa977ae8a8335bc11fecd2dc93e9dac',1,'api::tests::User_Stories_Asignar_Tests']]],
  ['test_5fasignar_5fuser_5fstories_5fa_5fsprint_286',['test_asignar_user_stories_a_sprint',['../classapi_1_1tests_1_1Sprints__User__Stories__Tests.html#a5fc35f0f8f210547541e2b09ff401782',1,'api::tests::Sprints_User_Stories_Tests']]],
  ['test_5fdesasignar_5fsprint_5fde_5fuser_5fstories_287',['test_desasignar_sprint_de_user_stories',['../classapi_1_1tests_1_1Sprints__User__Stories__Tests.html#aac207d8f5db974a9df1bcd85ceb6c8d5',1,'api::tests::Sprints_User_Stories_Tests']]],
  ['test_5fdesasignar_5fuser_288',['test_desasignar_user',['../classapi_1_1tests_1_1User__Stories__Asignar__Tests.html#abec3fc4f2e008f48de040170a8e9d6e7',1,'api::tests::User_Stories_Asignar_Tests']]],
  ['test_5festimar_5fuser_5fcombinado_289',['test_estimar_user_Combinado',['../classapi_1_1tests_1_1User__Stories__Estimar__Tests.html#a1e7bdb5948c2c25acb49d2f18b5d02ae',1,'api::tests::User_Stories_Estimar_Tests']]],
  ['test_5festimar_5fuser_5fdev_290',['test_estimar_user_Dev',['../classapi_1_1tests_1_1User__Stories__Estimar__Tests.html#a1850cac78efe8a68e599578264d1370f',1,'api::tests::User_Stories_Estimar_Tests']]],
  ['test_5festimar_5fuser_5fsm_291',['test_estimar_user_SM',['../classapi_1_1tests_1_1User__Stories__Estimar__Tests.html#ae478e17ac32047c7e2aa3812790775ce',1,'api::tests::User_Stories_Estimar_Tests']]],
  ['test_5fget_5fuser_5fstories_5fasignadas_292',['test_get_user_stories_asignadas',['../classapi_1_1tests_1_1Sprints__User__Stories__Tests.html#a824703e599054f2ffc8837d973e12e50',1,'api::tests::Sprints_User_Stories_Tests']]],
  ['test_5fprotectoindex_293',['test_protectoindex',['../classapi_1_1tests_1_1Proyectos__Tests.html#a2dbdd50ad14c44248e23780369687ec5',1,'api::tests::Proyectos_Tests']]],
  ['test_5fproyectos_5fcreate_294',['test_proyectos_create',['../classapi_1_1tests_1_1Proyectos__Tests.html#a2f72f178b3b34da7727e5d5754d2e904',1,'api::tests::Proyectos_Tests']]],
  ['test_5fproyectos_5fdelete_295',['test_proyectos_delete',['../classapi_1_1tests_1_1Proyectos__Tests.html#ae8cdb1facc58642110d141fe915bc71a',1,'api::tests::Proyectos_Tests']]],
  ['test_5fproyectos_5fget_296',['test_proyectos_get',['../classapi_1_1tests_1_1Proyectos__Tests.html#a720fd9be579eb084142409e6496c92f3',1,'api::tests::Proyectos_Tests']]],
  ['test_5fproyectos_5fmiembros_5fadd_297',['test_proyectos_miembros_add',['../classapi_1_1tests_1_1Proyectos__Miembros__Tests.html#a4567a6125f5e49997ee83818791502bf',1,'api::tests::Proyectos_Miembros_Tests']]],
  ['test_5fproyectos_5fmiembros_5fget_298',['test_proyectos_miembros_get',['../classapi_1_1tests_1_1Proyectos__Miembros__Tests.html#a97b6664f7d6a3bd9ed72ce36beb6a2dc',1,'api::tests::Proyectos_Miembros_Tests']]],
  ['test_5fproyectos_5fmiembros_5fremove_299',['test_proyectos_miembros_remove',['../classapi_1_1tests_1_1Proyectos__Miembros__Tests.html#ab6fe2e9c914bf2deb4c455a87ee4410f',1,'api::tests::Proyectos_Miembros_Tests']]],
  ['test_5fproyectos_5fmiembros_5froles_5fadd_300',['test_proyectos_miembros_roles_add',['../classapi_1_1tests_1_1Proyectos__Usuarios__Roles__Tests.html#a1747dbac1694650e0543a67c8979d9b4',1,'api::tests::Proyectos_Usuarios_Roles_Tests']]],
  ['test_5fproyectos_5fmiembros_5froles_5fdelete_301',['test_proyectos_miembros_roles_delete',['../classapi_1_1tests_1_1Proyectos__Usuarios__Roles__Tests.html#a89a2778ce5273074f5724f1a957e189f',1,'api::tests::Proyectos_Usuarios_Roles_Tests']]],
  ['test_5fproyectos_5fmiembros_5froles_5fget_302',['test_proyectos_miembros_roles_get',['../classapi_1_1tests_1_1Proyectos__Usuarios__Roles__Tests.html#a57b31e5eb470e2fdd3a3c89ad86e91c6',1,'api::tests::Proyectos_Usuarios_Roles_Tests']]],
  ['test_5fproyectos_5fupdate_303',['test_proyectos_update',['../classapi_1_1tests_1_1Proyectos__Tests.html#aedd8c910fd656e9dd2d26dd5531b3d5b',1,'api::tests::Proyectos_Tests']]],
  ['test_5fregistro_5fhoras_5fcreate_304',['test_registro_horas_create',['../classapi_1_1tests_1_1US__Registro__horas.html#ac47d598056830f7d98c9cae47b65ca07',1,'api::tests::US_Registro_horas']]],
  ['test_5fregistro_5fhoras_5fdelete_305',['test_registro_horas_delete',['../classapi_1_1tests_1_1US__Registro__horas.html#acbfeb26775a46ea9f3adc012d406ffd9',1,'api::tests::US_Registro_horas']]],
  ['test_5fregistro_5fhoras_5fupdate_306',['test_registro_horas_update',['../classapi_1_1tests_1_1US__Registro__horas.html#adf597c82a427e305920a1a9565a54b9e',1,'api::tests::US_Registro_horas']]],
  ['test_5fregistro_5fhoras_5fuser_5fstories_5fget_307',['test_registro_horas_user_stories_get',['../classapi_1_1tests_1_1US__Registro__horas.html#a80dd30b9d0c67e1157870118b563760d',1,'api::tests::US_Registro_horas']]],
  ['test_5fregistro_5fhoras_5fuser_5fstories_5funico_5fget_308',['test_registro_horas_user_stories_unico_get',['../classapi_1_1tests_1_1US__Registro__horas.html#a85ed204e2d8b469f04780c502141c613',1,'api::tests::US_Registro_horas']]],
  ['test_5froles_5fcrear_309',['test_roles_crear',['../classapi_1_1tests_1_1Roles__Tests.html#a0c734d219bd685cd190c2028547a953c',1,'api::tests::Roles_Tests']]],
  ['test_5froles_5fdelete_310',['test_roles_delete',['../classapi_1_1tests_1_1Roles__Tests.html#ab805c617fe56ce09736fbfc3f5f6fe86',1,'api::tests::Roles_Tests']]],
  ['test_5froles_5fget_311',['test_roles_get',['../classapi_1_1tests_1_1Roles__Tests.html#a9357d18a240f9001e8014e7267db82c8',1,'api::tests::Roles_Tests']]],
  ['test_5froles_5fupdate_312',['test_roles_update',['../classapi_1_1tests_1_1Roles__Tests.html#adaf81061de7374dad070f849050ecdbb',1,'api::tests::Roles_Tests']]],
  ['test_5fsprint_5factivar_313',['test_sprint_activar',['../classapi_1_1tests_1_1Sprint__Activar__Tests.html#a90c4fa4ba3a368f819e5c1ca02e4ff86',1,'api::tests::Sprint_Activar_Tests']]],
  ['test_5fsprint_5fdesactivar_314',['test_sprint_desactivar',['../classapi_1_1tests_1_1Sprint__Activar__Tests.html#a0f0732645e2f1eb5a70109222a4e80f2',1,'api::tests::Sprint_Activar_Tests']]],
  ['test_5fsprints_5fcrear_315',['test_sprints_crear',['../classapi_1_1tests_1_1Sprints__Tests.html#a0d01a7715f0fe272be1620fee944ec1f',1,'api::tests::Sprints_Tests']]],
  ['test_5fsprints_5fdelete_316',['test_sprints_delete',['../classapi_1_1tests_1_1Sprints__Tests.html#ae51f4258827cb1e04805e7aec122fb11',1,'api::tests::Sprints_Tests']]],
  ['test_5fsprints_5fget_317',['test_sprints_get',['../classapi_1_1tests_1_1Sprints__Tests.html#a9c281b1d9295fa5df2a1bd4897488b5d',1,'api::tests::Sprints_Tests']]],
  ['test_5fsprints_5fhoras_5fget_318',['test_sprints_horas_get',['../classapi_1_1tests_1_1US__Registro__horas.html#aa3bd47964e70c3e14c97032eb3e54cd9',1,'api::tests::US_Registro_horas']]],
  ['test_5fsprints_5fmiembros_319',['test_sprints_miembros',['../classapi_1_1tests_1_1Sprints__Tests.html#a00d52515c8870c9e51b69d5e711986a5',1,'api::tests::Sprints_Tests']]],
  ['test_5fsprints_5fupdate_320',['test_sprints_update',['../classapi_1_1tests_1_1Sprints__Tests.html#ad59451f8dc1cab0931101008b6066ee7',1,'api::tests::Sprints_Tests']]],
  ['test_5fsprints_5fuser_5fstories_321',['test_sprints_user_stories',['../classapi_1_1tests_1_1Sprints__Tests.html#a7058dc232f1fe74e719188518ff41856',1,'api::tests::Sprints_Tests']]],
  ['test_5fuser_5fstories_5fcrear_322',['test_user_stories_crear',['../classapi_1_1tests_1_1User__Stories__Tests.html#a51b5cce1d51cf349e2e745d423ad123e',1,'api::tests::User_Stories_Tests']]],
  ['test_5fuser_5fstories_5fdelete_323',['test_user_stories_delete',['../classapi_1_1tests_1_1User__Stories__Tests.html#a086ef3fb2d4495f0ce404bebc75a38c0',1,'api::tests::User_Stories_Tests']]],
  ['test_5fuser_5fstories_5fget_324',['test_user_stories_get',['../classapi_1_1tests_1_1User__Stories__Tests.html#ad11b2171f0b799912e08c86622609587',1,'api::tests::User_Stories_Tests']]],
  ['test_5fuser_5fstories_5fupdate_325',['test_user_stories_update',['../classapi_1_1tests_1_1User__Stories__Tests.html#a96e1dbc35b27a399f2d49c3a529a9f18',1,'api::tests::User_Stories_Tests']]],
  ['test_5fusuarios_5fcreate_326',['test_usuarios_create',['../classapi_1_1tests_1_1Usuarios__Tests.html#a9b3b16cfcbf8c26b28fe5b6324d866e8',1,'api::tests::Usuarios_Tests']]],
  ['test_5fusuarios_5fdelete_327',['test_usuarios_delete',['../classapi_1_1tests_1_1Usuarios__Tests.html#ab597ed30487cd7243b175a8c4fd87c44',1,'api::tests::Usuarios_Tests']]],
  ['test_5fusuarios_5fget_328',['test_usuarios_get',['../classapi_1_1tests_1_1Usuarios__Tests.html#a2009a3549c575287e5cc4a5b901a6aab',1,'api::tests::Usuarios_Tests']]],
  ['test_5fusuarios_5fproyectos_329',['test_usuarios_proyectos',['../classapi_1_1tests_1_1Usuarios__Tests.html#a6d4ebd911707c3e43ce465533034f5d9',1,'api::tests::Usuarios_Tests']]],
  ['test_5fusuarios_5fupdate_330',['test_usuarios_update',['../classapi_1_1tests_1_1Usuarios__Tests.html#a55d42b86d5e3d7b6f7e626837930f601',1,'api::tests::Usuarios_Tests']]],
  ['tests_2epy_331',['tests.py',['../tests_8py.html',1,'']]],
  ['theme_332',['theme',['../theme_8js.html#a3cce812bda99fdebd28c64386875c77b',1,'theme.js']]],
  ['theme_2ejs_333',['theme.js',['../theme_8js.html',1,'']]],
  ['tienepermiso_334',['tienePermiso',['../util_2index_8js.html#a1ceed7b5bda7fdaa4e563803c0fdd499',1,'index.js']]],
  ['time_5fzone_335',['TIME_ZONE',['../namespacecontroller_1_1settings.html#afe04221194632fc56a73f478e226ade5',1,'controller::settings']]]
];
