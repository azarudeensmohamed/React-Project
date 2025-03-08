import axios from 'axios';

// Create an Axios instance

const apiUrl = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: apiUrl+"api",
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem("token");
if (token) {
  apiClient.defaults.headers['Authorization'] = `bearer ${token}`;
}

export default apiClient;
