##
# @file serializers.py
# @brief Definición de los distintos serializadores.
# @details

##
# @namespace api.serializers
# @brief Definición de los distintos serializadores.
# @details
from rest_framework import serializers
from .models import (
    RegistroHoras,
    Rol,
    Usuario,
    Retrospectiva,
    Sprint,
    US,
    USAsignada,
    Comentario,
    Proyecto,
    RolAsignado,
)

##Serializador de un Rol
class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ["id", "nombre", "proyecto", "permisos"]

##Serializador de un Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nombre", "email", "proy_admin"]

##Serializador de una Retrospectiva
class RetrospectivaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retrospectiva
        fields = [
            "id",
            "creadoPor",
            "fechaCreacion",
        ]

##Serializador de un Sprint.
class SprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprint
        fields = [
            "id",
            "nombre",
            "activo",
            "fechaCreacion",
            "fechaInicio",
            "fechaFinalizacion",
            "estimacion",
            "creadoPor",
            "terminado",
            "retro",
            "proyecto",
        ]

##Serializador de una US.
class USSerializer(serializers.ModelSerializer):
    class Meta:
        model = US
        fields = [
            "id",
            "nombre",
            "contenido",
            "creadoPor",
            "fechaCreacion",
            "estado",
            "prioridad",
            "estimacionSM",
            "estimacionesDev",
            "duracionEstimada",
            "sprint",
            "proyecto",
        ]

##Serializador de una USAsignada.
class USAsignadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = USAsignada
        fields = ["id", "us", "usuario"]

##Serializador de un Comentario.
class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ["id", "us", "creadoPor", "fechaCreacion", "contenido", "retro"]

##Serializador de un Proyecto.
class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = [
            "id",
            "duracionEstimada",
            "fechaInicio",
            "fechaFinalizacion",
            "estado",
            "miembros",
            "nombre",
        ]

##Serializador de un RolASignado.
class RolAsignadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolAsignado
        fields = ["id", "rol", "usuario", "proyecto"]

##Serializador de un RegistroHoras.
class RegistroHorasSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroHoras
        fields = [
            "id",
            "us",
            "fechaCreacion",
            "fechaEdit",
            "fecha",
            "horas",
            "sprint",
            "usuario",
            "proyecto",
            "mensaje",
        ]
