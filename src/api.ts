import axios, { AxiosInstance } from 'axios';

import { getToken } from './utils/tokenStorage';

const api: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL_API
});

// Request interceptor to add Authorization header with Bearer token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
