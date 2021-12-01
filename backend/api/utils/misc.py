## @file misc.py
# @brief Funciones misceláneas

from ..models import US, USAsignada
from ..serializers import USAsignadaSerializer, USSerializer


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


def generate_table(data_list):
    """
    Recibe una lista de objetos y genera una tabla HTML
    """

    rows = ""
    for row in data_list:
        print(row)
        rows += f"""
            <tr>
                <td style="border: 1px solid black">
                    {row["us_id"]}
                </td>
                <td style="border: 1px solid black">
                    {row["us_name"]}
                </td>
                <td style="border: 1px solid black">
                    {row["asignado"]}
                </td>
                <td style="border: 1px solid black">
                    {row["prioridad"]}
                </td>
                <td style="border: 1px solid black">
                    {row["estado"]}
                </td>
                <td style="border: 1px solid black">
                    {row["estimacion"]}
                </td>
                <td style="border: 1px solid black">
                    {row["horas_registradas"]}
                </td>

            </tr>
        """
    table = f"""
    <table>
        <style>
            table, th, td {{
            border: 1px solid black;
            border-collapse: collapse;
            padding: 5px;
            }}
        </style>
        <tr>
            <th style="border: 1px solid black">
                Id
            </th>
            <th style="border: 1px solid black">
                User Story
            </th>
            <th style="border: 1px solid black">
                Asignado
            </th>

            <th style="border: 1px solid black">
                Prioridad
            </th>
            <th style="border: 1px solid black">
                Estado
            </th>
            <th style="border: 1px solid black">
                Estimacion
            </th>
            <th style="border: 1px solid black">
                Horas Registradas
            </th>
        </tr>
        {rows}
    </table>
    """
    return table


def generate_table_proyecto(data_list):
    """
    Recibe una lista de objetos y genera una tabla HTML
    """

    rows = ""
    for row in data_list:
        print(row)
        rows += f"""
            <tr>
                <td style="border: 1px solid black">
                    {row["us_id"]}
                </td>
                <td style="border: 1px solid black">
                    {row["us_name"]}
                </td>
                <td style="border: 1px solid black">
                    {row["estado"]}
                </td>
            </tr>
        """
    table = f"""
    <table>
        <style>
            table, th, td {{
            border: 1px solid black;
            border-collapse: collapse;
            padding: 5px;
            }}
        </style>
        <tr>
            <th style="border: 1px solid black">
                Id
            </th>
            <th style="border: 1px solid black">
                User Story
            </th>
            <th style="border: 1px solid black">
                Horas
            </th>
            <th style="border: 1px solid black">
                Mensaje
            </th>
        </tr>
        {rows}
    </table>
    """
    return table
