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

export { hasuraRestAxios, nhostAuthAxios };
