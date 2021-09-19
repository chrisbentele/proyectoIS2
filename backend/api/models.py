from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.db.models.fields import (
    BooleanField,
    CharField,
    DateField,
    EmailField,
    IntegerField,
)
from django.db.models.fields.related import ForeignKey, ManyToManyField, OneToOneField
from django.contrib.postgres.fields import ArrayField

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
ESTADO_US = ((0, "To do"), (1, "Doing"), (2, "Done"))

estadoProyecto = ((0, "Pendiente"), (1, "Activo"), (2, "Terminado"))


class Usuario(Model):
    nombre = CharField(max_length=100)
    email = EmailField(unique=True)


class Proyecto(Model):
    duracionEstimada = IntegerField(blank=True)
    fechaInicio = DateField(auto_now_add=True)
    fechaFinalizacion = DateField(blank=True, null=True)
    estado = IntegerField(choices=estadoProyecto, default=0)
    miembros = ManyToManyField(Usuario, blank=True)
    nombre = CharField(max_length=100)


class Retrospectiva(Model):
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    fechaCreacion = DateField()


class Sprint(Model):
    fechaInicio = DateField()
    fechaFinalizacion = DateField()
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    terminado = BooleanField(default=False)
    retro = OneToOneField(Retrospectiva, blank=True, null=True, on_delete=CASCADE)


class US(Model):
    nombre = CharField(max_length=100)
    contenido = CharField(max_length=100)
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    fechaCreacion = DateField(auto_now_add=True)
    estado = IntegerField(choices=ESTADO_US, default=0)
    estimacionSM = IntegerField(blank=True)
    estimacionesDev = IntegerField(blank=True)
    duracionEstimada = IntegerField(blank=True)
    sprint = ForeignKey(Sprint, null=True, blank=True, on_delete=CASCADE)
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)


class USAsignada(Model):
    us = ForeignKey(US, on_delete=CASCADE)
    usuario = ForeignKey(Usuario, on_delete=CASCADE)


class Comentario(Model):
    us = ForeignKey(US, on_delete=CASCADE)
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    fechaCreacion = DateField(auto_now_add=True)
    contenido = CharField(max_length=480)
    retro = ForeignKey(Retrospectiva, on_delete=CASCADE)


class Rol(Model):
    nombre = CharField(max_length=100)
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)
    permisos = ArrayField(IntegerField(), blank=True)


class RolAsignado(Model):
    rol = ForeignKey(Rol, on_delete=CASCADE)
    usuario = ForeignKey(Usuario, on_delete=CASCADE)
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)
