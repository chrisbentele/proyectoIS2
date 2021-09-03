from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.db.models.fields import (
    BooleanField,
    CharField,
    AutoField,
    DateField,
    EmailField,
    IntegerField,
)
from django.db.models.fields.related import ForeignKey, ManyToManyField, OneToOneField

# Create your models here.
PERMISOS = (
    (0, "Crear proyecto"),
    (1, "Ver proyecto"),
    (2, "Editar configuración del proyecto"),
    (3, "Editar miembros a proyecto"),
    (4, "Eliminar proyecto"),
    (5, "Crear US"),
    (6, "Modificar US"),
    (7, "Eliminar US"),
    (8, "Estimar US"),
    (9, "Asignar miembros a US"),
    (10, "Cambiar estado US"),
    (11, "Crear rol"),
    (12, "Editar parámetros del rol"),
    (13, "Eliminar rol"),
    (14, "Asignar rol"),
    (15, "Agregar usuario"),
    (16, "Editar rol del usuario"),
    (17, "Eliminar usuario"),
)


class Rol(Model):
    id = AutoField(primary_key=True)
    nombre = CharField(max_length=100)


class PermisoAsignado(Model):
    permiso = IntegerField(choices=PERMISOS)
    rol = ForeignKey(Rol, CASCADE)


class Usuario(Model):
    idUsuario = AutoField(primary_key=True)
    nombre = CharField(max_length=100)
    email = EmailField(unique=True)
    # roles = ManyToManyField(Rol)


class KanbanTable(Model):
    # secciones=ManyToManyField(SeccionTabla)
    pass


class SeccionTabla(Model):
    idSeccion = AutoField(primary_key=True)
    nombre = CharField(max_length=100)
    orden = IntegerField()
    kanbanTable = ForeignKey(KanbanTable, CASCADE)
    # userStories=ManyToManyField()


class Retrospectiva(Model):

    idRetro = AutoField(primary_key=True)
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    fechaCreacion = DateField()
    # idParticipantes=CharField [ ]
    # Comentarios=Comentario [ ]


class Sprint(Model):
    idSprint = AutoField(primary_key=True)
    fechaInicio = DateField()
    fechaFinalizacion = DateField()
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    terminado = BooleanField()
    # US=CharField [ ]
    retro = OneToOneField(Retrospectiva, on_delete=CASCADE)


class US(Model):
    EstadoUS = ((0, "To do"), (1, "Doing"), (2, "Done"))

    idUS = AutoField(primary_key=True)
    nombre = CharField(max_length=100)
    contenido = CharField(max_length=100)
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    fechaCreacion = DateField()
    seccion = ForeignKey(SeccionTabla, on_delete=CASCADE)
    # idAsignados=ManyToManyField()
    estado = IntegerField(choices=EstadoUS, default=0)
    # comentarios=Comentario [ ]
    estimacionSM = IntegerField
    estimacionesDev = IntegerField
    duracionEstimada = IntegerField
    sprint = ForeignKey(Sprint, on_delete=CASCADE)


class USAsignada(Model):
    us = ForeignKey(US, on_delete=CASCADE)
    usuario = ForeignKey(Usuario, on_delete=CASCADE)


class Comentario(Model):
    us = ForeignKey(US, on_delete=CASCADE)
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    fechaCreacion = DateField()
    contenido = CharField(max_length=480)
    retro = ForeignKey(Retrospectiva, on_delete=CASCADE)


estadoProyecto = ((0, "Pendiente"), (1, "Activo"), (2, "Terminado"))


class Proyecto(Model):
    idProyecto = AutoField(primary_key=True)
    duracionEstimada = IntegerField()
    fechaInicio = DateField(auto_now_add=True)
    fechaFinalizacion = DateField()
    estado = IntegerField(choices=estadoProyecto, default=0)
    miembros = ManyToManyField(Usuario)
    # admins = ManyToManyField(Usuario)
    nombre = CharField(max_length=100)
    kanbanTable = ForeignKey(KanbanTable, on_delete=CASCADE)


class RolAsignado(Model):
    rol = ForeignKey(Rol, on_delete=CASCADE)
    usuario = ForeignKey(Usuario, on_delete=CASCADE)
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)


# Usuario.add_to_class("proyectos", ManyToManyField(Proyecto))
