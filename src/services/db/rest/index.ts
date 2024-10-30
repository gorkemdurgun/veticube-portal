import axios from "axios";

import { store } from "@/redux/store";

import { getBreeds } from "./app";
import { getClinicRecordsByBranchId } from "./clinic";
import { getUserById, getManagerAssignments, getEmployeeAssignments } from "./user";

export const axiosInstance = axios.create({
  baseURL: "http://35.158.95.5:8080/api/rest",
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const { session } = state.auth;
  const token = session?.idToken?.jwtToken;
  if (session && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const rest = {
  user: {
    getUserById,
    getManagerAssignments,
    getEmployeeAssignments,
  },
  app: {
    getBreeds,
  },
  clinic: {
    getClinicRecordsByBranchId,
  }
};
