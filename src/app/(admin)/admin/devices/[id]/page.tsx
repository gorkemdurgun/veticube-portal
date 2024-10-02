"use client";

import { useEffect, useState } from "react";

import { t } from "i18next";
import { useParams } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { apolloWsClient } from "@/providers/app_apollo_ws_provider";
import { subscriptions } from "@/services/db";
import { convertDateTime, convertTime } from "@/utils/timer";

import SensorOverview from "@/components/devices/SensorOverview";
import TemperatureCard from "@/components/devices/TemperatureCard";

const DeviceIdPage = () => {
  const { id: device_id } = useParams();
  const [dataArr, setDataArr] = useState<{ t: number; h: number; date: string }[] | undefined>([]);

  useEffect(() => {
    if (!device_id) return;
    const subscription = apolloWsClient.subscribe({
      query: subscriptions.devices.getDeviceData,
      variables: {
        deviceId: device_id,
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
    <div className="w-full flex flex-col gap-4">
      <SensorOverview temperature={30} humidity={40} oxygen={50} carbon={60} lambLevel={2} isIR={true} isUV={false} />
      <div className="grid grid-cols-2 gap-4">
        <TemperatureCard
          temperatureData={dataArr?.map((data) => {
            return {
              t: data.t,
              date: data.date,
            };
          })}
        />
      </div>
    </div>
  );
};

export default DeviceIdPage;
