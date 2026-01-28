import { NotificationStoreType, ReceiveNotificationPropType } from "@/types/notification";
import { create } from "zustand";

export const userNotificationStore = create<NotificationStoreType>((set) => ({
    notifications: [],
    setNotifications: (data: ReceiveNotificationPropType) => set((state) => ({notifications: [...state.notifications, data]}))
}))