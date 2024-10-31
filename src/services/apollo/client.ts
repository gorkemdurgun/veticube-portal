import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { message } from "antd";

import { store } from "@/redux/store";

const httpLink = new HttpLink({
  uri: "http://35.158.95.5:8080/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const state = store.getState();
  const token = state.auth?.session?.idToken.jwtToken;
  // const role = state.user?.user?.role;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message: errMessage }) => {
      console.log(`[GraphQL error]: ${errMessage}`); // GraphQL hatalarını logla
      message.error(errMessage);
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

export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});
