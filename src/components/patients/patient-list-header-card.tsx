import dayjs from "dayjs";
import Image from "next/image";
import { IconType } from "react-icons";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

import CustomButton from "@/components/common/custom-button";
type Props = {
  className?: string;
  image: string;
  label: string;
  count: number;
  button?: {
    icon: IconType;
    onClick: () => void;
  };
  chartData?: {
    date: string;
    value: number;
  }[];
};

const PatientListHeaderCard = ({ className, image, label, count, button, chartData }: Props) => {
  return (
    <div className={`grid grid-cols-2 gap-4 pl-2 p-4 rounded-md bg-white shadow-basic ${className || ""}`}>
      <div className="flex items-center justify-start gap-4 ">
        <Image src={image} width={64} height={64} alt="Active Patients" />
        <div className="flex flex-col items-start gap-1">
          <h4 className="text-sm text-gray-500 whitespace-nowrap">{label}</h4>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-semibold">{count}</span>
            {button && <CustomButton variant="neutral-faded" icon={button.icon} onClick={button.onClick} />}
          </div>
        </div>
      </div>
      {chartData && (
        <div className="ml-auto h-16 w-0 sm:w-48 lg:w-32">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <Line dot={false} type="bump" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              <Tooltip
                position={{ y: 40 }}
                labelFormatter={(label, payload) => dayjs(payload[0]?.payload?.date).format("DD/MM/YYYY")}
                formatter={(value: number) => [value, "Registered patients"]}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PatientListHeaderCard;
