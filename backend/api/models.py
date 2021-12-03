##
# @namespace api.models
# @brief Registro de modelos de datos.
# @details En este archivo se definirán los modelos correspondientes a los
# datos de todo el sistema. \n Entro ellos se encuentran los siguientes:\n
# - Usuario: El modelo correspondiente a cualquier usuario del sistema.
# - Proyecto: Modelo correspondiente a un proyecto.
# -

##
# @file models.py
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
    (22, "Reporte Product Backlog"),
    (23, "Reporte Sprint Backlog"),
    (24, "Estimar US - Sprint"),
)
ESTADO_US = ((0, "To do"), (1, "Doing"), (2, "Done"), (3, "QA"), (4, "Backlog"))

estadoProyecto = ((0, "Activo"), (1, "Terminado"))

##Modelo de un Usuario
#
#Esta clase define los campos de un usuario, tales como: id, nombre, proy_admin, email.
class Usuario(Model):
    ##Id del Usuario.
    id = CharField(primary_key=True, default=uuid.uuid4, max_length=100, editable=False)
    ##Nombre completo del Usuario.
    nombre = CharField(max_length=100)
    # horas = IntegerField(null=True)
    ##Si el Usuario tiene permiso de crear proyectos.
    proy_admin = BooleanField(default=False)
    ##Email del Usuario.
    email = EmailField(unique=True)

##Modelo de un Proyecto
#
#Esta clase define los campos de un Proyecto, tales como: id, duracionEstimada, fechaInicio, 
#fechaFinalizacion, estado, miembros, nombre.
class Proyecto(Model):
    ##Id único del Proyecto
    id = CharField(primary_key=True, default=uuid.uuid4, max_length=100, editable=False)
    ##Duración estimada del Proyecto (en semanas).
    duracionEstimada = IntegerField(null=True)
    ##Fecha de inicio del Proyecto.
    fechaInicio = DateField(auto_now_add=True)
    ##Fecha de finalización del Proyecto.
    fechaFinalizacion = DateField(blank=True, null=True)
    ##Estado del Proyecto: Definido, Iniciado, Terminado.
    estado = IntegerField(choices=estadoProyecto, default=0)
    ##Lista de miembros del Proyecto.
    miembros = ManyToManyField(Usuario, blank=True)
    ##Nombre del Proyecto.
    nombre = CharField(max_length=100)


##Modelo de una Retrospectiva
#
#Esta clase define los campos de una Retrospectiva, tales como: creadoPor, fechaCreacion.
class Retrospectiva(Model):
    ##Miembro que creó la Retrospectiva.
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    ##Fecha de creación de la Retrospectiva.
    fechaCreacion = DateField()

##Modelo de un Sprint.
#
#Esta clase define los campos de un Sprint, tales como: nombre, activo, 
#fechaCreacion, fechaInicio, fechaFinalizacion, estimacion, creadoPor, terminado, retro, proyecto.
class Sprint(Model):
    ##Nombre del Sprint.
    nombre = CharField(max_length=100)
    ##Estado del Sprint.
    activo = BooleanField(default=False)
    ##Fecha de creacion del Sprint.
    fechaCreacion = DateField(auto_now_add=True)
    ##Fecha de Inicio del Sprint.
    fechaInicio = DateField(blank=True, null=True)
    ##Fecha de Finalización del Sprint.
    fechaFinalizacion = DateField(blank=True, null=True)
    ##Estimación del Sprint.
    estimacion = IntegerField(null=True)
    ##Miembro que creo el Sprint.
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    ##Si el Sprint se encuentra terminado.
    terminado = BooleanField(default=False)
    ##A qué Retrospectiva pertenece este Sprint.
    retro = OneToOneField(Retrospectiva, blank=True, null=True, on_delete=CASCADE)
    ##A qué Proyecto pertenece este Sprint.
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)


##Modelo de una US.
#
#Esta clase define los campos de un US, tales como: nombnre, contenido, creadoPor, fechaCreacion, estado, 
#prioridad, estimacionSM, estimacionDev, duracionEstimada, Sprint, Proyecto.
class US(Model):
    ##Nombre de la US.
    nombre = CharField(max_length=100)
    ##El Contenido de la US.
    contenido = CharField(max_length=100)
    ##Miembro que ha creado la US.
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    ##Fecha de creación de la US.
    fechaCreacion = DateField(auto_now_add=True)
    ##Estado actual de la US.
    estado = IntegerField(choices=ESTADO_US, default=4)
    ##Prioridad de la US.
    prioridad = IntegerField(default=0)
    ##Estimación que ha dado el Scrum Master a esta US.
    estimacionSM = IntegerField(null=True)
    ##Estimación que ha dado el desarrollador asignado a esta US.
    estimacionesDev = IntegerField(null=True)
    ##Duración estimada de la US.
    duracionEstimada = IntegerField(null=True)
    ##Sprint a la que pertenece esta US.
    sprint = ForeignKey(Sprint, null=True, blank=True, on_delete=CASCADE)
    ##Proyecto al que pertenece esta US.
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)

##Modelo de una USAsignada.
#
#Esta clase define los campos de un USAsignada, tales como: US, usuario.
class USAsignada(Model):
    ##US a la que referencia esta clase.
    us = ForeignKey(US, on_delete=CASCADE)
    ##Usuario al que se ha asignado esta US.
    usuario = ForeignKey(Usuario, on_delete=CASCADE)


##Modelo de un Comentario.
#
#Esta clase define los campos de un Comentario, tales como: US, creadoPor, fechaCreacion, contenido, Retrospectiva.
class Comentario(Model):
    ##US a la que pertenece este Comentario.
    us = ForeignKey(US, on_delete=CASCADE)
    ##Creador de este Comentario.
    creadoPor = ForeignKey(Usuario, on_delete=CASCADE)
    ##Fecha de creación de este Comentario.
    fechaCreacion = DateField(auto_now_add=True)
    ##Contenido de este Comentario.
    contenido = CharField(max_length=480)
    ##Retrospectiva a la que pertenece este Comentario.
    retro = ForeignKey(Retrospectiva, on_delete=CASCADE)

##Modelo de un Rol.
#
#Esta clase define los campos de un Rol, tales como: id, nombre, Proyecto, permisos.
class Rol(Model):
    ##ID único de este Rol.
    id = CharField(primary_key=True, default=uuid.uuid4, max_length=100, editable=False)
    ##Nombre de este Rol.
    nombre = CharField(max_length=100)
    ##Proyecto al que pertenece este Rol.
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)
    ##Permisos de este Rol.
    permisos = ArrayField(IntegerField(), blank=True)

##Modelo de un RolAsignado.
#
#Esta clase define los campos de un RolAsignado, tales como: id, Rol, Usuario, Proyecto
class RolAsignado(Model):
    ##ID único del RolAsignado.
    id = CharField(primary_key=True, default=uuid.uuid4, max_length=100, editable=False)
    ##Rol al que referencia este RolAsignado.
    rol = ForeignKey(Rol, on_delete=CASCADE)
    ##Usuario al que fue asignado este Rol.
    usuario = ForeignKey(Usuario, on_delete=CASCADE)
    ##Proyecto al que pertenece este RolAsignado.
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)

##Modelo de un RegistroHoras.
#
#Esta clase define los campos de un RegistroHoras, tales como: us, fecha, horas, Proyecto, Sprint, Usuario, fechaEdit, 
#fechaCreacion, mensaje.
class RegistroHoras(Model):
    ##US a la cual se están registrando las horas.
    us = ForeignKey(US, on_delete=CASCADE)
    ##Fecha en la cual se registró las horas.
    fecha = DateField()
    ##Cantidad de horas que registraron.
    horas = IntegerField()
    ##Proyecto al que pertenece este RegistroHoras.
    proyecto = ForeignKey(Proyecto, on_delete=CASCADE)
    ##Sprint al que pertenece este RegistroHoras.
    sprint = ForeignKey(Sprint, on_delete=CASCADE)
    ##Usuario que ha registrado sus horas.
    usuario = ForeignKey(Usuario, on_delete=CASCADE)
    ##Última fecha de edición de este registro.
    fechaEdit = DateField(null=True)
    ##Fecha de creación de este registro.
    fechaCreacion = DateField(editable=False)
    ##Mensaje descriptivo de este registro.
    mensaje = CharField(max_length=480, null=False, blank=True)

    ##Función para guardar cambios a este RegistroHoras.
    def save(self, *args, **kwargs):
        """On save, update timestamps"""
        if not self.id:
            self.fechaCreacion = timezone.now().strftime("%Y-%m-%d")
        self.fechaEdit = timezone.now().strftime("%Y-%m-%d")
        return super(RegistroHoras, self).save(*args, **kwargs)
