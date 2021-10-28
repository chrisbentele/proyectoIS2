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

export default function BurnDown({ registros, sprint }) {
  const [burndownData, setBurndownData] = useState([]);
  console.log(sprint);
  useEffect(() => {
    if (sprint && sprint.sumaHorasAsignadas && sprint.estimacion) {
      console.log("sprint", sprint);
      const progresoEstimadoPorDia =
        sprint.sumaHorasAsignadas / sprint.estimacion;
      console.log(progresoEstimadoPorDia);
      setBurndownData([
        {
          dia: 1,
          esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 1,
          restante: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 1,
        },
        {
          dia: 2,
          esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 2,
          restante:
            sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 2 - 0.1,
        },
        {
          dia: 3,
          esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 3,
          //   restante: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 3 - 2,
        },
        {
          dia: 4,
          esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 4,
          //   restante: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 3 - 2,
        },
        {
          dia: 5,
          esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 5,
          //   restante: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 5 - 2,
        },
      ]);
    }
  }, [sprint]);

  return (
    <Box backgroundColor="#000000">
      <LineChart
        width={1000}
        height={500}
        data={burndownData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="dia" />
        <YAxis dataKey="esperado" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line
          type="monotone"
          dataKey="restante"
          stroke="#ff7300"
          yAxisId={0}
          strokeWidth={3}
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
