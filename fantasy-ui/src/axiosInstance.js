import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
});

const token = window.sessionStorage.getItem('token');

if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;