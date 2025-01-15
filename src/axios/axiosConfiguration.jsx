import axios from "axios";
import { SERVER } from "../servers";

const instance = axios.create({
  baseURL: `${SERVER}`,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

instance.interceptors.request.use(
  (config) => {
    if (
      !config.url.endsWith("/login/") &&
      !config.url.endsWith("/register/") &&
      !config.url.endsWith("/forgot-password/") &&
      !config.url.endsWith("/reset-password/")
    ) {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response && response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${SERVER}/api/token/refresh/`, { refresh: refreshToken });
          console.log("interceptors data:", data);
          
          const newAccessToken = data.access;
          localStorage.setItem("access_token", newAccessToken);

          // Retry all failed requests with the new access token
          instance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          return instance(error.config); // Retry the original request with the new token
        } catch (err) {
          // If refresh fails, logout user and redirect to login page
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login"; // Or handle it as needed
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    // // Handle cases where the refresh token is invalid or expired
    // if (response && response.status === 401) {
    //   localStorage.removeItem("access_token");
    //   localStorage.removeItem("refresh_token");
    //   window.location.href = "/login"; // Redirect to login page
    // }

    return Promise.reject(error);
  }
);

export default instance;
