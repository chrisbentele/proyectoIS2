from ..models import US, USAsignada
from ..serializers import USAsignadaSerializer, USSerializer


def get_asigned_user(us_id):

    asigned_query = USAsignada.objects.filter(
        us=us_id,
    )
    asigned = USAsignadaSerializer(asigned_query, many=True).data
    return asigned[0]["usuario"] if len(asigned) > 0 else None


def get_us_count(proyect_id, sprint_id):
    """Health check de los US en un sprint"""
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
