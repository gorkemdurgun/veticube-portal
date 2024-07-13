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
  baseURL: "https:/ymqhadczimpjnbvtnqym.hasura.eu-central-1.nhost.run/api/rest",
});
const nhostAuthApi = axios.create({
  baseURL: "https://ymqhadczimpjnbvtnqym.auth.eu-central-1.nhost.run/v1",
});



// Request interceptor to add the access token to the request
nhostHasuraRestApi.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
