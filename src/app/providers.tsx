"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/redux/store";
import { AppConfigProvider } from "./config";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider store={store}>
      <AppConfigProvider>
        <AntdRegistry>{children}</AntdRegistry>
      </AppConfigProvider>
    </ReduxProvider>
  );
}
