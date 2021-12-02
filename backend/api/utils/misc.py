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


class US_row:
    """
    Clase que representa una fila de la tabla de US
    """

    def __init__(
        self, us_id, us_name, asignado, prioridad, estado, estimacion, horas_registradas
    ):
        self.us_id = us_id
        self.us_name = us_name
        self.asignado = asignado
        self.prioridad = prioridad
        self.estado = estado
        self.estimacion = estimacion
        self.horas_registradas = horas_registradas

    def generate_html_row(self):
        """
        Genera una fila HTML para la tabla de US
        """
        return f"""
                <td>
                    {self.us_id}
                </td>
                <td>
                    {self.us_name}
                </td>
                <td>
                    {self.asignado}
                </td>
                <td>
                    {self.prioridad}
                </td>
                <td>
                    {self.estado}
                </td>
                <td>
                    {self.estimacion}
                </td>
                <td>
                    {self.horas_registradas}
                </td>
            """


def generate_table(US_row_list, reporte_name, sprint_name):
    """
    Recibe una lista de US_row y genera una tabla HTML
    """

    rows = ""
    for row in US_row_list:
        print(row)
        rows += row.generate_html_row()

    table = f"""
    <h1>
        Reporte de {reporte_name} - {sprint_name}
    </h1>
    <table>
        <style>
            table, th, td{{
            border: 1px solid black;
            border-collapse: collapse;
            padding: 5px;
            }}
        </style>
        <tr>
            <th>
                Id
            </th>
            <th>
                User Story
            </th>
            <th>
                Asignado
            </th>

            <th>
                Prioridad
            </th>
            <th>
                Estado
            </th>
            <th>
                Estimacion
            </th>
            <th>
                Horas Reg.
            </th>
        </tr>
        {rows}
    </table>
    """
    return table


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


def get_random_string():
    """
    Genera una cadena aleatoria de 8 caracteres
    """
    import random
    import string

    return "".join(
        random.choice(string.ascii_letters + string.digits) for _ in range(8)
    )
