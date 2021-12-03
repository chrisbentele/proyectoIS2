## @file misc.py
# @brief Funciones misceláneas

from ..models import US, RegistroHoras, USAsignada
from ..serializers import RegistroHorasSerializer, USAsignadaSerializer, USSerializer


def get_asigned_user(us_id):
    """!
    Adquiere el usuario que está asignado a cierta historia de usuario.
    @param us_id ID de la historia de usuario
    @returns
    """
    asigned_query = USAsignada.objects.filter(
        us=us_id,
    )
    asigned = USAsignadaSerializer(asigned_query, many=True).data
    return asigned[0]["usuario"] if len(asigned) > 0 else None


def get_us_count(proyect_id, sprint_id):
    """!
    Health check de los US en un sprint
    @param project_id El ID del proyecto de donde se encuentra el sprint.
    @param sprint_id El ID del sprint del cual se quiere la cantidad de US.
    """
    uss = US.objects.filter(proyecto=proyect_id, sprint=sprint_id)
    serializer = USSerializer(uss, many=True)
    us_list = serializer.data
    conteo = 0
    activable = True
    for us in us_list:
        us_asig = get_asigned_user(us["id"])

        if not us_asig:
            activable = False

        if us["estimacionSM"] != None and us["estimacionesDev"] != None:
            conteo += (us["estimacionSM"]) + (us["estimacionesDev"]) / 2
        else:
            activable = False

    if len(us_list) == 0:
        activable = False
    return conteo, len(us_list), activable


def get_horas_registradas_US(us_id):
    """
    Extrae los datos de las historias de usuario
    """
    rh = RegistroHoras.objects.filter(us=us_id)
    rh_list = RegistroHorasSerializer(rh, many=True).data
    horas = 0
    for rh in rh_list:
        horas += rh["horas"]

    return horas
