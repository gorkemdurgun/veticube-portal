"use client";

import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { apolloWsClient } from "@/providers/app_apollo_ws_provider";
import { subscriptions } from "@/services/db";

const DeviceIdPage = () => {
  const [dataArr, setDataArr] = useState<{ hum: number; temp: number }[] | undefined>([]);

  // 2024-10-01T16:06:35.819703+00:00 to local time like 19:06
  const convertTime = (time: string) => {
    return dayjs(time).format("HH:mm");
  };

  useEffect(() => {
    const subscription = apolloWsClient.subscribe({
      query: subscriptions.devices.getDeviceData,
    });

    // t

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
  }, []);

  return (
    <div>
      <h1>DeviceIdPage</h1>

      <div>
        <h2>Logs</h2>
        <ul>
          {dataArr?.map((data, index) => (
            <li key={index}>{`Hum: ${data.hum}, Temp: ${data.temp}`}</li>
          ))}
        </ul>
      </div>

      <div className="w-[500px] h-96 mt-8">
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
