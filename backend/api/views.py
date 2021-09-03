from django.core.exceptions import BadRequest
from rest_framework import serializers, exceptions
import rest_framework
from .serializers import (
    PermisoAsignadoSerializer,
    ProyectoSerializer,
    RolAsignadoSerializer,
    RolSerializer,
    UsuarioSerializer,
)
import json
from api.models import PermisoAsignado, Proyecto, Rol, RolAsignado, Usuario
from django.http.response import (
    HttpResponseBadRequest,
    HttpResponseNotFound,
    HttpResponseNotModified,
    HttpResponseServerError,
    JsonResponse,
)
from rest_framework.parsers import JSONParser

# Create your views here.
def proyecto(request, id=None):
    if request.method == "POST":
        # Crea el proyecto
        data = JSONParser().parse(request)
        serializer = ProyectoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)

    elif request.method == "GET":

        data = JSONParser().parse(request)
        if data.get("email") == None:
            return HttpResponseBadRequest("Falta el mail en el body")
        try:
            u = Usuario.objects.get(email=data["email"])
            serializer = UsuarioSerializer(u)
            return JsonResponse(serializer.data, safe=False)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()


def usuario(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)

    elif request.method == "GET":

        data = JSONParser().parse(request)
        if data.get("email") == None:
            return HttpResponseBadRequest("Falta el mail en el body")
        try:
            u = Usuario.objects.get(email=data["email"])
            serializer = UsuarioSerializer(u)
            return JsonResponse(serializer.data, safe=False)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()


# api para manejar los roles
def roles(request, proyect_id):
    data = JSONParser().parse(request)
    rol_id = data.get("rol_id")
    if request.method == "POST":
        # Crea un nuevo rol en el proyecto

        serializer = RolSerializer(
            data={"nombre": data["nombre"], "proyecto": proyect_id}
        )
        if serializer.is_valid():
            # Obtiene el id del Rol para vincular
            _rol_id = serializer.save().id
            for permiso in data["permisos"]:
                permisos_serializer = PermisoAsignadoSerializer(
                    data={"permiso": permiso, "rol": _rol_id}
                )
                if permisos_serializer.is_valid():
                    permisos_serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)

    elif request.method == "GET":
        # Trae todos los Roles del proyecto

        r = Rol.objects.filter(proyecto=proyect_id)
        seri = RolSerializer(r, many=True)
        return JsonResponse(seri.data, safe=False)
    elif request.method == "DELETE":
        # En caso de DELETE elimina el rol  del proyecto

        if rol_id:
            try:
                r = Rol.objects.get(proyecto=proyect_id, id=rol_id)
                r.delete()

                return JsonResponse(True, safe=False, status=204)
            except Rol.DoesNotExist:
                return HttpResponseNotModified()
        return HttpResponseBadRequest("Falta rol_id")


# Api para asignar los roles a los usuarios
def roles_asign(request, proyect_id):
    data = JSONParser().parse(request)
    user_id = data.get("user_id")
    rol_id = data.get("rol_id")
    if not user_id:
        return HttpResponseBadRequest("Falta user_id")

    if request.method == "POST":
        # En caso de POST asigna un rol a un usuario
        if not rol_id:
            return HttpResponseBadRequest("Falta rol_id")

        seri = RolAsignadoSerializer(
            data={"usuario": user_id, "rol": rol_id, "proyecto": proyect_id}
        )
        if seri.is_valid():
            seri.save()
            return JsonResponse(seri.data, status=201)
        return JsonResponse(seri.errors, status=400, safe=False)
    elif request.method == "GET":
        # En caso de GET trae todos los roles del usuario en el proyecto
        try:
            r = RolAsignado.objects.filter(proyecto=proyect_id, usuario=user_id)
            seri = RolAsignadoSerializer(r, many=True)
            return JsonResponse(seri.data, safe=False)
        except Rol.DoesNotExist:
            return HttpResponseNotFound()

    elif request.method == "DELETE":
        # En caso de DELETE elimina los roles del usuario del proyecto

        if rol_id:
            try:
                r = RolAsignado.objects.get(
                    proyecto=proyect_id, usuario=user_id, rol=rol_id
                )
                r.delete()

                return JsonResponse(True, safe=False, status=204)
            except RolAsignado.DoesNotExist:
                return HttpResponseNotModified()
        return HttpResponseBadRequest("Falta rol_id")
