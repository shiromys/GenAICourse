import axios from 'axios';

/**
 * PRODUCTION-READY API CONFIGURATION
 * Forces relative paths in production to ensure the frontend 
 * communicates with the Railway domain instead of localhost.
 */


// FORCE relative paths in production to prevent localhost leaks
const API_URL = import.meta.env.MODE === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true 
});
// ... keep existing interceptors

// Request Interceptor: Attach JWT token to every outgoing request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle global errors like 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear local data and force login if token is expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;