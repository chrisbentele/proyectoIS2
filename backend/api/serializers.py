from django.db.models import fields
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


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ["id", "nombre", "proyecto", "permisos"]


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nombre", "email", "proy_admin"]


class RetrospectivaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retrospectiva
        fields = [
            "id",
            "creadoPor",
            "fechaCreacion",
        ]


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
            "estimacionSM",
            "estimacionesDev",
            "duracionEstimada",
            "sprint",
            "proyecto",
        ]


class USAsignadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = USAsignada
        fields = ["id", "us", "usuario"]


class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ["id", "us", "creadoPor", "fechaCreacion", "contenido", "retro"]


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


class RolAsignadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolAsignado
        fields = ["id", "rol", "usuario", "proyecto"]


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
        ]
