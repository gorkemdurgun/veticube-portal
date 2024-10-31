"use client";

import { useState } from "react";

import { PiPlusSquareDuotone } from "react-icons/pi";

import { Card } from "antd";
import { useRouter } from "next/navigation";

import CustomButton from "@/components/common/custom-button";
import ActivateDeviceModal from "@/components/modals/devices/activate-device";

const DevicesPage = () => {
  const router = useRouter();
  // const { loading, data } = useQuery(queries.device.GetUserDevices);

  const [activateModalVisible, setActivateModalVisible] = useState(false);

  return (
    <>
      <ActivateDeviceModal visible={activateModalVisible} onClose={() => setActivateModalVisible(false)} />
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center justify-between p-4 bg-white rounded-lg">
          <span className="text-2xl font-semibold">Devices</span>
          <CustomButton variant="neutral-faded" onClick={() => setActivateModalVisible(true)} icon={PiPlusSquareDuotone} />
        </div>
        {/* {data?.devices.map((device, index) => {
        return (
          <div key={device.id} className="flex p-4 bg-gray-100 rounded-lg">
            <CustomButton onClick={() => router.push(`/admin/devices/${device.device_id}`)}>{device.device_id}</CustomButton>
          </div>
        );
      })} */}
      </div>
    </>
  );
};

export default DevicesPage;
