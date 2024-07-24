import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const apolloWsClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new WebSocketLink({
    uri: "wss://nearby-weevil-32.hasura.app/v1/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          // "x-hasura-admin-secret": adminSecret,
        },
      },
    },
  }),
});

export default function AppApolloWSProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={apolloWsClient}>{children}</ApolloProvider>;
}
