import type { AxiosRequestConfig } from "axios";
import api from "./apiInstance";

const apiService = {
  get: async ({
    resource,
    params = {},
    skipSuccessMessage = true,
    skipErrorMessage = true,
    config,
  }: {
    resource: string;
    params?: any;
    skipSuccessMessage?: boolean;
    skipErrorMessage?: boolean;
    config?: AxiosRequestConfig;
  }): Promise<any> => {
    try {
      const response = await api.get(`/${resource}`, {
        params,
        skipSuccessMessage,
        skipErrorMessage,
        ...config,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
        data: null,
        status: error.response?.status,
      };
    }
  },

  post: async ({
    resource,
    data,
    config,
    params = {},
    skipSuccessMessage = true,
    skipErrorMessage = true,
  }: {
    resource: string;
    data?: any;
    config?: AxiosRequestConfig;
    params?: any;
    skipSuccessMessage?: boolean;
    skipErrorMessage?: boolean;
  }) => {
    try {
      const response = await api.post(`/${resource}`, data, {
        ...config,
        params,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
        data: null,
        status: error.response?.status,
      };
    }
  },

  postwithfile: async ({
    resource,
    data,
    config,
    skipSuccessMessage = true,
    skipErrorMessage = true,
  }: {
    resource: string;
    data: any;
    config?: AxiosRequestConfig;
    skipSuccessMessage?: boolean;
    skipErrorMessage?: boolean;
  }) => {
    try {
      const response = await api.post(`/${resource}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        ...config,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
        data: null,
        status: error.response?.status,
      };
    }
  },

  put: async ({
    resource,
    data,
    config,
    skipSuccessMessage = false,
  }: {
    resource: string;
    data: any;
    config?: AxiosRequestConfig;
    skipSuccessMessage?: boolean;
  }) => {
    try {
      const response = await api.put(`/${resource}`, data, {
        ...config,
        skipSuccessMessage,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
        data: null,
        status: error.response?.status,
      };
    }
  },

  putwithfile: async ({
    resource,
    data,
    config,
    skipSuccessMessage = true,
  }: {
    resource: string;
    data: any;
    config?: AxiosRequestConfig;
    skipSuccessMessage?: boolean;
  }) => {
    try {
      const response = await api.put(`/${resource}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        ...config,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
        data: null,
        status: error.response?.status,
      };
    }
  },

  delete: async ({ resource }: { resource: string }) => {
    try {
      const response = await api.delete(`/${resource}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
        data: null,
        status: error.response?.status,
      };
    }
  },
};

export default apiService;
