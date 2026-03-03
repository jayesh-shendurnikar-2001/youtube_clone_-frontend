// src/api/api.js – Axios instance with auth interceptor
import axios from 'axios';

const API = axios.create({
    baseURL: "https://youtube-clone-backend-4kfr.onrender.com/api",
  });
  
// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default API;
