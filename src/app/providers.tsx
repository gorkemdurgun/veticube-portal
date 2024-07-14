"use client";

// import { AntdRegistry } from "@ant-design/nextjs-registry";

import AppConfigProvider from "@/providers/app_config_provider";
import AppI18Provider from "@/providers/app_i18_provider";
import AppAuthProvider from "@/providers/app_auth_provider";
import AppNhostProvider from "@/providers/app_nhost_provider";
import AppApolloProvicer from "@/providers/app_apollo_provider";
import AppQueryProvider from "@/providers/app_query_provider";
import AppReduxProvider from "@/providers/app_redux_provider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppReduxProvider>
      <AppNhostProvider>
        <AppApolloProvicer>
          <AppQueryProvider>
            <AppConfigProvider>
              <AppI18Provider>
                <AppAuthProvider>{children}</AppAuthProvider>
              </AppI18Provider>
            </AppConfigProvider>
          </AppQueryProvider>
        </AppApolloProvicer>
      </AppNhostProvider>
    </AppReduxProvider>
  );
}
