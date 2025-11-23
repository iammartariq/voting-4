import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Attach Token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Handle Session Expiry
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Only redirect if the error specifically says session expired
      if (error.response.data.message?.includes("Session Expired")) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default client;