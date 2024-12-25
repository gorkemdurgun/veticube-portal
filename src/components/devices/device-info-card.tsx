import { PiDeviceTabletLight as DeviceIcon, PiClockClockwise as CommandHistoryIcon, PiGear as SettingsIcon } from "react-icons/pi";

import { useQuery } from "@apollo/client";
import { Skeleton } from "antd";

import { deviceQueries } from "@/services/apollo/query";

import CustomButton from "../common/custom-button";

type DeviceInfoCardProps = {
  deviceId: string;
  onClickCommandLogs: () => void;
  onClickSettings: () => void;
};

const DeviceInfoCard = ({ deviceId, onClickCommandLogs, onClickSettings }: DeviceInfoCardProps) => {
  const { data: deviceInfoData, loading: deviceInfoLoading } = useQuery(deviceQueries.GetIotDeviceById, {
    variables: {
      id: deviceId,
    },
  });

  if (deviceInfoLoading) {
    return (
      <div className="w-full flex items-center gap-2 p-4 bg-white rounded-lg">
        <Skeleton.Avatar active size="large" shape="circle" />
        <Skeleton.Input style={{ width: 200 }} active size="large" />
      </div>
    );
  }

  return (
    <div className="w-full flex items-center gap-2 p-4 bg-white rounded-lg">
      <DeviceIcon className="w-12 h-12 text-gray-500" />
      <div className="flex flex-col gap-1">
        <h5 className="text-md font-semibold text-gray-800">{deviceInfoData?.device.assignments[0].device_nickname}</h5>
        <span className="text-sm text-gray-600">
          {deviceInfoData?.device.device_type}
          <span className="text-gray-400"> {deviceInfoData?.device.device_model}</span>
        </span>
      </div>
      <div className="ml-auto">
        <div className="flex gap-3">
          <CustomButton variant="neutral-faded" icon={CommandHistoryIcon} onClick={onClickCommandLogs}>
            Komut Geçmişi
          </CustomButton>
          <CustomButton variant="neutral-faded" icon={SettingsIcon} onClick={onClickSettings}>
            Ayarlar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfoCard;
