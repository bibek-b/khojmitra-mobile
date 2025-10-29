import axios from 'axios';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
    headers: { "Content-Type": "application/json"}
});

export default api;