"use client";

import { useRouter } from "next/navigation";

import { useCustomAppQuery } from "@/hooks";
import { queries } from "@/services/db";

import CustomButton from "@/components/common/custom-button";

const DevicesPage = () => {
  const router = useRouter();
  const { loading, data } = useCustomAppQuery({
    query: queries.device.GetUserDevices,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("data", data);

  return (
    <div className="w-full flex flex-col gap-4">
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
