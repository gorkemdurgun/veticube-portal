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

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            <AppConfigProvider>{children}</AppConfigProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
