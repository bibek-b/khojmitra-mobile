// import { redirectToLogin } from '@/services/NavigationService';
import { getItem, removeItem, setItem } from "@/utils/AsyncStorage";
import axios from "axios";
import { authApi } from "./authApi";
import { router } from "expo-router";
import { serverUrl } from "@/env/serverUrl";

console.log({serverUrl})
const api = axios.create({
  baseURL:serverUrl+"/api",
  // withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  //get token from async storage
  const accessToken = await getItem("access_token");
  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error.config;

    if ((error?.response?.status === 401 || error?.response?.status === 403 ) && !originalReq._retry) {
      originalReq._retry = true;
      try {
        const { data } = await authApi.refreshToken();
        await setItem("access_token", data?.access_token);

        originalReq.headers.Authorization = `Bearer ${data?.access_token}`;
        return api(originalReq);
      } catch (error) {
        await removeItem("access_token");
        await removeItem("user");
        router.replace("/screens/signInScreen");

        // redirectToLogin()
      }
    }
    return Promise.reject(error);
  }
);

export default api;
