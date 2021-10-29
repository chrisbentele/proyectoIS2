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
      console.log("progresoEstimadoPorDia", progresoEstimadoPorDia);
      console.log("sprint suma horas", sprint.sumaHorasAsignadas);
      setBurndownData(
        [
          {
            dia: "2021-10-28",
            esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 1,
            restante: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 1,
          },
          {
            dia: "2021-10-27",
            esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 2,
            restante:
              sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 2 - 4,
          },
          {
            dia: "2021-10-24",
            esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 3,
            //   restante: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 3 - 2,
          },
          {
            dia: "2021-10-23",
            esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 4,
            //   restante: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 3 - 2,
          },
          {
            dia: "2021-10-22",
            esperado: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 5,
            //   restante: sprint.sumaHorasAsignadas - progresoEstimadoPorDia * 5 - 2,
          },
        ].sort(compare)
      );
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
      backgroundColor="#ffffff"
      borderWidth={3}
      borderColor={"#9c9c9c"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"fit-content"}
      marginLeft={"auto"}
    >
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
