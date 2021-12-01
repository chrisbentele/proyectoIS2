##
# @namespace api.models
# @brief Registro de modelos de datos.
# @details En este archivo se definirán los modelos correspondientes a los
# datos de todo el sistema. \n Entro ellos se encuentran los siguientes:\n
# - Usuario: El modelo correspondiente a cualquier usuario del sistema.
# - Proyecto: Modelo correspondiente a un proyecto.
# -
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
import uuid
from django.utils import timezone

"""!
fasdfsa
"""
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
    (18, "Crear Sprint"),
    (19, "Modificar Sprint"),
    (20, "Eliminar Sprint"),
    (21, "Estimar Sprint"),
)
ESTADO_US = ((0, "To do"), (1, "Doing"), (2, "Done"), (3, "QA"), (4, "Backlog"))

estadoProyecto = ((0, "Activo"), (1, "Terminado"))


class Usuario(Model):
    id = CharField(primary_key=True, default=uuid.uuid4, max_length=100, editable=False)
    nombre = CharField(max_length=100)
    # horas = IntegerField(null=True)
    proy_admin = BooleanField(default=False)
    email = EmailField(unique=True)


class Proyecto(Model):
    id = CharField(primary_key=True, default=uuid.uuid4, max_length=100, editable=False)
    duracionEstimada = IntegerField(null=True)
    fechaInicio = DateField(auto_now_add=True)
    fechaFinalizacion = DateField(blank=True, null=True)
    estado = IntegerField(choices=estadoProyecto, default=0)
    miembros = ManyToManyField(Usuario, blank=True)
    nombre = CharField(max_length=100)


class Retrospectiva(Model):
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    fechaCreacion = DateField()


class Sprint(Model):
    ##
    # @brief Nombre del Sprint
    # @details Puede tener una longitud máxima de 100 caracteres.
    nombre = CharField(max_length=100)
    activo = BooleanField(default=False)
    fechaCreacion = DateField(auto_now_add=True)
    fechaInicio = DateField(blank=True, null=True)
    fechaFinalizacion = DateField(blank=True, null=True)
    estimacion = IntegerField(null=True)
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    terminado = BooleanField(default=False)
    retro = OneToOneField(Retrospectiva, blank=True, null=True, on_delete=CASCADE)
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)


class US(Model):
    nombre = CharField(max_length=100)
    contenido = CharField(max_length=100)
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    fechaCreacion = DateField(auto_now_add=True)
    estado = IntegerField(choices=ESTADO_US, default=4)
    prioridad = IntegerField(default=0)
    estimacionSM = IntegerField(null=True)
    estimacionesDev = IntegerField(null=True)
    duracionEstimada = IntegerField(null=True)
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
    id = CharField(primary_key=True, default=uuid.uuid4, max_length=100, editable=False)
    nombre = CharField(max_length=100)
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)
    permisos = ArrayField(IntegerField(), blank=True)


class RolAsignado(Model):
    id = CharField(primary_key=True, default=uuid.uuid4, max_length=100, editable=False)
    rol = ForeignKey(Rol, on_delete=CASCADE)
    usuario = ForeignKey(Usuario, on_delete=CASCADE)
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)


class RegistroHoras(Model):
    # Registro de cantidad de horas usadas en un US
    us = ForeignKey(US, on_delete=CASCADE)
    fecha = DateField()
    horas = IntegerField()
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)
    sprint = ForeignKey(Sprint, on_delete=CASCADE)
    usuario = ForeignKey(Usuario, on_delete=CASCADE)
    fechaEdit = DateField(null=True)
    fechaCreacion = DateField(editable=False)
    mensaje = CharField(max_length=480, null=False, blank=True)

    def save(self, *args, **kwargs):
        """On save, update timestamps"""
        if not self.id:
            self.fechaCreacion = timezone.now().strftime("%Y-%m-%d")
        self.fechaEdit = timezone.now().strftime("%Y-%m-%d")
        return super(RegistroHoras, self).save(*args, **kwargs)
