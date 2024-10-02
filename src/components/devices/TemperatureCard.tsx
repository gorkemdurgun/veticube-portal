import { Tooltip } from "antd";
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
            <XAxis dataKey="date" />
            <YAxis />
            {/* <Tooltip /> */}
            <Legend />
            <Line type="monotone" dataKey="t" stroke="#059669" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ComponentCard>
  );
};

export default TemperatureCard;
