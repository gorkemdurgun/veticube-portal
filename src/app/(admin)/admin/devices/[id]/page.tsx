"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { apolloWsClient } from "@/providers/app_apollo_ws_provider";
import { deviceSubscriptions } from "@/services/apollo/subscription";
import { convertDateTime } from "@/utils/timer";

import CommandLogs from "@/components/devices/CommandLogs";
import SensorOverview from "@/components/devices/SensorOverview";
import TemperatureCard from "@/components/devices/TemperatureCard";

const DeviceIdPage = () => {
  const { id: device_id } = useParams();
  const [dataArr, setDataArr] = useState<{ t: number; h: number; date: string }[] | undefined>([]);

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
    <div className="w-full grid grid-cols-[3fr,2fr] gap-4">
      <div className="flex flex-col gap-4">
        <TemperatureCard
          temperatureData={dataArr?.map((data) => {
            return {
              t: data.t,
              date: data.date,
            };
          })}
        />
      </div>
      <div className="flex flex-col gap-4">
        <SensorOverview temperature={30} humidity={40} oxygen={50} carbon={60} lambLevel={2} isIR={true} isUV={false} />
        <CommandLogs />
      </div>
    </div>
  );
};

export default DeviceIdPage;
