import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import { store } from "@/redux/store";

export const apolloWsClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new WebSocketLink({
    uri: "ws://35.158.95.5:8080/v1/graphql",
    options: {
      lazy: true,
      connectionCallback: (error) => {
        if (error) {
          console.error("Failed to connect to the server", error);
        } else {
          console.log("Connected to the server");
        }
      },
      // reconnect: true,
      connectionParams: {
        headers: {
          // "x-hasura-admin-secret": adminSecret,
        },
      },
    },
  }),
});

// set connectionParams for apolloWsClient with store
apolloWsClient.setLink(
  new WebSocketLink({
    uri: "ws://35.158.95.5:8080/v1/graphql",
    options: {
      connectionParams: () => {
        const state = store.getState();
        const token = state.auth?.session?.idToken?.jwtToken;
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    },
  })
);

export default function AppApolloWSProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={apolloWsClient}>{children}</ApolloProvider>;
}
