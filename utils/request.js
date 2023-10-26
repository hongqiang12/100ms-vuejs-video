import axios from "axios";
import { BASE_API_URL } from "~/constant";

const ignoreErrorCode = [
  "EMAIL_ERROR",
  "PASSWORD_ERROR",
  "USER_NOT_FOUND",
  "WRONG_USER_EMAIL",
  "USER_WRONG_CREDENTIALS",
];



const service = axios.create({
  baseURL: BASE_API_URL,
  timeout: 1000 * 60 * 15,
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    
    if (process.server) {
      config.headers["origin"] = "http://localhost:3000";
    }
    config.headers["Authorization"] = "https://prod-in2.100ms.live/hmsapi/hongqiang12-videoconf-1034.app.100ms.live/";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error?.response?.status;
    const { errorCode, errorMessage } = error?.response?.data || {};
    
    return Promise.reject(error);
  }
);

export default service;
