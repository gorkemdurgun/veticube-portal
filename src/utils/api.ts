import { store } from "@/redux/store";
import axios from "axios";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const hasuraRestAxios = axios.create({
  baseURL: "https:/jsyvrxdasbzbovolkdhw.hasura.eu-central-1.nhost.run/api/rest/",
});
const nhostAuthAxios = axios.create({
  baseURL: "https://jsyvrxdasbzbovolkdhw.auth.eu-central-1.nhost.run/v1",
});

hasuraRestAxios.interceptors.request.use((config) => {
  const userId = store.getState().auth.user?.id;
  const activeRole = store.getState().auth.user?.roles[0];
  config.headers["x-hasura-admin-secret"] = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET;
  config.headers["x-hasura-role"] = activeRole;
  config.headers["x-hasura-user-id"] = userId;
  return config;
});

export { hasuraRestAxios, nhostAuthAxios };
