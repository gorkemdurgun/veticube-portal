import { logout } from "@/redux/slices/auth/authSlice";
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

const nhostHasuraRestApi = axios.create({
  baseURL: "https:/ymqhadczimpjnbvtnqym.hasura.eu-central-1.nhost.run/api/rest/",
});
const nhostAuthApi = axios.create({
  baseURL: "https://ymqhadczimpjnbvtnqym.auth.eu-central-1.nhost.run/v1",
});

nhostHasuraRestApi.interceptors.request.use((config) => {
  // const userId = store.getState().auth.user?.id;
  // const activeRole = store.getState().auth.user?.roles[0];
  // config.headers["x-hasura-admin-secret"] = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET;
  // config.headers["x-hasura-role"] = activeRole;
  // config.headers["x-hasura-user-id"] = userId;
  return config;
});

// Unauthorized error handling
nhostHasuraRestApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export { nhostHasuraRestApi, nhostAuthApi };
