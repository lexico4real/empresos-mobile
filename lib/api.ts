//axios instance
import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const getBaseUrl = () => {
  const baseUrl = Constants.expoConfig?.extra?.BASE_URL;

  // If we're in development and on Android
  if (__DEV__ && Platform.OS === "android") {
    // For Android emulator
    if (Platform.constants.Brand === "google") {
      return "http://10.0.2.2:3000/api/v1";
    }
    // For physical Android device
    return "http://172.20.10.4:3000/api/v1";
  }

  return baseUrl;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Log request for debugging in development
    if (__DEV__) {
      console.log(`Making request to: ${config.url}`);
      console.log("Request config:", {
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data,
      });
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`Response from ${response.config.url}:`, response.data);
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      console.error("API Error:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
