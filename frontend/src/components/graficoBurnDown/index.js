import React from "react";
import { Box } from "@chakra-ui/layout";
import {
  LineChart,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";

export default function BurnDown({ burndownData }) {
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
        />
      </LineChart>
    </Box>
  );
}
