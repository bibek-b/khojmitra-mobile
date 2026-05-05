import api from "./axios";

export const userApi = {
    getUserById: (id: string) => api.get(`/users/${id}`),
    updateUser: (id: string, data: any) => api.put(`/users/${id}`, data),   
}