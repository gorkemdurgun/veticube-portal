import { Card } from "antd";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { ComponentCard } from "../common";

type WeightHistory = {
  date: string;
  weight: number;
};
type Props = {
  weightHistory: WeightHistory[];
};

const Component: React.FC<Props> = ({ weightHistory }) => {
  return (
    <ComponentCard
      bodyClassName="h-64"
      header={{
        title: "Kilo Geçmişi",
      }}
    >
      
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart data={weightHistory}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="weight"
            fill="url(#colorUv)"
            stroke="#059669"
            strokeWidth={2}
            dot={{ fill: "#fff", strokeWidth: 2, r: 4 }}
          />
          <Area dataKey="range" fill="#000" stroke="#000" fillOpacity={0.2} strokeOpacity={0} />
          <XAxis hide dataKey="date" />
          <YAxis
            type="number"
            domain={[(dataMin: number) => (dataMin / 1.1).toFixed(1), (dataMax: number) => (dataMax * 1.1).toFixed(1)]}
            allowDataOverflow={false}
            tickFormatter={(value) => {
              return value + " kg";
            }}
            tickMargin={10}
          />
          <Tooltip
            labelFormatter={(value) => {
              return value.split("-").reverse().join("/");
            }}
            formatter={(value, name) => {
              let lblName = name === "range" ? "Önerilen Aralık" : "Aktif Kilo";
              let lblValue = value + " kg";

              if (Array.isArray(value)) {
                lblValue = value.map((v) => v + " kg").join(" - ");
              }

              return [lblValue, lblName];
            }}
          />
          {/* <Legend /> */}
        </AreaChart>
      </ResponsiveContainer>
    </ComponentCard>
  );
};

export const PatientWeightHistory = React.memo(Component);
