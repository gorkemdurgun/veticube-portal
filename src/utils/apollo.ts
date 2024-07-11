import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

// const adminSecret = "3QZFAeWZLv11cs1t0UyjSgA5K4mEHT155Via37cpORSdEU682cIMRyPpSYDhD4Or";

const apolloClient = new ApolloClient({
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

export default apolloClient;
