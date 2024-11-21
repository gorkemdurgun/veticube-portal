import { Tooltip } from "antd";
import dayjs from "dayjs";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line } from "recharts";

import { ComponentCard } from "../common";

type TemperatureCardProps = {
  temperatureData?: {
    t: number;
    date: string;
  }[];
};

const TemperatureCard: React.FC<TemperatureCardProps> = ({ temperatureData }) => {
  console.log("temperatureData", temperatureData);

  return (
    <ComponentCard title="Sıcaklık">
      <div className="w-full h-96 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={temperatureData}
            defaultShowTooltip={true}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(value) => dayjs(value).format("HH:mm")} interval={0} />
            <YAxis
            tickFormatter={(value) => `${value}°C`}
            />
            <Tooltip />
            <Legend 
             formatter={(value) => `Sıcaklık`}
            />
            <Line
              type="monotone"
              dataKey="t"
              stroke="#059669"
              strokeWidth={2}
              label={{ fill: "#059669", fontSize: 14, fontWeight: "bold", position: "top" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ComponentCard>
  );
};

export default TemperatureCard;
