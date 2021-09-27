from rest_framework.exceptions import ValidationError
from .serializers import (
    ProyectoSerializer,
    RolAsignadoSerializer,
    RolSerializer,
    SprintSerializer,
    USSerializer,
    UsuarioSerializer,
)
from api.models import US, Proyecto, Rol, RolAsignado, Sprint, Usuario
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
        try:
            proy_seri = ProyectoSerializer(data=data)
            proy_seri.is_valid(raise_exception=True)
            proy = proy_seri.save()

            # crear el rol scrum master
            rol_seri = RolSerializer(
                data={
                    "nombre": "Scrum Master",
                    "proyecto": proy.id,
                    "permisos": [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                    ],
                }
            )

            rol_seri.is_valid(raise_exception=True)
            scrum_rol = rol_seri.save()
            # asigna el rol scrum mastes al miembro en la posicion 0
            rol_asignado_seri = RolAsignadoSerializer(
                data={
                    "rol": scrum_rol.id,
                    "usuario": data["scrumMasterId"],
                    "proyecto": proy.id,
                }
            )
            rol_asignado_seri.is_valid(raise_exception=True)
            rol_asignado_seri.save(id=-1)

            rol_seri = RolSerializer(
                data={
                    "nombre": "Developer",
                    "proyecto": proy.id,
                    "permisos": [
                        6,
                        8,
                        10,
                    ],
                }
            )

            rol_seri.is_valid(raise_exception=True)
            scrum_rol = rol_seri.save()

            return JsonResponse(proy_seri.data, status=201, safe=False)
        except ValidationError as e:
            return JsonResponse(e.detail, status=400, safe=False)
        except Exception as e:
            return JsonResponse(e, safe=False)

    elif request.method == "GET":
        if proyect_id != None:
            try:
                p = Proyecto.objects.get(id=proyect_id)
                proy_seri = ProyectoSerializer(p)
                proy_data = proy_seri.data
                scrum_obj = RolAsignado.objects.get(
                    id=-1
                )  ## obtiene el RolAsignado con el id -1, el del scrum master
                scrum_data = RolAsignadoSerializer(scrum_obj).data
                proy_data.update({"scrumMaster": scrum_data})
                return JsonResponse(proy_data, safe=False)
            except Usuario.DoesNotExist:
                return HttpResponseNotFound()
        else:
            p = Proyecto.objects.all()
            proy_seri = ProyectoSerializer(p, many=True)
            return JsonResponse(proy_seri.data, safe=False)

    elif request.method == "DELETE":
        p = Proyecto.objects.get(id=proyect_id)
        p.delete()
        return JsonResponse(True, safe=False, status=204)

    elif request.method == "PUT":
        if proyect_id:
            data = JSONParser().parse(request)

            rol = Proyecto.objects.get(id=proyect_id)

            proy_seri = ProyectoSerializer(rol, data=data, partial=True)

            if proy_seri.is_valid():
                proy_seri.save()
                return JsonResponse(proy_seri.data, status=200)
            return JsonResponse(proy_seri.errors, status=400, safe=False)
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
                u_data = UsuarioSerializer(u).data
                r = RolAsignado.objects.filter(proyecto=proyect_id, usuario=id)
                rol_data = RolAsignadoSerializer(r, many=True).data
                rol_data = rol_data[0] if len(rol_data) > 0 else None
                u_data.update({"rol": rol_data})
                u_list.append(u_data)
            return JsonResponse(u_list, safe=False)

        try:
            u = Usuario.objects.get(id=user_id)
            user_data = UsuarioSerializer(u).data
            r = RolAsignado.objects.filter(proyecto=proyect_id, usuario=user_id)
            rol_data = RolAsignadoSerializer(r, many=True).data
            rol_data = rol_data[0] if len(rol_data) > 0 else None

            user_data.update({"rol": rol_data})
            return JsonResponse(user_data, safe=False)
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

        rolAsig = RolAsignado.objects.filter(proyecto=proyect_id, usuario=user_id)
        for i in rolAsig:
            i.delete()

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
            rolAsig = RolAsignado.objects.filter(proyecto=proyect_id, usuario=user_id)
            rolAsi = rolAsig[0] if len(rolAsig) > 0 else None
            seri = RolAsignadoSerializer(rolAsi)

            rol = Rol.objects.get(id=seri.data["id"])
            rol_seri = RolSerializer(rol)

            return JsonResponse(rol_seri.data, safe=False)
        except Rol.DoesNotExist:
            return HttpResponseNotFound()

    elif request.method == "DELETE":
        # En caso de DELETE elimina los roles del usuario del proyecto

        if rol_id:
            try:
                rolAsig = RolAsignado.objects.get(
                    proyecto=proyect_id, usuario=user_id, rol=rol_id
                )
                rolAsig.delete()

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


def sprints(request, proyect_id, sprint_id=None):
    try:
        proyecto = Proyecto.objects.get(id=proyect_id)
    except Proyecto.DoesNotExist:
        return HttpResponseNotFound()

    if request.method == "POST":
        # Crea el sprint
        data = JSONParser().parse(request)
        data["proyecto"] = proyect_id
        serializer = SprintSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)

    elif request.method == "GET":
        if sprint_id != None:
            try:
                spr = Sprint.objects.get(id=sprint_id)
                serializer = SprintSerializer(spr)
                return JsonResponse(serializer.data, safe=False)
            except Sprint.DoesNotExist:
                return HttpResponseNotFound()
        else:
            spr = Sprint.objects.filter(proyecto=proyecto)
            serializer = SprintSerializer(spr, many=True)
            return JsonResponse(serializer.data, safe=False)

    elif request.method == "DELETE":
        spr = Sprint.objects.get(id=sprint_id)
        spr.delete()
        return JsonResponse(True, status=204, safe=False)

    elif request.method == "PUT":
        if sprint_id:
            data = JSONParser().parse(request)

            spr = Sprint.objects.get(id=sprint_id)

            serializer = SprintSerializer(spr, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400, safe=False)
        return HttpResponseBadRequest("Falta sprint_id")
