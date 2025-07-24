import axios from "axios";
import { getCookie, removeCookie } from "../cookies";
import { toast } from "react-toastify";

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
    const token = getCookie("auth_token");
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
    if (response.config.skipSuccessMessage) {
      return response;
    }

    if (response.data.success) {
      toast.success(response.data.message);
    }

    return response;
  },
  (error) => {
    // Handle 401 errors
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config?.skipUnauthorized
    ) {
      // toast.error("Unauthorized");
      removeCookie("auth_token");
      window.location.href = "/login";
    }

    // Always include error info in the response for client to handle
    if (error.response) {
      const backendMessage = error.response?.data?.message;

      // If message is an array (validation errors), join them with line breaks
      const errorMessage = Array.isArray(backendMessage)
        ? backendMessage.join("\n")
        : backendMessage || "An error occurred";

      toast.error(errorMessage);

      error.response.serverError = {
        message: errorMessage,
        status: error.response.status,
      };
    }

    return Promise.reject(error);
  }
);

export default api;
