import { authTypes } from "@/types/api/auth.types";
import api from "./axios";

export const authApi = {
    signUp: (data: FormData) => api.post('/auth/signUp', data),
    signIn: (data: authTypes) => api.post('/auth/signIn', data),
    refreshToken: () => api.get('/auth/refresh')
}