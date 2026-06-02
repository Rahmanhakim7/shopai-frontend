import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
});

interface JwtPayload {
  exp: number;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    throw new Error("No refresh token found");
  }

  const response = await axios.post(`${API_URL}/token/refresh/`, {
    refresh,
  });

  const newAccess = response.data.access;

  localStorage.setItem("token", newAccess);

  return newAccess;
}

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return config;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp - currentTime < 60) {
      const newAccess = await refreshAccessToken();

      config.headers.Authorization = `Bearer ${newAccess}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Token decode error:", error);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const newAccess = await refreshAccessToken();

        onRefreshed(newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
