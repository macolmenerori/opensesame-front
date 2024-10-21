import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // API's base URL TODO: change this to the production URL
  withCredentials: true // Ensures cookies are included in requests
});

export default api;
