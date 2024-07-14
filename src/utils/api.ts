import { store } from "@/redux/store";
import {  useAccessToken } from "@nhost/nextjs";
import axios from "axios";

const nhostHasuraRestApi = axios.create({
  baseURL: "https:/nntumxfmlicwnzksyqnw.hasura.eu-central-1.nhost.run/api/rest",
});

// Request interceptor to add the access token to the request
nhostHasuraRestApi.interceptors.request.use(
  (config) => {
    const token = useAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { nhostHasuraRestApi };
