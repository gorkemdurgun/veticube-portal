import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { store } from "@/redux/store";
import { onError } from "@apollo/client/link/error";
import { logout } from "@/redux/slices/authSlice";

const httpLink = new HttpLink({
  uri: "http://52.59.222.78:8080/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const state = store.getState();
  const token = state.auth?.clientSession?.idToken;

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      console.log(`[GraphQL error]: ${message}`); // GraphQL hatalarını logla
      store.dispatch(logout());
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
