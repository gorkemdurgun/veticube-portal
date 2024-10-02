"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { apolloWsClient } from "@/providers/app_apollo_ws_provider";
import { subscriptions } from "@/services/db";
import { convertTime } from "@/utils/timer";

import SensorOverview from "@/components/devices/SensorOverview";

const DeviceIdPage = () => {
  const { id: device_id } = useParams();
  const [dataArr, setDataArr] = useState<{ hum: number; temp: number }[] | undefined>([]);

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
            hum: log.data.h,
            temp: log.data.t,
            created_at: convertTime(log.created_at),
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
    <div className="w-full">
      <SensorOverview temperature={30} humidity={40} oxygen={50} carbon={60} lambLevel={2} isIR={true} isUV={false} />

      <div className="w-full h-96 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dataArr}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="created_at" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hum" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeviceIdPage;
