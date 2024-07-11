"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider as ReduxProvider } from "react-redux";

import { persistor, store } from "@/redux/store";
import { AppConfigProvider } from "./config";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import apolloClient from "@/utils/apollo";
import { queryClient } from "@/utils/api";
import { NhostClient, NhostProvider, NhostProviderProps, useSignInEmailPassword } from "@nhost/react";
import { useEffect } from "react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nhost = new NhostClient({
    subdomain: "jsyvrxdasbzbovolkdhw",
    region: "eu-central-1",
    adminSecret: "s5MIprp,;gV'bOgbD%:hYw5G(Q(ca5oB",
  });

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            <NhostProvider nhost={nhost}>
              <AppConfigProvider>{children}</AppConfigProvider>
            </NhostProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
