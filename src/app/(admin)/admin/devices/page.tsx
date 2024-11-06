"use client";

import { useState } from "react";

import { PiPlusSquareDuotone, PiDeviceTabletCameraBold as IoTIcon, PiCheckCircle as CompleteIcon } from "react-icons/pi";

import { useQuery } from "@apollo/client";
import { Breadcrumb, Card } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/hooks";
import { clinicQueries } from "@/services/apollo/query";

import { TranslatedText } from "@/components/common";
import CustomButton from "@/components/common/custom-button";
import { DeviceCard } from "@/components/devices/device-card";
import ActivateDeviceModal from "@/components/modals/devices/activate-device";

import type { BreadcrumbProps } from "antd";

const breadcrumbItems: BreadcrumbProps["items"] = [
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
  },
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="devices" />,
  },
];

const DevicesPage = () => {
  const router = useRouter();

  const { activeBranch } = useAppSelector((state) => state.app);
  const { loading, data: deviceAssignmentsData } = useQuery(clinicQueries.GetBranchDeviceAssignments, {
    skip: !activeBranch,
    variables: {
      branchId: activeBranch as string,
    },
  });

  const [activateModalVisible, setActivateModalVisible] = useState(false);

  return (
    <>
      <ActivateDeviceModal visible={activateModalVisible} onClose={() => setActivateModalVisible(false)} />
      <div className="w-full flex flex-col gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <div className="w-full flex items-center justify-between p-4 bg-white rounded-lg">
          <span className="text-2xl font-semibold">Devices</span>
          <CustomButton variant="neutral-faded" onClick={() => setActivateModalVisible(true)} icon={PiPlusSquareDuotone} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deviceAssignmentsData?.device_assignments?.map((deviceAssignment, index) => {
            return (
              <DeviceCard
                key={deviceAssignment.id}
                header={{
                  title: deviceAssignment.device_nickname,
                  icon: IoTIcon,
                  extra: (
                    <div className="flex gap-2 font-[500]">
                      <span className="text-sm text-gray-500">
                        {deviceAssignment.iot_device.device_type}
                        <span className="text-gray-400"> | {deviceAssignment.iot_device.device_model}</span>
                      </span>
                    </div>
                  ),
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full flex flex-row items-center gap-1 p-2 bg-gray-100 rounded-lg">
                    <span className="text-gray-500">Tedavideki Hasta:</span>
                    <span className="text-gray-800 font-semibold">Ares</span>
                    <div className="ml-auto flex gap-2">
                      <CustomButton variant="neutral-faded" icon={CompleteIcon} />
                    </div>
                  </div>
                </div>
              </DeviceCard>
            );
          })}
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
