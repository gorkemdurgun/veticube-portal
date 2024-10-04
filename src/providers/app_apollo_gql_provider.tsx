import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { message } from "antd";

import { logout } from "@/redux/slices/auth/authSlice";
import { store } from "@/redux/store";
import { auth } from "@/services/cognito";

const httpLink = new HttpLink({
  uri: "http://35.158.95.5:8080/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const state = store.getState();
  const token = state.auth?.session?.idToken.jwtToken;
  const role = state.user?.user?.role;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      "x-hasura-role": role || "user",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message: errMessage }) => {
      console.log(`[GraphQL error]: ${errMessage}`); // GraphQL hatalarını logla
      if (errMessage.includes("Could not verify JWT")) {
        message.error("Your session has expired. Please login again.");
        // store.dispatch(logout());
        // auth.login.refreshSession(); // Oturum süresi dolmuşsa oturumu yenile
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
