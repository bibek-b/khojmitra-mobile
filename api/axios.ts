import axios from 'axios';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
    headers: { "Content-Type": "multipart/form-data"}
});

export default api;