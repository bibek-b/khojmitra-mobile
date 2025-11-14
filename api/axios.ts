import { redirectToLogin } from '@/services/NavigationService';
import { getItem, removeItem } from '@/utils/AsyncStorage';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
});

api.interceptors.request.use(async (config)  => {
    //get token from async storage
    const accessToken = await getItem("access_token");
    if(accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
});

api.interceptors.response.use(res => res, async (error) => {

    if(error?.response?.status === 401) {
        await removeItem("access_token");
        await removeItem("user");

            redirectToLogin()
    }
})

export default api;