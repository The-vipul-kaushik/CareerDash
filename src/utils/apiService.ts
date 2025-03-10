import axios from 'axios';

// Base URL of the backend
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';


// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
