"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/redux/store";

import langTR from "@/localization/tr_TR";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider store={store}>
      <ConfigProvider locale={langTR}>
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
    </ReduxProvider>
  );
}
