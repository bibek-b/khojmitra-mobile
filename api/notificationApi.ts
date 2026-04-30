import { NotificationPropType } from "@/types/notification";
import api from "./axios";

export const notificationApi = {
    getMyNotifications : (id: string) => api.get(`/notifications/${id}`),
    pushNotifications: (data: NotificationPropType) => api.post("/notifications", data),
    updateSeen : (id: string) => api.post(`/notifications/${id}/read`),
    sendPushToken : (userId: string, token: string) => api.post('/notifications/save-token', {userId, token})
}