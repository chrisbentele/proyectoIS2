from .serializers import (
    ProyectoSerializer,
    RolAsignadoSerializer,
    RolSerializer,
    USSerializer,
    UsuarioSerializer,
)
from api.models import US, Proyecto, Rol, RolAsignado, Usuario
from django.http.response import (
    HttpResponseBadRequest,
    HttpResponseNotFound,
    HttpResponseNotModified,
    JsonResponse,
)
from rest_framework.parsers import JSONParser

# Create your views here.
def proyectos(request, proyect_id=None):
    if request.method == "POST":
        # Crea el proyecto
        data = JSONParser().parse(request)
        serializer = ProyectoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)

    elif request.method == "GET":
        if proyect_id != None:
            try:
                p = Proyecto.objects.get(id=proyect_id)
                serializer = ProyectoSerializer(p)
                return JsonResponse(serializer.data, safe=False)
            except Usuario.DoesNotExist:
                return HttpResponseNotFound()
        else:
            p = Proyecto.objects.all()
            serializer = ProyectoSerializer(p, many=True)
            return JsonResponse(serializer.data, safe=False)

    elif request.method == "DELETE":
        p = Proyecto.objects.get(id=proyect_id)
        p.delete()
        return JsonResponse(True, safe=False, status=204)

    elif request.method == "PUT":
        if proyect_id:
            data = JSONParser().parse(request)

            rol = Proyecto.objects.get(id=proyect_id)

            serializer = ProyectoSerializer(rol, data=data, partial=True)

            if serializer.is_valid():
                # Obtiene el id del Rol para vincular
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400, safe=False)
        return HttpResponseBadRequest("Falta proyect_id")


def usuarios(request, user_id=None):
    if request.method == "POST":

        data = JSONParser().parse(request)
        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            if data.get("id"):
                serializer.save(id=data.get("id"))
            else:
                serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)

    elif request.method == "GET":
        if not user_id and not request.GET.get("email"):
            u = Usuario.objects.all()
            serializer = UsuarioSerializer(u, many=True)
            return JsonResponse(serializer.data, safe=False)

        if not request.GET.get("email") and not user_id:
            return HttpResponseBadRequest("Falta el mail o el user en el body")
        try:
            if request.GET.get("email"):
                u = Usuario.objects.get(email=request.GET.get("email"))
                serializer = UsuarioSerializer(u)
            else:
                u = Usuario.objects.get(id=user_id)
                serializer = UsuarioSerializer(u)

            return JsonResponse(serializer.data, safe=False)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()
    elif request.method == "PUT":
        if user_id:
            data = JSONParser().parse(request)

            rol = Usuario.objects.get(id=user_id)

            serializer = UsuarioSerializer(rol, data=data, partial=True)

            if serializer.is_valid():
                # Obtiene el id del Rol para vincular
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400, safe=False)
        return HttpResponseBadRequest("Falta user_id")
    elif request.method == "DELETE":
        u = Usuario.objects.get(id=user_id)
        u.delete()
        return JsonResponse(True, safe=False, status=204)


def usuarios_proyectos(request, user_id):
    # agregar y eliminar\

    if request.method == "GET":
        # trae los proyectos del usuario

        try:
            p = Proyecto.objects.filter(miembros__id__contains=user_id)
            serializer = ProyectoSerializer(p, many=True)
            return JsonResponse(serializer.data, safe=False)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()


def proyectos_miembros(request, proyect_id, user_id=None):
    # agregar y eliminar\
    # proyect_id = request.GET.get("proyect_id")
    if request.method == "POST":
        if not user_id:
            return JsonResponse(False, status=400, safe=False)

        try:
            p = Proyecto.objects.get(id=proyect_id)
            u = Usuario.objects.get(id=user_id)
            if p.miembros.filter(id=user_id):
                return JsonResponse(
                    "Ya existe el usuario en el proyecto", status=400, safe=False
                )
            p.miembros.add(u)
            p.save()

            return JsonResponse(True, status=201, safe=False)
        except Exception as e:
            return JsonResponse(str(e), status=400, safe=False)

    elif request.method == "GET":
        # trae los proyectos del usuario
        if not user_id:
            p = Proyecto.objects.get(id=proyect_id)
            serializer = ProyectoSerializer(p)
            u_list = []
            for id in serializer.data["miembros"]:
                u = Usuario.objects.get(id=id)
                u_list.append(UsuarioSerializer(u).data)
            return JsonResponse(u_list, safe=False)

        try:
            u = Usuario.objects.get(id=user_id)

            return JsonResponse(UsuarioSerializer(u).data, safe=False)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()

    elif request.method == "DELETE":
        # Remueve usuario del proyecto
        if not user_id:
            return HttpResponseBadRequest("Falta el user_id en el body")

        try:
            p = Proyecto.objects.get(id=proyect_id)
            p.miembros.remove(user_id)
            p.save()
            serializer = ProyectoSerializer(p)
            return JsonResponse(serializer.data, safe=False, status=204)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()


# api para manejar los roles
def roles(request, proyect_id, rol_id=None):
    if request.method == "POST":
        data = JSONParser().parse(request)
        # Crea un nuevo rol en el proyecto
        serializer = RolSerializer(
            data={
                "nombre": data["nombre"],
                "proyecto": proyect_id,
                "permisos": data["permisos"],
            }
        )
        if serializer.is_valid():
            # Obtiene el id del Rol para vincular
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)
    elif request.method == "PUT":
        if rol_id:
            data = JSONParser().parse(request)

            rol = Rol.objects.get(id=rol_id)

            serializer = RolSerializer(rol, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400, safe=False)
        return HttpResponseBadRequest("Falta rol_id")

    elif request.method == "GET":
        if not rol_id:
            # Trae todos los Roles del proyecto
            r = Rol.objects.filter(proyecto=proyect_id)
            seri = RolSerializer(r, many=True)
            return JsonResponse(seri.data, safe=False)

        try:
            u = Rol.objects.get(id=rol_id)
            return JsonResponse(RolSerializer(u).data, safe=False)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()

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
def proyectos_miembros_roles(request, proyect_id, user_id, rol_id=None):

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


def user_stories(request, proyect_id, us_id=None):
    try:
        proyecto = Proyecto.objects.get(id=proyect_id)
    except Proyecto.DoesNotExist:
        return HttpResponseNotFound()

    if request.method == "POST":
        # Crea el user storie
        data = JSONParser().parse(request)
        data["proyecto"] = proyect_id
        serializer = USSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)

    elif request.method == "GET":
        if us_id != None:
            try:
                us = US.objects.get(id=us_id)
                serializer = USSerializer(us)
                return JsonResponse(serializer.data, safe=False)
            except US.DoesNotExist:
                return HttpResponseNotFound()
        else:
            us = US.objects.filter(proyecto=proyecto)
            serializer = USSerializer(us, many=True)
            return JsonResponse(serializer.data, safe=False)

    elif request.method == "DELETE":
        us = US.objects.get(id=us_id)
        us.delete()
        return JsonResponse(True, status=204, safe=False)

    elif request.method == "PUT":
        if us_id:
            data = JSONParser().parse(request)

            us = US.objects.get(id=us_id)

            serializer = USSerializer(us, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400, safe=False)
        return HttpResponseBadRequest("Falta us_id")
