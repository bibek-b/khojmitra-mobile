import { NotificationPropType } from "@/types/notification";
import api from "./axios";

export const notificationApi = {
    getNotifications : () => api.get('/notifications'),
    pushNotifications: (data: NotificationPropType) => api.post("/notifications"),
    updateSeen : (id: string) => api.post(`/notifications/${id}/read`)
}