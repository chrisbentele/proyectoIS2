class US_table:
    """
    Clase base para generar una tabla de US
    """

    def __init__(self, reporte_name, headers):
        self.reporte_name = reporte_name
        self.headers = headers
        self.rows = []

    def __generate_html_cell(self, text):
        return "<td>{}</td>".format(text)

    def __generate_html_row(self, row):
        return f"""
        <tr>
            {"".join([self.__generate_html_cell(cell) for cell in row])}
        </tr>
        """

    def add_row(self, row):
        self.rows.append(row)

    def __generate_html_header(self):
        return self.__generate_html_row(self.headers)

    def __generate_html_body(self):
        return "".join([self.__generate_html_row(row) for row in self.rows])

    def _generate_html_table(self):
        """(solo html) Method to generate the html table"""
        return f"""
        <h1>{self.reporte_name}</h1>
        <table>
            <style>
                table, th, td{{
                border: 1px solid black;
                border-collapse: collapse;
                padding: 5px;
                }}
            </style>
            {self.__generate_html_header()}
            {self.__generate_html_body()}
        </table>
        """

    def generate_pdf(self) -> str:
        """Method to generate a pdf file from the html generated

        Returns:
            str -- the path of the pdf file
        """
        import os
        import pdfkit

        # create temp folder if doesnt exists
        curr_dir = os.path.dirname(__file__)
        temp_dir = os.path.join(curr_dir, "temp")
        os.path.exists(temp_dir) or os.mkdir(temp_dir)

        # generate a random name for the pdf file
        import random
        import string

        rand_str = "".join(
            random.choice(string.ascii_letters + string.digits) for _ in range(32)
        )
        file_name = f"reporte_{rand_str}.pdf"

        # define de path for the pdf file
        pdf_path = os.path.join(temp_dir, file_name)

        # generate the pdf file
        res = pdfkit.from_string(
            self._generate_html_table(),
            pdf_path,
        )
        if res:
            return pdf_path


class Product_Backlog_table(US_table):
    """
    Clase que representa una tabla de los US en un Sprint
    """

    def __init__(self, reporte_name=""):
        super().__init__(
            reporte_name=reporte_name or "Reporte de US del Product Backlog",
            headers=[
                "ID",
                "Nombre",
                "Estado",
            ],
        )

    def add_row(
        self,
        us_id,
        us_name,
        estado,
    ):
        row = [
            us_id,
            us_name,
            estado,
        ]
        return super().add_row(row)


class Sprint_Backlog_table(US_table):
    """
    Clase que representa una tabla de los US en un Sprint
    """

    def __init__(self, reporte_name=""):
        super().__init__(
            reporte_name=reporte_name or "Reporte de US por sprint",
            headers=[
                "ID",
                "Nombre",
                "Estado",
                "Estimación",
                "Horas trabajadas",
            ],
        )

    def add_row(
        self,
        us_id,
        us_name,
        estado,
        estimacion,
        horas_trabajadas,
    ):
        row = [
            us_id,
            us_name,
            estado,
            estimacion,
            horas_trabajadas,
        ]
        return super().add_row(row)


class US_Prioridad_table(US_table):
    """
    Clase que representa una fila de la tabla de US
    """

    def __init__(self, reporte_name=""):
        super().__init__(
            reporte_name=reporte_name or "Reporte de US por prioridad",
            headers=[
                "ID",
                "Nombre",
                "Prioridad",
                "Asignado",
                "Horas Trabajadas",
            ],
        )

    def add_row(self, us_id, us_name, prioridad, asignado, horas_trabajadas):
        new_row = [
            us_id,
            us_name,
            prioridad,
            asignado,
            horas_trabajadas,
        ]

        if len(self.rows) == 0:
            return super().add_row(new_row)

        # Comparar la prioridad de la nueva fila con las filas existentes
        # Si la nueva fila es mayor, agregarla al frente
        for us_row in self.rows:
            if prioridad >= us_row[2]:
                self.rows.insert(self.rows.index(us_row), new_row)
                break
        else:
            # Si no se encontró una fila con mayor prioridad, agregarla al final
            return super().add_row(new_row)
