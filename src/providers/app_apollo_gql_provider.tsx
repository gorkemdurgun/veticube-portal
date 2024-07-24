import { store } from "@/redux/store";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

export const apolloGqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  
  link: new HttpLink({
    uri: "http://52.59.222.78:8080/v1/graphql",
    headers: {
      // Authorization: `Bearer ${store.getState().auth.accessToken}`,
      "x-hasura-admin-secret": "myadminsecretkey",
    }
  }),
  
});


export default function AppApolloGqlProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={apolloGqlClient}>{children}</ApolloProvider>;
}
