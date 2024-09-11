import axios, { AxiosError, AxiosResponse } from "axios";
import { Storage } from "../../utils/storage/storage";
import { router } from "expo-router";

// export const BASE_API_URL = "http://localhost:3001";
export const BASE_API_URL = process.env.EXPO_PUBLIC_API_URL;

const baseClient = axios.create({
  baseURL: `${BASE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

baseClient.interceptors.request.use(async (config: any) => {
  const token = await Storage.get("token");
  config.headers.Authorization = token;

  return config;
});

baseClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (err: AxiosError) => {
    console.log("api request err-------------------", err.response);
    if (err.response?.status === 401) {
      router.push("/login");
      Storage.remove("token");
    }
    return Promise.reject(err.response);
  }
);

export const client = baseClient;
