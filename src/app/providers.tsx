"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider as ReduxProvider } from "react-redux";

import { persistor, store } from "@/redux/store";
import { AppConfigProvider } from "./config";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";

import apolloClient from "@/utils/apollo";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <AppConfigProvider>{children}</AppConfigProvider>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
