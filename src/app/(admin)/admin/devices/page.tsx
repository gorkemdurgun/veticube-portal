"use client";

import { useState } from "react";

import { PiPlus as AddIcon, PiClockClockwise as WaitingIcon } from "react-icons/pi";

import { useQuery } from "@apollo/client";
import { Breadcrumb, Card, Tag } from "antd";
import dayjs from "dayjs";
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

  const { data: branchDeviceAssignmentRequests } = useQuery(clinicQueries.GetBranchDeviceAssignmentRequests);
  const { loading, data: deviceAssignmentsData } = useQuery(clinicQueries.GetBranchDeviceAssignments, {
    skip: !activeBranch,
    variables: {
      branchId: activeBranch as string,
    },
  });

  const [activateModalVisible, setActivateModalVisible] = useState(false);

  console.log("deviceAssignmentsData", deviceAssignmentsData);

  return (
    <>
      <ActivateDeviceModal visible={activateModalVisible} onClose={() => setActivateModalVisible(false)} />
      <div className="w-full flex flex-col gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <div className="w-full flex items-center justify-between p-4 bg-white rounded-lg">
          <span className="text-2xl font-semibold">Devices</span>
          <CustomButton variant="neutral-faded" onClick={() => setActivateModalVisible(true)} icon={AddIcon}>
            Add Device
          </CustomButton>
        </div>

        {/* Cihaz ve Şube Eşleştirme İstekleri */}
        {branchDeviceAssignmentRequests?.branch_device_assignment_requests &&
          branchDeviceAssignmentRequests?.branch_device_assignment_requests.length > 0 && (
            <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
              <h5 className="text-md">Bekleyen Eşleştirme İstekleri</h5>
              <div className="max-h-64 overflow-y-auto flex flex-col gap-2">
                {branchDeviceAssignmentRequests?.branch_device_assignment_requests?.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
                      <span className="text-md font-semibold">{item.device_serial_number}</span>
                      {!item.is_assigned && (
                        <Tag className="inline-flex gap-2 items-center" icon={<WaitingIcon />} color="orange">
                          Firmadan Onay Bekliyor
                        </Tag>
                      )}
                      <span className="ml-auto text-gray-400">{dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* Atanmış Cihazlar */}
        {!deviceAssignmentsData?.device_assignments ||
          (deviceAssignmentsData?.device_assignments.length === 0 &&
            branchDeviceAssignmentRequests?.branch_device_assignment_requests.length === 0 && (
              <Card className="p-4 text-center bg-gray-100 rounded-lg">
                <span className="text-gray-800">
                  Henüz hiç cihaz atanmamış.
                  <br />
                  <span className="text-sm font-bold">Cihaz eklemek için sağ üstteki Add Device butonuna tıklayınız.</span>
                </span>
              </Card>
            ))}
        {deviceAssignmentsData?.device_assignments && deviceAssignmentsData?.device_assignments.length > 0 && (
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
                  current_treatment={
                    undefined /*{
                    pet: {
                      name: "Rex",
                      owner_name: "John Doe",
                    },
                    treatment: {
                      reason: "Kısırlaştırma Operasyonu",
                      start_date: "2021-08-12T17:40:00Z",
                    },
                  }*/
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default DevicesPage;
