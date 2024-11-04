import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL_API,
  withCredentials: true // Ensures cookies are included in requests
});

export default api;
