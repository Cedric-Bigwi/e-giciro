import axios from 'axios';

const api = axios.create({
  // In development, leave VITE_API_URL unset in frontend/.env — requests to
  // '/api' are caught by the Vite dev-server proxy (see vite.config.js) and
  // forwarded to the backend, avoiding CORS entirely. In production, set
  // VITE_API_URL to your deployed backend's full URL before building.
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('egiciro_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem('egiciro_token');
      localStorage.removeItem('egiciro_user');
    }
    return Promise.reject(error);
  }
);

export default api;
