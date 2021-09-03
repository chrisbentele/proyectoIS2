from rest_framework import serializers, exceptions
import rest_framework
from .serializers import (
    PermisoAsignadoSerializer,
    ProyectoSerializer,
    RolSerializer,
    UsuarioSerializer,
)
import json
from api.models import PermisoAsignado, Usuario
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


def roles(request):
    if request.method == "POST":

        data = JSONParser().parse(request)

        serializer = RolSerializer(
            data={"nombre": data["nombre"], "proyecto": data["proyecto"]}
        )
        if serializer.is_valid():
            # Obtiene el id del Rol para vincular
            rol_id = serializer.save().id
            for permiso in data["permisos"]:
                permisos_serializer = PermisoAsignadoSerializer(
                    data={"permiso": permiso, "rol": rol_id}
                )
                if permisos_serializer.is_valid():
                    permisos_serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)
    elif request.method == "GET":

        data = JSONParser().parse(request)
        print(data)
        if data.get("email") == None:
            return HttpResponseBadRequest("Falta el mail en el body")
        try:
            u = Usuario.objects.get(email=data["email"])
            serializer = UsuarioSerializer(u)
            return JsonResponse(serializer.data, safe=False)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()


def permisoAsignado(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = PermisoAsignado(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)
