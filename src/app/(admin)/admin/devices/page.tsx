"use client";

import { useState } from "react";

import { PiPlusSquareDuotone } from "react-icons/pi";

import { useQuery } from "@apollo/client";
import { Breadcrumb, Card } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/hooks";
import { clinicQueries } from "@/services/apollo/query";

import { TranslatedText } from "@/components/common";
import CustomButton from "@/components/common/custom-button";
import { IotCard } from "@/components/devices/iot-card";
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {deviceAssignmentsData?.device_assignments?.map((item, index) => {
            return (
              <IotCard
                key={index}
                iot={{
                  nick_name: item.device_nickname,
                  type: item.iot_device.device_type,
                  model: item.iot_device.device_model,
                  serial_number: item.iot_device.serial_number,
                }}
                current_treatment={{
                  pet: {
                    name: "Rex",
                    owner_name: "John Doe",
                  },
                  treatment: {
                    reason: "Kısırlaştırma Operasyonu",
                    start_date: "2021-08-12T17:40:00Z",
                  },
                }}
              />
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
