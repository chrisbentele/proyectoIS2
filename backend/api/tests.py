from datetime import datetime, timedelta

import json
import uuid
from api.serializers import (
    ProyectoSerializer,
    RegistroHorasSerializer,
    RolAsignadoSerializer,
    RolSerializer,
    USSerializer,
    UsuarioSerializer,
)
from django.test import TestCase

from api.models import US, RegistroHoras, RolAsignado

## @file tests.py
#


def crear_user():
    user_serializer = UsuarioSerializer(
        data={"nombre": "ete", "email": str(uuid.uuid4()) + "@etemail.com"}
    )
    if user_serializer.is_valid():
        user_serializer.save()
    return user_serializer.data


def crear_proyecto(self, miembros=None):
    if miembros == None:
        miembros = [str(crear_user()["id"])]
    res = self.client.post(
        f"/api/proyectos",
        json.dumps(
            {
                "duracionEstimada": 1,
                "miembros": miembros,
                "scrumMasterId": miembros[0],
                "nombre": "test",
            }
        ),
        content_type="application/json",
    )
    return res.json()


def crear_rol(proyect_id):
    seri = RolSerializer(
        data={"nombre": "ete", "proyecto": proyect_id, "permisos": [1, 2]}
    )
    if seri.is_valid():
        seri.save()

    return seri.data


def crear_US(proyect_id, user_id):
    seri = USSerializer(
        data={
            "proyecto": proyect_id,
            "nombre": "ete",
            "contenido": "si",
            "creadoPor": user_id,
        }
    )
    if seri.is_valid():
        seri.save()

    return seri.data


def crear_sprint(self, proyecto=None):
    if proyecto == None:
        proyecto = crear_proyecto(self)

    res = self.client.post(
        f"/api/proyectos/{proyecto['id']}/sprints",
        json.dumps({"creadoPor": str(proyecto["miembros"][0]), "nombre": "Sprint 1"}),
        content_type="application/json",
    )
    return res.json()


def asignar_us_sprint(self, proyect_id, sp_id, us_id):
    res = self.client.post(
        f"/api/proyectos/{proyect_id}/sprints/{sp_id}/user_stories/{us_id}"
    )

    return res.json()


def asignar_us_miembro(self, proyect_id, us_id, user_id):
    res = self.client.post(
        f"/api/proyectos/{proyect_id}/user_stories/{us_id}/asignar/{user_id}",
    )
    self.assertEqual(res.status_code, 201)

    return res.json()


def registro_horas(self, proyect_id, sprint_id, us_id, fecha=None):

    res = self.client.post(
        f"/api/proyectos/{proyect_id}/sprints/{sprint_id}/user_stories/{us_id}/registro_horas",
        json.dumps({"horas": 1, "fecha": fecha}),
        content_type="application/json",
    )
    self.assertEqual(res.status_code, 201)
    return res.json()


class Proyectos_Tests(TestCase):
    def test_protectoindex(self):
        res = self.client.get("/api/proyectos")
        self.assertEqual(res.status_code, 200)

    def test_proyectos_create(self):
        miembros = [str(crear_user()["id"])]
        res = self.client.post(
            f"/api/proyectos",
            json.dumps(
                {
                    "duracionEstimada": 1,
                    "miembros": miembros,
                    "scrumMasterId": miembros[0],
                    "nombre": "test",
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(res.status_code, 201)

    def test_proyectos_get(self):

        r = crear_proyecto(self)

        res = self.client.get(f"/api/proyectos/{r['id']}")
        self.assertEqual(res.status_code, 200)

    def test_proyectos_delete(self):

        r = crear_proyecto(self)

        res = self.client.delete(f"/api/proyectos/{r['id']}")
        self.assertEqual(res.status_code, 204)

    def test_proyectos_update(self):

        r = crear_proyecto(self)

        res = self.client.put(
            f"/api/proyectos/{r['id']}",
            json.dumps({"nombre": "testeado"}),
            content_type="application/json",
        )
        self.assertEqual(res.json()["nombre"], "testeado")


class Usuarios_Tests(TestCase):
    def test_usuarios_create(self):

        res = self.client.post(
            f"/api/usuarios",
            json.dumps({"nombre": "ete", "email": "ete@etemail.com"}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 201)

    def test_usuarios_get(self):

        r = crear_user()

        res = self.client.get(f"/api/usuarios/{r['id']}")
        self.assertEqual(res.status_code, 200)

    def test_usuarios_delete(self):

        r = crear_user()

        res = self.client.delete(f"/api/usuarios/{r['id']}")
        self.assertEqual(res.status_code, 204)

    def test_usuarios_update(self):

        r = crear_user()

        res = self.client.put(
            f"/api/usuarios/{r['id']}",
            json.dumps({"nombre": "testeado"}),
            content_type="application/json",
        )
        self.assertEqual(res.json()["nombre"], "testeado")

    def test_usuarios_proyectos(self):

        r = crear_user()
        # p = crear_proyecto([r['id']])

        res = self.client.get(f"/api/usuarios/{r['id']}/proyectos")

        self.assertEquals(res.status_code, 200)


class Proyectos_Miembros_Tests(TestCase):
    def test_proyectos_miembros_add(self):
        u = crear_user()
        p = crear_proyecto(self)
        res = self.client.post(
            f"/api/proyectos/{p['id']}/miembros/{u['id']}",
            # json.dumps({"nombre": "ete", "email": "ete@etemail.com"}),
            # content_type="application/json",
        )
        self.assertEqual(res.status_code, 201)

    def test_proyectos_miembros_get(self):

        p = crear_proyecto(self)

        res = self.client.get(f"/api/proyectos/{p['id']}/miembros")
        self.assertEqual(res.status_code, 200)

    def test_proyectos_miembros_remove(self):

        u = crear_user()
        p = crear_proyecto(self, [u["id"]])

        res = self.client.delete(f"/api/proyectos/{p['id']}/miembros/{u['id']}")

        self.assertEqual(res.status_code, 204)


class Roles_Tests(TestCase):
    def test_roles_crear(self):
        p = crear_proyecto(self)
        res = self.client.post(
            f"/api/proyectos/{p['id']}/roles",
            json.dumps({"nombre": "ete", "permisos": []}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 201)

    def test_roles_get(self):

        p = crear_proyecto(self)
        r = crear_rol(p["id"])

        res = self.client.get(f"/api/proyectos/{p['id']}/roles/{r['id']}")

        self.assertEqual(res.status_code, 200)

    def test_roles_delete(self):

        p = crear_proyecto(self)
        r = crear_rol(p["id"])

        res = self.client.delete(f"/api/proyectos/{p['id']}/roles/{r['id']}")

        self.assertEqual(res.status_code, 204)

    def test_roles_update(self):

        p = crear_proyecto(self)
        r = crear_rol(p["id"])
        res = self.client.put(
            f"/api/proyectos/{p['id']}/roles/{r['id']}",
            json.dumps({"nombre": "testeado"}),
            content_type="application/json",
        )
        self.assertEqual(res.json()["nombre"], "testeado")


class Proyectos_Usuarios_Roles_Tests(TestCase):
    def test_proyectos_miembros_roles_add(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        r = crear_rol(p["id"])

        res = self.client.post(
            f"/api/proyectos/{p['id']}/miembros/{u['id']}/roles/{r['id']}",
        )
        self.assertEqual(res.status_code, 201)

        ra = RolAsignado.objects.get(usuario=u["id"], rol=r["id"])
        self.assertEqual(res.json()["id"], ra.id)

    def test_proyectos_miembros_roles_get(self):

        u = crear_user()
        p = crear_proyecto(self, [u["id"]])

        res = self.client.get(f"/api/proyectos/{p['id']}/miembros/{u['id']}")

        self.assertEqual(res.status_code, 200)

    def test_proyectos_miembros_roles_delete(self):

        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        r = crear_rol(p["id"])

        self.client.post(
            f"/api/proyectos/{p['id']}/miembros/{u['id']}/roles/{r['id']}",
        )

        res = self.client.delete(
            f"/api/proyectos/{p['id']}/miembros/{u['id']}/roles/{r['id']}"
        )

        self.assertEqual(res.status_code, 204)


class User_Stories_Tests(TestCase):
    def test_user_stories_crear(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])

        res = self.client.post(
            f"/api/proyectos/{p['id']}/user_stories",
            json.dumps({"nombre": "ete", "contenido": "si", "creadoPor": str(u["id"])}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 201)

    def test_user_stories_get(self):

        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        us = crear_US(p["id"], u["id"])

        res = self.client.get(f"/api/proyectos/{p['id']}/user_stories/{us['id']}")

        self.assertEqual(res.status_code, 200)

    def test_user_stories_delete(self):

        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        us = crear_US(p["id"], u["id"])

        res = self.client.delete(f"/api/proyectos/{p['id']}/user_stories/{us['id']}")

        self.assertEqual(res.status_code, 204)

    def test_user_stories_update(self):

        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        us = crear_US(p["id"], u["id"])

        res = self.client.put(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}",
            json.dumps({"nombre": "testeado"}),
            content_type="application/json",
        )
        self.assertEqual(res.json()["nombre"], "testeado")


class Sprints_Tests(TestCase):
    def test_sprints_crear(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])

        res = self.client.post(
            f"/api/proyectos/{p['id']}/sprints",
            json.dumps({"creadoPor": str(u["id"]), "nombre": "Sprint 1"}),
            content_type="application/json",
        )

        self.assertEqual(res.status_code, 201)

    def test_sprints_get(self):

        sp = crear_sprint(self)

        res = self.client.get(f"/api/proyectos/{sp['proyecto']}/sprints/{sp['id']}")

        self.assertEqual(res.status_code, 200)

    def test_sprints_delete(self):

        sp = crear_sprint(self)

        res = self.client.delete(f"/api/proyectos/{sp['proyecto']}/sprints/{sp['id']}")

        self.assertEqual(res.status_code, 204)

    def test_sprints_update(self):

        sp = crear_sprint(self)
        now = datetime.date(datetime.now()).__str__()
        res = self.client.put(
            f"/api/proyectos/{sp['proyecto']}/sprints/{sp['id']}",
            json.dumps({"fechaFinalizacion": now}),
            content_type="application/json",
        )
        self.assertEqual(res.json()["fechaFinalizacion"], now)

    def test_sprints_user_stories(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        sp = crear_sprint(self, p)

        us = crear_US(p["id"], u["id"])

        res = asignar_us_sprint(self, p["id"], sp["id"], us["id"])
        self.assertEqual(sp["id"], res["sprint"])

        res = self.client.get(
            f"/api/proyectos/{p['id']}/sprints/{sp['id']}/user_stories"
        )
        newUs = res.json()[0]
        self.assertEqual(res.status_code, 200)
        self.assertJSONNotEqual(json.dumps(newUs), json.dumps(us))
        self.assertEqual(newUs["sprint"], sp["id"])
        return newUs, u

    def test_sprints_miembros(self):
        us, usuario = self.test_sprints_user_stories()
        asignar_us_miembro(self, us["proyecto"], us["id"], usuario["id"])
        res = self.client.get(
            f"/api/proyectos/{us['proyecto']}/sprints/{us['sprint']}/miembros"
        )
        self.assertJSONEqual(json.dumps(res.json()[0]), usuario)


class User_Stories_Estimar_Tests(TestCase):
    def test_estimar_user_SM(self):
        u = crear_user()
        u_dev = crear_user()

        p = crear_proyecto(self, [u["id"], u_dev["id"]])
        us = crear_US(p["id"], u["id"])
        res = self.client.post(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}/estimar",
            json.dumps({"user_id": u["id"], "estimacion": 1}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["estimacionSM"], 1)

    def test_estimar_user_Dev(self):
        u = crear_user()
        u_dev = crear_user()

        p = crear_proyecto(self, [u["id"], u_dev["id"]])
        us = crear_US(p["id"], u["id"])

        roles = self.client.get(f"/api/proyectos/{p['id']}/roles").json()
        dev_rol = [i for i in roles if i["nombre"] == "Developer"][0]
        self.client.post(
            f"/api/proyectos/{p['id']}/miembros/{u_dev['id']}/roles/{dev_rol['id']}",
        )

        res = self.client.post(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}/estimar",
            json.dumps({"user_id": u_dev["id"], "estimacion": 1}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["estimacionesDev"], 1)

    def test_estimar_user_Combinado(self):
        u = crear_user()
        u_dev = crear_user()

        p = crear_proyecto(self, [u["id"], u_dev["id"]])
        us = crear_US(p["id"], u["id"])
        res = self.client.post(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}/estimar",
            json.dumps({"user_id": u["id"], "estimacion": 1}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["estimacionSM"], 1)

        roles = self.client.get(f"/api/proyectos/{p['id']}/roles").json()
        dev_rol = [i for i in roles if i["nombre"] == "Developer"][0]
        self.client.post(
            f"/api/proyectos/{p['id']}/miembros/{u_dev['id']}/roles/{dev_rol['id']}",
        )

        res = self.client.post(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}/estimar",
            json.dumps({"user_id": u_dev["id"], "estimacion": 1}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["estimacionesDev"], 1)


class Sprint_Activar_Tests(TestCase):
    def test_sprint_activar(self):
        u = crear_user()
        u_dev = crear_user()
        p = crear_proyecto(self, [u["id"]])
        sp = crear_sprint(self, p)

        us = crear_US(p["id"], u["id"])

        # estima el Scrum master
        res = self.client.post(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}/estimar",
            json.dumps({"user_id": u["id"], "estimacion": 1}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 200)

        # Asignar user el rol dev
        roles = self.client.get(f"/api/proyectos/{p['id']}/roles").json()
        dev_rol = [i for i in roles if i["nombre"] == "Developer"][0]
        res = self.client.post(
            f"/api/proyectos/{p['id']}/miembros/{u_dev['id']}/roles/{dev_rol['id']}",
        )
        self.assertEqual(res.status_code, 201)

        # Estima el dev
        res = self.client.post(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}/estimar",
            json.dumps({"user_id": u_dev["id"], "estimacion": 1}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 200)

        asignar_us_sprint(self, p["id"], sp["id"], us["id"])

        us_data = USSerializer(US.objects.get(id=us["id"])).data

        self.assertEqual(us_data["estado"], 4)

        res = self.client.post(f"/api/proyectos/{p['id']}/sprints/{sp['id']}/activar")
        us_data = USSerializer(US.objects.get(id=us["id"])).data

        self.assertEqual(us_data["estado"], 0)
        self.assertEqual(res.status_code, 200)

    def test_sprint_desactivar(self):
        u = crear_user()
        u_dev = crear_user()
        p = crear_proyecto(self, [u["id"]])
        sp = crear_sprint(self, p)

        us = crear_US(p["id"], u["id"])

        # estima el Scrum master
        res = self.client.post(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}/estimar",
            json.dumps({"user_id": u["id"], "estimacion": 1}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 200)

        # Asignar user el rol dev
        roles = self.client.get(f"/api/proyectos/{p['id']}/roles").json()
        dev_rol = [i for i in roles if i["nombre"] == "Developer"][0]
        res = self.client.post(
            f"/api/proyectos/{p['id']}/miembros/{u_dev['id']}/roles/{dev_rol['id']}",
        )
        self.assertEqual(res.status_code, 201)

        # Estima el dev
        res = self.client.post(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}/estimar",
            json.dumps({"user_id": u_dev["id"], "estimacion": 1}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 200)

        asignar_us_sprint(self, p["id"], sp["id"], us["id"])

        res = self.client.post(f"/api/proyectos/{p['id']}/sprints/{sp['id']}/activar")

        us_data = USSerializer(US.objects.get(id=us["id"])).data

        self.assertEqual(us_data["estado"], 0)

        self.assertEqual(res.status_code, 200)
        res = self.client.post(
            f"/api/proyectos/{p['id']}/sprints/{sp['id']}/desactivar"
        )
        # Check actualiza US
        us_data = USSerializer(US.objects.get(id=us["id"])).data
        self.assertEqual(us_data["estado"], 4)
        self.assertEqual(res.status_code, 200)


class User_Stories_Asignar_Tests(TestCase):
    def test_asignar_user(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])

        us = crear_US(p["id"], u["id"])
        asignar_us_miembro(self, p["id"], us["id"], u["id"])
        res = self.client.get(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}",
        )
        self.assertEqual(res.json()["asignado"]["id"], u["id"])

    def test_desasignar_user(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])

        us = crear_US(p["id"], u["id"])

        # asignar us a user
        asignar_us_miembro(self, p["id"], us["id"], u["id"])

        # traer us p/ chequeo de cambios
        res = self.client.get(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}",
        )
        self.assertEqual(res.json()["asignado"]["id"], u["id"])

        res = self.client.delete(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}/asignar",
        )
        self.assertEqual(res.status_code, 204)

        # traer us p/ chequeo de cambios
        res = self.client.get(
            f"/api/proyectos/{p['id']}/user_stories/{us['id']}",
        )
        self.assertEqual(res.json()["asignado"], None)


class Sprints_User_Stories_Tests(TestCase):
    def test_asignar_user_stories_a_sprint(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        sp = crear_sprint(self, p)

        us = crear_US(p["id"], u["id"])

        res = self.client.post(
            f"/api/proyectos/{p['id']}/sprints/{sp['id']}/user_stories/{us['id']}"
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["sprint"], sp["id"])

    def test_get_user_stories_asignadas(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        sp = crear_sprint(self, p)

        us = crear_US(p["id"], u["id"])

        res = self.client.post(
            f"/api/proyectos/{p['id']}/sprints/{sp['id']}/user_stories/{us['id']}"
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["sprint"], sp["id"])

        res = self.client.get(
            f"/api/proyectos/{p['id']}/sprints/{sp['id']}/user_stories"
        )
        self.assertEqual(res.status_code, 200)

        self.assertEqual(res.json()[0]["sprint"], sp["id"])

    def test_desasignar_sprint_de_user_stories(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        sp = crear_sprint(self, p)

        us = crear_US(p["id"], u["id"])

        res = self.client.post(
            f"/api/proyectos/{p['id']}/sprints/{sp['id']}/user_stories/{us['id']}"
        )
        self.assertEqual(res.status_code, 200)

        self.assertEqual(res.json()["sprint"], sp["id"])

        res = self.client.delete(
            f"/api/proyectos/{p['id']}/sprints/{sp['id']}/user_stories/{us['id']}"
        )

        self.assertEqual(res.status_code, 204)


class US_Registro_horas(TestCase):
    def test_registro_horas_create(self):
        u = crear_user()
        p = crear_proyecto(self, [u["id"]])
        sp = crear_sprint(self, p)
        us = crear_US(p["id"], u["id"])

        # Asignar usuario a la US
        asignar_us_miembro(self, p["id"], us["id"], u["id"])

        # Asignar US al Sprint
        asignar_us_sprint(self, p["id"], sp["id"], us["id"])

        # Crear Registro de horas
        res = self.client.post(
            f"/api/proyectos/{p['id']}/sprints/{sp['id']}/user_stories/{us['id']}/registro_horas",
            json.dumps({"horas": 1}),
            content_type="application/json",
        )

        self.assertEqual(res.status_code, 201)

        # Comparar vs base de datos
        res_data = res.json()
        new_rh = RegistroHoras.objects.get(id=res_data["id"])
        self.assertJSONEqual(
            res.content, json.dumps(RegistroHorasSerializer(new_rh).data)
        )
        return res_data

    def test_registro_horas_user_stories_get(self):

        rg_data = self.test_registro_horas_create()

        res = self.client.get(
            f"/api/proyectos/{rg_data['proyecto']}/sprints/{rg_data['sprint']}/user_stories/{rg_data['us']}/registro_horas",
        )
        self.assertEqual(res.status_code, 200)

        # Comprar vs bd
        self.assertJSONEqual(json.dumps(res.json()[0]), json.dumps(rg_data))

    def test_registro_horas_user_stories_unico_get(self):
        rg_data = self.test_registro_horas_create()

        res = self.client.get(
            f"/api/proyectos/{rg_data['proyecto']}/sprints/{rg_data['sprint']}/user_stories/{rg_data['us']}/registro_horas",
            {"fecha": rg_data["fecha"]},
        )
        self.assertEqual(res.status_code, 200)

        # Comprar vs bd

        self.assertJSONEqual(res.content, json.dumps(rg_data))

    def test_sprints_horas_get(self):
        rg_data_1 = self.test_registro_horas_create()

        # Crear una segunda hora
        td = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        rg_data_2 = registro_horas(
            self,
            rg_data_1["proyecto"],
            rg_data_1["sprint"],
            rg_data_1["us"],
            td,
        )

        res = self.client.get(
            f"/api/proyectos/{rg_data_1['proyecto']}/sprints/{rg_data_1['sprint']}/registro_horas",
        )
        self.assertEqual(res.status_code, 200)

        res_data_1 = [r for r in res.json() if r["id"] == rg_data_1["id"]][0]
        res_data_2 = [r for r in res.json() if r["id"] == rg_data_2["id"]][0]

        self.assertJSONEqual(json.dumps(rg_data_1), res_data_1)
        self.assertJSONEqual(json.dumps(rg_data_2), res_data_2)

    def test_registro_horas_update(self):
        rg_data = self.test_registro_horas_create()

        res = self.client.put(
            f"/api/proyectos/{rg_data['proyecto']}/sprints/{rg_data['sprint']}/user_stories/{rg_data['us']}/registro_horas",
            json.dumps({"new_horas": 2, "fecha": rg_data["fecha"]}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 200)

        res_data = res.json()
        new_rh = RegistroHoras.objects.get(id=res_data["id"])
        self.assertJSONEqual(
            res.content, json.dumps(RegistroHorasSerializer(new_rh).data)
        )

    def test_registro_horas_delete(self):
        rg_data = self.test_registro_horas_create()

        res = self.client.delete(
            f"/api/proyectos/{rg_data['proyecto']}/sprints/{rg_data['sprint']}/user_stories/{rg_data['us']}/registro_horas",
            json.dumps({"fecha": rg_data["fecha"]}),
            content_type="application/json",
        )

        self.assertEqual(res.status_code, 204)

        res = self.client.get(
            f"/api/proyectos/{rg_data['proyecto']}/sprints/{rg_data['sprint']}/user_stories/{rg_data['us']}/registro_horas",
            {"fecha": rg_data["fecha"]},
        )

        self.assertEqual(res.status_code, 404)
