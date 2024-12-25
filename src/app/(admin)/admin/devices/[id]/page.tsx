"use client";

import { useEffect, useState } from "react";

import { Breadcrumb, type BreadcrumbProps } from "antd";
import { useParams } from "next/navigation";

import { apolloWsClient } from "@/providers/app_apollo_ws_provider";
import { deviceSubscriptions } from "@/services/apollo/subscription";
import { convertDateTime } from "@/utils/timer";

import { TranslatedText } from "@/components/common";
import CustomButton from "@/components/common/custom-button";
import DeviceInfoCard from "@/components/devices/device-info-card";
import SensorOverview from "@/components/devices/SensorOverview";
import TemperatureCard from "@/components/devices/TemperatureCard";
import CommandLogsDrawer from "@/components/drawers/command-logs-drawer";

const breadcrumbItems: BreadcrumbProps["items"] = [
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="panel" />,
  },
  {
    title: <TranslatedText tPrefix="breadcrumb" tKey="devices" />,
  },
];

const dummyDatas = {
  temperature: [
    { t: 28, date: "2021-09-23 12:00:00" },
    { t: 27, date: "2021-09-23 12:05:00" },
    { t: 27.8, date: "2021-09-23 12:10:00" },
    { t: 28, date: "2021-09-23 12:13:00" },
    { t: 28.2, date: "2021-09-23 12:15:00" },
    { t: 28.1, date: "2021-09-23 12:30:00" },
  ],
};

const DeviceIdPage = () => {
  const { id: device_id } = useParams();
  const [dataArr, setDataArr] = useState<{ t: number; h: number; date: string }[] | undefined>([]);

  const [showCommandLogs, setShowCommandLogs] = useState(false);

  useEffect(() => {
    if (!device_id) return;
    const subscription = apolloWsClient.subscribe({
      query: deviceSubscriptions.GetDeviceData,
      variables: {
        deviceId: device_id as string,
      },
    });

    const subscriptionObserver = subscription.subscribe({
      next: ({ data }) => {
        const logs = data?.logs;
        const logsArr = logs?.map((log) => {
          return {
            h: log.data.h,
            t: log.data.t,
            date: convertDateTime(log.created_at),
          };
        });
        setDataArr(logsArr);
      },
      error: (error) => {
        console.log("Subscribe data error", error);
      },
    });

    return () => {
      subscriptionObserver.unsubscribe();
    };
  }, [device_id]);

  if (!device_id) {
    return <div>Device not found</div>;
  }

  return (
    <>
      <CommandLogsDrawer visible={showCommandLogs} onClose={() => setShowCommandLogs(false)} />
      <div className="w-full flex flex-col gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <DeviceInfoCard
          deviceId={device_id as string}
          onClickCommandLogs={() => setShowCommandLogs(true)}
          onClickSettings={() => console.log("Settings clicked")}
        />

        <SensorOverview temperature={30} humidity={40} oxygen={50} carbon={60} lambLevel={2} isIR={true} isUV={false} />
        <div className="w-full grid grid-cols-[3fr,2fr] gap-4">
          <div className="flex flex-col gap-4">
            <TemperatureCard
              /*
          temperatureData={dataArr?.map((data) => {
            return {
              t: data.t,
              date: data.date,
            };
          })}
        */
              temperatureData={dummyDatas.temperature}
            />
          </div>
          <div className="flex flex-col gap-4"></div>
        </div>
      </div>
    </>
  );
};

export default DeviceIdPage;
