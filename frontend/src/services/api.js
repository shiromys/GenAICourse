import axios from 'axios';

// This logic ensures that if the site is LIVE, it NEVER looks for localhost
const isLocal = window.location.hostname === 'localhost';
const API_URL = isLocal ? 'http://localhost:5000/api' : '/api';

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
            const path = window.location.pathname;
            // ✅ Do NOT force-logout on any payment-related or session-resuming page.
            // These pages call /auth/me to re-hydrate the user after a Stripe redirect.
            const exemptPaths = ['/payment-success', '/dashboard', '/profile'];
            const isExempt = exemptPaths.some(p => path.startsWith(p));

            if (!isExempt) {
                // Clear local data and force login if token is expired or invalid
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;