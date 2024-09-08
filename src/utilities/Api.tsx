import axios, { AxiosInstance } from 'axios';

// Define the API base URL
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5300/api',
});

export default api;
