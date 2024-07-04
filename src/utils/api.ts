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

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default apiClient;