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
    <ComponentCard
      className="w-full"
      bodyClassName="flex flex-col gap-4"
      title={
        <div className="flex items-center justify-between">
          <h2 className="text-md font-semibold text-green-600">Son Güncellenen Veriler</h2>
          <span className="text-xs font-normal text-gray-500">{`${dayjs().format("HH:mm")} (Son Güncelleme)`}</span>
        </div>
      }
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-t from-gray-50 to-white rounded-lg">
          <div className="relative w-8 h-8">
            <Image src={svg.pack4.TemperatureIcon} alt="Temperature Icon" layout="fill" objectFit="contain" />
          </div>
          <div className="text-center">
            <p className="text-md font-semibold text-gray-800">{temperature}°C</p>
            <p className="text-xs text-gray-500">Temperature</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-t from-gray-50 to-white rounded-lg">
          <div className="relative w-8 h-8">
            <Image src={svg.pack4.HumidityIcon} alt="Humidity Icon" layout="fill" objectFit="contain" />
          </div>
          <div className="text-center">
            <p className="text-md font-semibold text-gray-800">{humidity}%</p>
            <p className="text-xs text-gray-500">Humidity</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-t from-gray-50 to-white rounded-lg">
          <div className="relative w-8 h-8">
            <Image src={svg.pack4.OxygenIcon} alt="Oxygen Icon" layout="fill" objectFit="contain" />
          </div>
          <div className="text-center">
            <p className="text-md font-semibold text-gray-800">{oxygen}%</p>
            <p className="text-xs text-gray-500">Oxygen</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-t from-gray-50 to-white rounded-lg">
          <div className="relative w-8 h-8">
            <Image src={svg.pack4.CarbonIcon} alt="Carbon Icon" layout="fill" objectFit="contain" />
          </div>
          <div className="text-center">
            <p className="text-md font-semibold text-gray-800">{carbon}%</p>
            <p className="text-xs text-gray-500">Carbon</p>
          </div>
        </div>
      </div>
      {/* <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4"></div> */}
    </ComponentCard>
  );
};

export default SensorOverview;
