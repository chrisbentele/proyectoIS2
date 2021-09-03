from rest_framework import serializers
from .models import (
    Rol,
    PermisoAsignado,
    Usuario,
    # KanbanTable,
    # SeccionTabla,
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
        fields = ["id", "nombre"]


class PermisoAsignadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermisoAsignado
        fields = ["permiso", "rol"]


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nombre", "email"]

    # roles = ManyToManyField(Rol)


# class KanbanTableSerializer(serializers.ModelSerializer):

#     # secciones=ManyToManyField(SeccionTabla)
#     pass


# class SeccionTablaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SeccionTabla
#         fields = [
#             "id",
#             "nombre",
#             "orden",
#             "kanbanTable",
#         ]

# userStories=ManyToManyField()


class RetrospectivaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retrospectiva
        fields = [
            "id",
            "creadoPor",
            "fechaCreacion",
        ]

    # idParticipantes=CharField [ ]
    # Comentarios=Comentario [ ]


class SprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprint
        fields = [
            "id",
            "fechaInicio",
            "fechaFinalizacion",
            "creadoPor",
            "terminado",
            "retro",
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
            "seccion",
            "estado",
            "estimacionSM",
            "estimacionesDev",
            "duracionEstimada",
            "sprint",
        ]


class USAsignadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = USAsignada
        fields = ["us", "usuario"]


class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ["us", "creadoPor", "fechaCreacion", "contenido", "retro"]


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
            # "kanbanTable",
        ]


class RolAsignadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolAsignado
        fields = ["rol", "usuario", "proyecto"]


# Usuario.add_to_class("Serializerproyectos", ManyToManyField(Proyecto))
