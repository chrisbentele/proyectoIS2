from django.db import models

# Create your models here.


class Permiso(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)


class Rol(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    permisos = models.ManyToManyField(Permiso)


class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    roles = models.ManyToManyField(Rol)


class Proyecto(models.Model):
    EstadoProyecto = ((0, "Pendiente"), (1, "Activo"), (2, "Terminado"))
    idProyecto = models.AutoField(primary_key=True)
    duracionEstimada = models.IntegerField()
    fechaInicio = models.DateField()
    fechaFinalizacion = models.DateField()
    estado = models.IntegerField(choices=EstadoProyecto, default=0)
    miembros = models.ManyToManyField(Usuario)
    admins = models.ManyToManyField(Usuario)
    nombre = models.CharField(max_length=100)
    kanbanTable = models.kanbanTable


Usuario.add_to_class("proyectos", models.ManyToManyField(Proyecto))
