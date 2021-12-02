import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/layout";
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
  useEffect(() => {
    if (
      sprint &&
      sprint?.sumaHorasAsignadas >= 0 &&
      sprint.estimacion &&
      sprint.fechaInicio
    ) {
      const asyncFoo = async () => {
        const progresoEstimadoPorDia =
          sprint.sumaHorasAsignadas / sprint.estimacion;

        let proxDias = getProxDias(sprint.fechaInicio, sprint.estimacion);
        const regHoras = await api.sprints
          .getRegistrosHoras({
            projectId: sprint.proyecto,
            spId: sprint.id,
          })
          .then((res) => res.data);

        let burningData = [];
        burningData.push({
          dia: proxDias[0],
          esperado: sprint.sumaHorasAsignadas,
          restante: sprint.sumaHorasAsignadas,
        });
        let horasRegistradas = 0;
        for (let dia = 1; dia < proxDias.length; dia++) {
          const fecha = proxDias[dia];
          const regHorasFecha = regHoras.filter((x) => x.fecha == fecha);
          if (!regHorasFecha.length) {
            burningData.push({
              dia: fecha,
              esperado:
                sprint.sumaHorasAsignadas - progresoEstimadoPorDia * dia,
              restante: null,
            });
          } else {
            const horasRegistradasLocal = regHorasFecha
              .map((x) => x.horas)
              .reduce((actual, suma) => actual + suma, 0);
            horasRegistradas += horasRegistradasLocal;
            burningData.push({
              dia: fecha,
              esperado:
                sprint.sumaHorasAsignadas - progresoEstimadoPorDia * dia,
              restante: sprint.sumaHorasAsignadas - horasRegistradas,
            });
          }
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
    <Box
      width={"fit-content"}
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Heading size="lg">Grafico Burndown</Heading>
      <LineChart
        width={1100}
        height={550}
        data={burndownData}
        margin={{ top: 5, right: 20, left: 10, bottom: 15 }}
      >
        <XAxis
          dataKey="dia"
          label={{ value: "Dia", position: "insideBottom", offset: -10 }}
          minTickGap={10}
        />
        <YAxis
          label={{ value: "Horas", angle: -90, position: "insideLeft" }}
          padding={{ left: 1000 }}
        />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line
          type="monotone"
          dataKey="restante"
          stroke="#ff7300"
          yAxisId={0}
          strokeWidth={3}
          connectNulls={true}
          dot={{ stroke: "black", strokeWidth: 3 }}
        />
        <Line
          type="monotone"
          dataKey="esperado"
          stroke="#4275f5"
          yAxisId={0}
          strokeWidth={3}
          connectNulls={true}
          dot={{ stroke: "black", strokeWidth: 3 }}
        />
      </LineChart>
    </Box>
  );
}
