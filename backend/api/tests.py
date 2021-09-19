import json
from api.models import Proyecto, Usuario
from api.serializers import (
    ProyectoSerializer,
    RolSerializer,
    USSerializer,
    UsuarioSerializer,
)
from django.test import TestCase


def crear_proyecto(miembros=[]):
    proy_serializer = ProyectoSerializer(
        data={"duracionEstimada": 1, "miembros": miembros, "nombre": "test"}
    )
    if proy_serializer.is_valid():
        proyecto = proy_serializer.save()

    return proyecto


def crear_user():
    user_serializer = UsuarioSerializer(
        data={"nombre": "ete", "email": "ete@etemail.com"}
    )
    if user_serializer.is_valid():
        user = user_serializer.save()

    return user


def crear_rol(proyect_id):
    user_serializer = RolSerializer(
        data={"nombre": "ete", "proyecto": proyect_id, "permisos": [1, 2]}
    )
    if user_serializer.is_valid():
        user = user_serializer.save()

    return user


def crear_US(proyect_id, user_id):
    user_serializer = USSerializer(
        data={
            "proyecto": proyect_id,
            "nombre": "ete",
            "contenido": "si",
            "creadoPor": user_id,
        }
    )
    if user_serializer.is_valid():
        user = user_serializer.save()

    return user


class Proyectos_Tests(TestCase):
    def test_protectoindex(self):
        res = self.client.get("/api/proyectos")
        self.assertEqual(res.status_code, 200)

    def test_proyectos_create(self):

        res = self.client.post(
            f"/api/proyectos",
            json.dumps({"duracionEstimada": 1, "miembros": [], "nombre": "test"}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 201)

    def test_proyectos_get(self):

        r = crear_proyecto()
        res = self.client.get(f"/api/proyectos/{r.id}")
        self.assertEqual(res.status_code, 200)

    def test_proyectos_delete(self):

        r = crear_proyecto()

        res = self.client.delete(f"/api/proyectos/{r.id}")
        self.assertEqual(res.status_code, 204)

    def test_proyectos_update(self):

        r = crear_proyecto()

        res = self.client.put(
            f"/api/proyectos/{r.id}",
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

        res = self.client.get(f"/api/usuarios/{r.id}")
        self.assertEqual(res.status_code, 200)

    def test_usuarios_delete(self):

        r = crear_user()

        res = self.client.delete(f"/api/usuarios/{r.id}")
        self.assertEqual(res.status_code, 204)

    def test_usuarios_update(self):

        r = crear_user()

        res = self.client.put(
            f"/api/usuarios/{r.id}",
            json.dumps({"nombre": "testeado"}),
            content_type="application/json",
        )
        self.assertEqual(res.json()["nombre"], "testeado")

    def test_usuarios_proyectos(self):

        r = crear_user()
        # p = crear_proyecto([r.id])

        res = self.client.get(f"/api/usuarios/{r.id}/proyectos")

        self.assertEquals(res.status_code, 200)


class Proyectos_Miembros_Tests(TestCase):
    def test_proyectos_miembros_add(self):
        u = crear_user()
        p = crear_proyecto()
        res = self.client.post(
            f"/api/proyectos/{p.id}/miembros/{u.id}",
            # json.dumps({"nombre": "ete", "email": "ete@etemail.com"}),
            # content_type="application/json",
        )
        self.assertEqual(res.status_code, 201)

    def test_proyectos_miembros_get(self):

        p = crear_proyecto()

        res = self.client.get(f"/api/proyectos/{p.id}/miembros")
        self.assertEqual(res.status_code, 200)

    def test_proyectos_miembros_remove(self):

        u = crear_user()
        p = crear_proyecto([u.id])

        res = self.client.delete(f"/api/proyectos/{p.id}/miembros/{u.id}")

        self.assertEqual(res.status_code, 204)


class Roles_Tests(TestCase):
    def test_roles_crear(self):
        p = crear_proyecto()
        res = self.client.post(
            f"/api/proyectos/{p.id}/roles",
            json.dumps({"nombre": "ete", "permisos": []}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 201)

    def test_roles_get(self):

        p = crear_proyecto()
        r = crear_rol(p.id)

        res = self.client.get(f"/api/proyectos/{p.id}/roles/{r.id}")

        self.assertEqual(res.status_code, 200)

    def test_roles_delete(self):

        p = crear_proyecto()
        r = crear_rol(p.id)

        res = self.client.delete(f"/api/proyectos/{p.id}/roles/{r.id}")

        self.assertEqual(res.status_code, 204)

    def test_roles_update(self):

        p = crear_proyecto()
        r = crear_rol(p.id)
        res = self.client.put(
            f"/api/proyectos/{p.id}/roles/{r.id}",
            json.dumps({"nombre": "testeado"}),
            content_type="application/json",
        )
        self.assertEqual(res.json()["nombre"], "testeado")


class Proyectos_Usuarios_Roles_Tests(TestCase):
    def test_proyectos_miembros_roles_add(self):
        u = crear_user()
        p = crear_proyecto([u.id])
        r = crear_rol(p.id)

        res = self.client.post(
            f"/api/proyectos/{p.id}/miembros/{u.id}/roles/{r.id}",
        )
        self.assertEqual(res.status_code, 201)

    def test_proyectos_miembros_roles_get(self):

        u = crear_user()
        p = crear_proyecto([u.id])

        res = self.client.get(f"/api/proyectos/{p.id}/miembros/{u.id}")

        self.assertEqual(res.status_code, 200)

    def test_proyectos_miembros_roles_delete(self):

        u = crear_user()
        p = crear_proyecto([u.id])
        r = crear_rol(p.id)

        self.client.post(
            f"/api/proyectos/{p.id}/miembros/{u.id}/roles/{r.id}",
        )

        res = self.client.delete(f"/api/proyectos/{p.id}/miembros/{u.id}/roles/{r.id}")

        self.assertEqual(res.status_code, 204)


class user_stories(TestCase):
    def test_user_stories_crear(self):
        u = crear_user()
        p = crear_proyecto([u.id])

        res = self.client.post(
            f"/api/proyectos/{p.id}/user_stories",
            json.dumps({"nombre": "ete", "contenido": "si", "creadoPor": u.id}),
            content_type="application/json",
        )
        self.assertEqual(res.status_code, 201)

    def test_user_stories_get(self):

        u = crear_user()
        p = crear_proyecto([u.id])
        us = crear_US(p.id, u.id)

        res = self.client.get(f"/api/proyectos/{p.id}/user_stories/{us.id}")

        self.assertEqual(res.status_code, 200)

    def test_user_stories_delete(self):

        u = crear_user()
        p = crear_proyecto([u.id])
        us = crear_US(p.id, u.id)

        res = self.client.delete(f"/api/proyectos/{p.id}/user_stories/{us.id}")

        self.assertEqual(res.status_code, 204)

    def test_user_stories_update(self):

        u = crear_user()
        p = crear_proyecto([u.id])
        us = crear_US(p.id, u.id)

        res = self.client.put(
            f"/api/proyectos/{p.id}/user_stories/{us.id}",
            json.dumps({"nombre": "testeado"}),
            content_type="application/json",
        )
        self.assertEqual(res.json()["nombre"], "testeado")
