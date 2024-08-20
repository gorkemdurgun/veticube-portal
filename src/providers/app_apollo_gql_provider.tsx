import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { store } from "@/redux/store";
import { onError } from "@apollo/client/link/error";
import { logout } from "@/redux/slices/authSlice";
import { message } from "antd";
import { auth } from "@/services/auth";

const httpLink = new HttpLink({
  uri: "http://3.71.108.46:8080/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const state = store.getState();
  const token = state.auth?.clientSession?.idToken;

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      "x-hasura-role": "manager",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message: errMessage }) => {
      console.log(`[GraphQL error]: ${errMessage}`); // GraphQL hatalarını logla
      if (errMessage.includes("Could not verify JWT")) {
        message.error("Your session has expired. Please login again.");
        auth.login.refreshSession(); // Oturum süresi dolmuşsa oturumu yenile
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`); // Ağ hatalarını logla
  }
});

export const apolloGqlClient = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default function AppApolloGqlProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={apolloGqlClient}>{children}</ApolloProvider>;
}
