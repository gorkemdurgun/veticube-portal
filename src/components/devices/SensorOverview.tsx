import dayjs from "dayjs";
import Image from "next/image";

import { svg } from "@/assets";

import { ComponentCard } from "../common";

type SensorOverviewProps = {
  temperature: number;
  humidity: number;
  oxygen: number;
  carbon: number;
  lambLevel: number;
  isIR: boolean;
  isUV: boolean;
};

const SensorOverview: React.FC<SensorOverviewProps> = ({ temperature, humidity, oxygen, carbon, lambLevel, isIR, isUV }) => {
  return (
    <ComponentCard className="w-full" bodyClassName="flex flex-col gap-2">
      <div className="flex items-end justify-between p-2 rounded-lg bg-gray-50/50">
        <h5 className="text-sm text-gray-500">
          <span className="mr-2 text-md text-blue-900">{dayjs().format("HH:mm")}</span>
          {`(Son Güncelleme)`}
        </h5>
        <span className="text-sm text-gray-500">{dayjs().format("DD/MM/YYYY")}</span>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center justify-center p-4 bg-gradient-to-t from-blue-50 to-white rounded-lg">
          <div className="relative w-16 h-16">
            <Image src={svg.pack4.TemperatureIcon} alt="Temperature Icon" layout="fill" objectFit="contain" />
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-800">{temperature}°C</p>
            <p className="text-sm text-gray-500">Temperature</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-gradient-to-t from-blue-50 to-white rounded-lg">
          <div className="relative w-16 h-16">
            <Image src={svg.pack4.HumidityIcon} alt="Humidity Icon" layout="fill" objectFit="contain" />
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-800">{humidity}%</p>
            <p className="text-sm text-gray-500">Humidity</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-gradient-to-t from-blue-50 to-white rounded-lg">
          <div className="relative w-16 h-16">
            <Image src={svg.pack4.OxygenIcon} alt="Oxygen Icon" layout="fill" objectFit="contain" />
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-800">{oxygen}%</p>
            <p className="text-sm text-gray-500">Oxygen</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-gradient-to-t from-blue-50 to-white rounded-lg">
          <div className="relative w-16 h-16">
            <Image src={svg.pack4.CarbonIcon} alt="Carbon Icon" layout="fill" objectFit="contain" />
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-800">{carbon}%</p>
            <p className="text-sm text-gray-500">Carbon</p>
          </div>
        </div>
      </div>
      {/* <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4"></div> */}
    </ComponentCard>
  );
};

export default SensorOverview;
