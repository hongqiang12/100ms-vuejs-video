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
    // config.headers["Authorization"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NTM3MmM4ZjY4MTExZjZmZTRiNTdhN2QiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NTM3MmUyNDY5YjhhNzM5YmUwOGJmMTkiLCJ1c2VyX2lkIjoiZWExZTU4ZGUtY2E3NC00MWEyLTljZWItZTNiNDUxNGY4Y2E0IiwiZXhwIjoxNjk4MjIxNDMwLCJqdGkiOiJkMWU5ZmI1YS1hZjkyLTRhNWQtODg4OS1jNTY4ZjMzNTEyY2MiLCJpYXQiOjE2OTgxMzUwMzAsImlzcyI6IjY1MzcyYzhmNjgxMTFmNmZlNGI1N2E3YiIsIm5iZiI6MTY5ODEzNTAzMCwic3ViIjoiYXBpIn0.8w3XMeC7851-D2pVR-6mT0XKnrkluxX27y0_x5-hZx8";
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
