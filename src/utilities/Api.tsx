import axios, { AxiosInstance } from 'axios';

// Define the API base URL
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5600/api',
});

// Add a request interceptor to attach the Bearer token
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage (or any other secure storage)
    const token = localStorage.getItem('token'); // Adjust based on your token storage method

    // If a token is available, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error if something goes wrong in the interceptor
    return Promise.reject(error);
  }
);

export default api;
