import axios from 'axios';

<<<<<<< HEAD
export default axios.create({
  baseURL: 'http://localhost:8080/api;',
});
=======
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
>>>>>>> origin/frontend-signup
