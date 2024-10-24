"use client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

import { queries } from "@/services/db";

import CustomButton from "@/components/common/custom-button";
import ActivateDeviceModal from "@/components/modals/devices/activate-device";

const DevicesPage = () => {
  const router = useRouter();
  const { loading, data } = useQuery(queries.device.GetUserDevices);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("data", data);

  return (
    <div className="w-full flex flex-col gap-4">
      <ActivateDeviceModal visible={true} setVisible={() => {}} />
      {data?.devices.map((device, index) => {
        return (
          <div key={device.id} className="flex p-4 bg-gray-100 rounded-lg">
            <CustomButton onClick={() => router.push(`/admin/devices/${device.device_id}`)}>{device.device_id}</CustomButton>
          </div>
        );
      })}
    </div>
  );
};

export default DevicesPage;
