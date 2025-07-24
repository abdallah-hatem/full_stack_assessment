import axios from "axios";
import { getCookie } from "../cookies";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipSuccessMessage?: boolean;
    skipErrorMessage?: boolean;
    skipUnauthorized?: boolean;
    isServer?: boolean;
  }
}

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 200000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    const lang = getCookie("lang");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    if (!config.isServer)
      config.headers["Accept-Language"] = lang === "ar" ? "ar" : "en";

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    // Handle 401 errors
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config?.skipUnauthorized
    ) {
    }

    // Always include error info in the response for client to handle
    if (error.response) {
      error.response.serverError = {
        message: error.response?.data?.message || "An error occurred",
        status: error.response.status,
      };
    }

    return Promise.reject(error);
  }
);

export default api;
