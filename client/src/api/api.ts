import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "../stores/auth.store";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    const { token } = useAuthStore.getState();

    if (!token) return config;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;

/*
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (!token) {
    return config;
  }

  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
 */
