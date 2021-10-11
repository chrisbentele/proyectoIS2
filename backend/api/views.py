from functools import partial
from rest_framework.exceptions import ValidationError
from .serializers import (
    ProyectoSerializer,
    RolAsignadoSerializer,
    RolSerializer,
    SprintSerializer,
    USAsignadaSerializer,
    USSerializer,
    UsuarioSerializer,
)
from api.models import US, Proyecto, Rol, RolAsignado, Sprint, USAsignada, Usuario
from django.http.response import (
    HttpResponseBadRequest,
    HttpResponseForbidden,
    HttpResponseNotFound,
    HttpResponseNotModified,
    JsonResponse,
)
from rest_framework.parsers import JSONParser


def proyectos(request, proyect_id=None):
    """Funcion para manejo de proyectos"""
    if request.method == "POST":
        # Crea el proyecto
        data = JSONParser().parse(request)
        try:
            proy_seri = ProyectoSerializer(data=data)
            proy_seri.is_valid(raise_exception=True)
            proy = proy_seri.save()

            # Crea el rol scrum master en el proyecto
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
            scrum_rol = rol_seri.save(id=proy.id)

            # Asigna el rol scrum mastes al miembro en la posicion 0
            rol_asignado_seri = RolAsignadoSerializer(
                data={
                    "rol": scrum_rol.id,
                    "usuario": data["scrumMasterId"],
                    "proyecto": proy.id,
                }
            )
            rol_asignado_seri.is_valid(raise_exception=True)
            rol_asignado_seri.save(id=proy.id)

            # Crea el rol Developer en el proyecto
            rol_seri = RolSerializer(
                data={
                    "nombre": "Developer",
                    "proyecto": proy.id,
                    "permisos": [
                        1,
                        6,
                        8,
                        10,
                    ],
                }
            )

            rol_seri.is_valid(raise_exception=True)
            scrum_rol = rol_seri.save()

            # Crea el rol Product Owner en el proyecto
            rol_seri = RolSerializer(
                data={
                    "nombre": "Product Owner",
                    "proyecto": proy.id,
                    "permisos": [
                        1,
                        2,
                        5,
                        6,
                        7,
                        9,
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
            # Trae un proyecto por su proyect_id
            try:
                p = Proyecto.objects.get(id=proyect_id)
                proy_seri = ProyectoSerializer(p)
                proy_data = proy_seri.data
                scrum_obj = RolAsignado.objects.get(
                    id=proyect_id
                )  ## obtiene el RolAsignado con el id del proyecto, el del scrum master
                scrum_data = RolAsignadoSerializer(scrum_obj).data
                proy_data.update({"scrumMaster": scrum_data})
                return JsonResponse(proy_data, safe=False)
            except Usuario.DoesNotExist:
                return HttpResponseNotFound()
        else:
            # Trae todos los proyectos
            p = Proyecto.objects.all()
            proy_seri = ProyectoSerializer(p, many=True)
            return JsonResponse(proy_seri.data, safe=False)

    elif request.method == "DELETE":
        # Elimina un proyecto
        p = Proyecto.objects.get(id=proyect_id)
        p.delete()
        return JsonResponse(True, safe=False, status=204)

    elif request.method == "PUT":
        if proyect_id:
            # Editar la informacion de un proyecto
            data = JSONParser().parse(request)

            rol = Proyecto.objects.get(id=proyect_id)

            proy_seri = ProyectoSerializer(rol, data=data, partial=True)

            if proy_seri.is_valid():
                proy_seri.save()
                return JsonResponse(proy_seri.data, status=200)
            return JsonResponse(proy_seri.errors, status=400, safe=False)
        return HttpResponseBadRequest("Falta proyect_id")


def usuarios(request, user_id=None):
    """Metodos p/ admin de usuarios"""
    if request.method == "POST":
        # Crea un Nuevo usuario
        data = JSONParser().parse(request)
        u = Usuario.objects.first()
        if u == None:
            data["proy_admin"] = True
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
            # Trae Todos los usuarios de la base de datos
            u = Usuario.objects.all()
            serializer = UsuarioSerializer(u, many=True)
            return JsonResponse(serializer.data, safe=False)

        if not request.GET.get("email") and not user_id:
            return HttpResponseBadRequest("Falta el mail o el user en el body")
        try:
            # Trae Un usuario por su respectivo user_id o email
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
            # Edita la informacion de un Usuario
            data = JSONParser().parse(request)

            rol = Usuario.objects.get(id=user_id)

            serializer = UsuarioSerializer(rol, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400, safe=False)
        return HttpResponseBadRequest("Falta user_id")
    elif request.method == "DELETE":
        # Elimina un usuario
        u = Usuario.objects.get(id=user_id)
        u.delete()
        return JsonResponse(True, safe=False, status=204)


def usuarios_proyectos(request, user_id):
    """trae todos los usuarios del proyecto"""

    if request.method == "GET":

        try:
            p = Proyecto.objects.filter(miembros__id__contains=user_id)
            serializer = ProyectoSerializer(p, many=True)
            return JsonResponse(serializer.data, safe=False)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()


def proyectos_miembros(request, proyect_id, user_id=None):
    """Metodos p/ admin de miembros de proyecto"""

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

            # Asgina el rol de Developer al usuario
            pr = Rol.objects.filter(proyecto=proyect_id)
            pr_seri = RolSerializer(pr, many=True)
            for rol in pr_seri.data:
                if rol["nombre"] == "Developer":
                    ra = RolAsignadoSerializer(
                        data={
                            "usuario": user_id,
                            "proyecto": proyect_id,
                            "rol": rol["id"],
                        }
                    )
                    ra.is_valid()
                    ra.save()
                    break

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

                rol = Rol.objects.get(id=rol_data["rol"])
                rol_seri = RolSerializer(rol)

                u_data.update({"rol": rol_seri.data})

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

            # Elimina Roles asignados al proyecto
            rolesAsignados = RolAsignado.objects.filter(
                proyecto=proyect_id, usuario=user_id
            )

            for ra in rolesAsignados:
                ra.delete()

            serializer = ProyectoSerializer(p)
            return JsonResponse(serializer.data, safe=False, status=204)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()


# api para manejar los roles
def roles(request, proyect_id, rol_id=None):
    """Metodos p/ admin de roles de proyecto"""

    if request.method == "POST":
        # Crea un nuevo rol en el proyecto
        data = JSONParser().parse(request)
        serializer = RolSerializer(
            data={
                "nombre": data["nombre"],
                "proyecto": proyect_id,
                "permisos": data["permisos"],
            }
        )
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)
    elif request.method == "PUT":
        if rol_id:
            # Editar un Rol
            try:
                rol = Rol.objects.get(id=rol_id)
            except Rol.DoesNotExist:
                return HttpResponseNotFound()
            if rol.nombre == "Scrum Master" or rol.nombre == "Developer":
                return JsonResponse(
                    "No se puede editar el Rol de Scrum Master", safe=False, status=400
                )
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
            # Trae un Rol por su id
            u = Rol.objects.get(id=rol_id)
            return JsonResponse(RolSerializer(u).data, safe=False)
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()

    elif request.method == "DELETE":
        # En caso de DELETE elimina el rol  del proyecto

        if rol_id:
            try:
                rol = Rol.objects.get(id=rol_id)
            except Rol.DoesNotExist:
                return HttpResponseNotFound()
            if rol.nombre == "Scrum Master" or rol.nombre == "Developer":
                return JsonResponse(
                    "No se puede eliminar el Rol", safe=False, status=400
                )
            try:
                r = Rol.objects.get(proyecto=proyect_id, id=rol_id)
                r.delete()

                return JsonResponse(True, safe=False, status=204)
            except Rol.DoesNotExist:
                return HttpResponseNotModified()
        return HttpResponseBadRequest("Falta rol_id")


# Api para asignar los roles a los usuarios
def proyectos_miembros_roles(request, proyect_id, user_id, rol_id=None):
    """Metodos p/ admin de roles de miembros de proyecto"""

    if request.method == "POST":
        # En caso de POST asigna un rol a un usuario
        if not rol_id:
            return HttpResponseBadRequest("Falta rol_id")

        try:
            rolAsig = RolAsignado.objects.filter(proyecto=proyect_id, usuario=user_id)
            for ra in rolAsig:
                ra.delete()

            if proyect_id == rol_id:
                # Si es scrum master el rol asignado cambia
                scrum = RolAsignado.objects.get(rol=rol_id)
                seri = RolAsignadoSerializer(
                    scrum,
                    data={
                        "usuario": user_id,
                    },
                    partial=True,
                )
            else:
                seri = RolAsignadoSerializer(
                    data={"usuario": user_id, "rol": rol_id, "proyecto": proyect_id}
                )
            seri.is_valid(raise_exception=True)
            seri.save()
            return JsonResponse(seri.data, status=201)
        except:
            return JsonResponse(seri.errors, status=400, safe=False)
    elif request.method == "GET":
        # En caso de GET trae todos los roles del usuario en el proyecto
        try:
            rolAsig = RolAsignado.objects.filter(proyecto=proyect_id, usuario=user_id)
            rolAsi = rolAsig[0] if len(rolAsig) > 0 else None
            seri = RolAsignadoSerializer(rolAsi)

            rol = Rol.objects.get(id=seri.data["rol"])
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
    """Metodos p/ admin de US de proyecto"""

    try:
        proyecto = Proyecto.objects.get(id=proyect_id)
    except Proyecto.DoesNotExist:
        return HttpResponseNotFound()

    if request.method == "POST":
        # Crea la user storie
        data = JSONParser().parse(request)
        data["proyecto"] = proyect_id
        serializer = USSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)

    elif request.method == "GET":

        def get_asigned_user(us_id):

            asigned_query = USAsignada.objects.filter(
                us=us_id,
            )
            asigned = USAsignadaSerializer(asigned_query, many=True).data
            return asigned[0]["usuario"] if len(asigned) > 0 else None

        if us_id != None:
            try:
                us = US.objects.get(id=us_id)
                serializer = USSerializer(us)
                us_data = serializer.data

                asigned_user_id = get_asigned_user(us_id)
                if asigned_user_id:
                    asigned_user = UsuarioSerializer(
                        Usuario.objects.get(id=asigned_user_id)
                    ).data
                    us_data.update({"asignado": asigned_user})

                else:
                    us_data.update({"asignado": None})

                return JsonResponse(us_data, safe=False)
            except US.DoesNotExist:
                return HttpResponseNotFound()
        else:
            us = US.objects.filter(proyecto=proyecto)
            serializer = USSerializer(us, many=True)
            us_list = serializer.data
            for us in us_list:
                asigned_user = get_asigned_user(us["id"])
                us.update({"asignado": asigned_user})
            return JsonResponse(us_list, safe=False)

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


def user_stories_estimar(request, proyect_id, us_id):
    """Estimaciones de tiempo hechas por el scrum master o el dev

    Detecta automaticamente si es un scrum master o un developer
    """
    try:
        proyecto = Proyecto.objects.get(id=proyect_id)
    except Proyecto.DoesNotExist:
        return HttpResponseNotFound()

    try:
        us = US.objects.get(id=us_id)
    except US.DoesNotExist:
        return HttpResponseNotFound()

    if request.method == "POST":
        data = JSONParser().parse(request)

        rol_asign = RolAsignado.objects.filter(
            usuario=data["user_id"], proyecto=proyect_id
        )

        rol_asign = (
            RolAsignadoSerializer(rol_asign[0]).data if len(rol_asign) > 0 else None
        )

        if not rol_asign:
            return HttpResponseForbidden("No tiene permisos")

        rol_user = Rol.objects.get(id=rol_asign["rol"])

        rol_user = RolSerializer(rol_user).data

        if rol_user["id"] == proyect_id:

            serializer = USSerializer(
                us, data={"estimacionSM": data["estimacion"]}, partial=True
            )
        else:
            serializer = USSerializer(
                us, data={"estimacionesDev": data["estimacion"]}, partial=True
            )

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400, safe=False)


def sprints(request, proyect_id, sprint_id=None):
    """Metodos p/ admin de sprints de proyecto"""

    try:
        proyecto = Proyecto.objects.get(id=proyect_id)
    except Proyecto.DoesNotExist:
        return HttpResponseNotFound()

    if request.method == "POST":
        # Crea un sprint
        data = JSONParser().parse(request)
        data["proyecto"] = proyect_id
        serializer = SprintSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400, safe=False)

    elif request.method == "GET":

        def get_us_count(sprint_id):
            uss = US.objects.filter(proyecto=proyecto, sprint=sprint_id)
            serializer = USSerializer(uss, many=True)
            us_list = serializer.data
            conteo = None
            for us in us_list:
                if us["estimacionSM"] != None or us["estimacionesDev"] != None:
                    if conteo == None:
                        conteo = 0
                    conteo += (us["estimacionSM"]) + (us["estimacionesDev"])
                else:
                    conteo = None
                    break

            return conteo, len(us_list)

        if sprint_id != None:
            # Retorna un sprint
            try:
                spr = Sprint.objects.get(id=sprint_id)
                serializer = SprintSerializer(spr)
                spr_data = serializer.data
                conteo_estimaciones, us_list_length = get_us_count(sprint_id)
                spr_data.update(
                    {
                        "sumaHorasAsignadas": conteo_estimaciones,
                        "numeroDeUs": us_list_length,
                    }
                )
                return JsonResponse(spr_data, safe=False)
            except Sprint.DoesNotExist:
                return HttpResponseNotFound()
        else:
            # Retorna los sprints de un proyecto
            spr = Sprint.objects.filter(proyecto=proyecto)
            serializer = SprintSerializer(spr, many=True)
            spr_data = serializer.data
            conteo_estimaciones, us_list_length = get_us_count(sprint_id)
            spr_data.update(
                {
                    "sumaHorasAsignadas": conteo_estimaciones,
                    "numeroDeUs": us_list_length,
                }
            )
            return JsonResponse(spr_data, safe=False)

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


def sprints_user_stories(request, proyect_id, sprint_id, us_id=None):
    """Administra los user stories de un sprint de proyecto"""

    try:
        proyecto = Proyecto.objects.get(id=proyect_id)
    except Proyecto.DoesNotExist:
        return HttpResponseNotFound("Proyecto no existe")

    try:
        sprint = Sprint.objects.get(id=sprint_id)
    except Sprint.DoesNotExist:
        return HttpResponseNotFound("Sprint no existe")

    if request.method == "GET":
        us = US.objects.filter(proyecto=proyecto, sprint=sprint_id)
        serializer = USSerializer(us, many=True)
        us_list = serializer.data

        def get_asigned_user(us_id):
            asigned_query = USAsignada.objects.filter(
                us=us_id,
            )
            asigned = USAsignadaSerializer(asigned_query, many=True).data
            return asigned[0]["usuario"] if len(asigned) > 0 else None

        for us in us_list:

            asigned_user_id = get_asigned_user(us["id"])
            if asigned_user_id:
                asigned_user = UsuarioSerializer(
                    Usuario.objects.get(id=asigned_user_id)
                ).data
                us.update({"asignado": asigned_user})

            else:
                us.update({"asignado": None})

        return JsonResponse(us_list, safe=False)

    elif request.method == "POST":
        # Agregar US al sprint
        if not us_id:
            return HttpResponseNotFound("us_id no encontrado")

        try:
            us = US.objects.get(id=us_id)
            serializer = USSerializer(us, data={"sprint": sprint_id}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400, safe=False)

        except US.DoesNotExist:
            return HttpResponseNotFound("us no encontrado")

    elif request.method == "DELETE":
        # Remover US del sprint
        if not us_id:
            return HttpResponseNotFound("us_id no encontrado")

        try:
            us = US.objects.get(id=us_id)
            serializer = USSerializer(us, data={"sprint": None}, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400, safe=False)

        except US.DoesNotExist:
            return HttpResponseNotFound("us no encontrado")


def sprints_activar(request, proyect_id, sprint_id):
    """Activa el sprint"""

    try:
        proyecto = Proyecto.objects.get(id=proyect_id)
    except Proyecto.DoesNotExist:
        return HttpResponseNotFound()

    try:
        sprint = Sprint.objects.get(id=sprint_id)
    except Sprint.DoesNotExist:
        return HttpResponseNotFound()

    if request.method == "POST":
        sp = Sprint.objects.get(id=sprint_id)

        def get_us_count(sprint_id):
            uss = US.objects.filter(proyecto=proyecto, sprint=sprint_id)
            serializer = USSerializer(uss, many=True)
            us_list = serializer.data
            conteo = None
            for us in us_list:
                if us["estimacionSM"] != None or us["estimacionesDev"] != None:
                    if conteo == None:
                        conteo = 0
                    conteo += (us["estimacionSM"]) + (us["estimacionesDev"])
                else:
                    conteo = None
                    break

            return conteo, len(us_list)

        if not get_us_count(sprint_id)[0]:
            return HttpResponseBadRequest("No posible")

        serializer = SprintSerializer(sp, data={"activo": True}, partial=True)
        # pasar todos los us a pendiente

        us_list = US.objects.filter(sprint=sprint_id)

        try:
            for us in us_list:
                us_seri = USSerializer(us, data={"estado": 0}, partial=True)
                us_seri.is_valid(raise_exception=True)
                us_seri.save()
        except Exception as e:
            print(e)
            return JsonResponse("Falta", status=400, safe=False)

        # estimacion de horas
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400, safe=False)

    return HttpResponseBadRequest("Falta sprint_id")


def sprints_desactivar(request, proyect_id, sprint_id):
    """Desactiva el sprint"""

    try:
        proyecto = Proyecto.objects.get(id=proyect_id)
    except Proyecto.DoesNotExist:
        return HttpResponseNotFound()

    try:
        sprint = Sprint.objects.get(id=sprint_id)
    except Sprint.DoesNotExist:
        return HttpResponseNotFound()

    if request.method == "POST":
        us = Sprint.objects.get(id=sprint_id)
        serializer = SprintSerializer(us, data={"activo": False}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400, safe=False)

    return HttpResponseBadRequest("Falta sprint_id")


def user_stories_asignar(request, proyect_id, us_id, user_id=None):
    """Metodos p/ asignar un miembro a una US del proyecto"""

    if request.method == "POST":
        try:
            usAsignadaList = USAsignada.objects.filter(us=us_id)
            if len(usAsignadaList) > 0:
                # Cambia el usuario asignado
                usAsignada = usAsignadaList[0]
                seri = USAsignadaSerializer(
                    usAsignada,
                    data={
                        "usuario": user_id,
                    },
                    partial=True,
                )
            else:
                # Crea una nueva asignacion
                seri = USAsignadaSerializer(data={"usuario": user_id, "us": us_id})

            seri.is_valid(raise_exception=True)
            seri.save()
            return JsonResponse(seri.data, status=201)
        except:
            return JsonResponse(seri.errors, status=400, safe=False)

    elif request.method == "DELETE":
        try:
            usAsignadaList = USAsignada.objects.filter(us=us_id)
            for usAsig in usAsignadaList:
                usAsig.delete()

            return JsonResponse(True, status=204, safe=False)
        except:
            return JsonResponse(False, status=400, safe=False)


def usuarios_admin(request, user_id):

    if request.method == "POST":

        rol = Usuario.objects.get(id=user_id)

        serializer = UsuarioSerializer(rol, data={"proy_admin": True}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400, safe=False)
    elif request.method == "DELETE":
        rol = Usuario.objects.get(id=user_id)

        serializer = UsuarioSerializer(rol, data={"proy_admin": False}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400, safe=False)
