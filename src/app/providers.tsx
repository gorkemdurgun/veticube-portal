"use client";

import { ApolloProvider } from "@apollo/client";

import AppApolloWSProvider from "@/providers/app_apollo_ws_provider";
import AppAuthProvider from "@/providers/app_auth_provider";
import AppConfigProvider from "@/providers/app_config_provider";
import AppI18Provider from "@/providers/app_i18_provider";
import AppReduxProvider from "@/providers/app_redux_provider";
import { apolloClient } from "@/services/apollo/client";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppReduxProvider>
      <AppApolloWSProvider>
        <ApolloProvider client={apolloClient}>
          <AppConfigProvider>
            <AppI18Provider>
              <AppAuthProvider>{children}</AppAuthProvider>
            </AppI18Provider>
          </AppConfigProvider>
        </ApolloProvider>
      </AppApolloWSProvider>
    </AppReduxProvider>
  );
}
