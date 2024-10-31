import axios from "axios";

import { store } from "@/redux/store";

export const axiosClient = axios.create({
  baseURL: "http://35.158.95.5:8080/api/rest",
  timeout: 15000,
});

axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  const { session } = state.auth;
  const token = session?.idToken?.jwtToken;
  if (session && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
