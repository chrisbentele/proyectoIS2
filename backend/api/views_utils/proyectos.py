from api.serializers import (
    ProyectoSerializer,
    RolAsignadoSerializer,
    RolSerializer,
)


def crear_proyecto(data):
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
    # asigna el rol scrum mastes al miembro en la posicion 0
    rol_asignado_seri = RolAsignadoSerializer(
        data={
            "rol": scrum_rol.id,
            "usuario": data["scrumMasterId"],
            "proyecto": proy.id,
        }
    )
    rol_asignado_seri.is_valid(raise_exception=True)
    rol_asignado_seri.save(id=2)

    return proy_seri.data

    # return JsonResponse(proy_seri.errors, status=400, safe=False)
