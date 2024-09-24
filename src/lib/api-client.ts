import Axios, { InternalAxiosRequestConfig } from "axios";

function requestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  return config;
}

export const api = Axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});
console.log(process.env.REACT_APP_API_URL);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error(message); // add some sort of notification

    return Promise.reject(error);
  }
);
