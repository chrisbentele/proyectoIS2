import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import {
  LineChart,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";
import { getProxDias } from "../../util";
import { api } from "../../api";

export default function BurnDown({ registros, sprint }) {
  const [burndownData, setBurndownData] = useState([]);
  //console.log(sprint);
  useEffect(() => {
    console.log(sprint);
    if (
      sprint &&
      sprint?.sumaHorasAsignadas >= 0 &&
      sprint.estimacion &&
      sprint.activo &&
      sprint.fechaInicio
    ) {
      console.log("sprint", sprint);

      const asyncFoo = async () => {
        const progresoEstimadoPorDia =
          sprint.sumaHorasAsignadas / sprint.estimacion;
        console.log("progresoEstimadoPorDia", progresoEstimadoPorDia);
        console.log("sprint suma horas", sprint.sumaHorasAsignadas);

        let proxDias = getProxDias(sprint.fechaInicio, sprint.estimacion + 1);
        console.log(sprint.estimacion);
        const regHoras = await api.sprints
          .getRegistrosHoras({
            projectId: sprint.proyecto,
            spId: sprint.id,
          })
          .then((res) => res.data);

        let burningData = [];
        let horasRegistradas = 0;
        for (let dia = 0; dia < proxDias.length; dia++) {
          const fecha = proxDias[dia];
          // console.log(fecha);
          // console.log(regHoras.map((x) => x.fecha));
          const regHorasFecha = regHoras.filter((x) => x.fecha == fecha);
          // console.log(regHorasFecha);
          const horasRegistradasLocal = regHorasFecha
            .map((x) => x.horas)
            .reduce((actual, suma) => actual + suma, 0);
          horasRegistradas += horasRegistradasLocal;
          const p_est = progresoEstimadoPorDia * (dia + 1);
          console.log(p_est);
          console.log(sprint.sumaHorasAsignadas);
          burningData.push({
            dia: fecha,
            esperado:
              sprint.sumaHorasAsignadas -
              progresoEstimadoPorDia * (dia + 1) +
              progresoEstimadoPorDia * proxDias.length,
            restante:
              sprint.sumaHorasAsignadas +
              progresoEstimadoPorDia * proxDias.length -
              horasRegistradas,
          });
        }

        setBurndownData(burningData.sort(compare));
      };
      asyncFoo();
    }
  }, [sprint]);

  function compare(a, b) {
    if (a.fecha < b.fecha) {
      return -1;
    }
    if (a.fecha > b.fecha) {
      return 1;
    }
    return 0;
  }

  return (
    <Box width={"fit-content"}>
      <LineChart
        width={1000}
        height={500}
        data={burndownData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="dia" />
        <YAxis dataKey="restante" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line
          type="monotone"
          dataKey="restante"
          stroke="#ff7300"
          yAxisId={0}
          strokeWidth={3}
          connectNulls={true}
        />
        <Line
          type="monotone"
          dataKey="esperado"
          stroke="#4275f5"
          yAxisId={0}
          strokeWidth={3}
          connectNulls={true}
        />
      </LineChart>
    </Box>
  );
}
