import { NotificationStoreType, ReceiveNotificationPropType } from "@/types/notification";
import { create } from "zustand";

export const useNotificationStore = create<NotificationStoreType>((set) => ({
    newNotification: false,
    setNewNotification: (value: boolean) => set({newNotification: value}),
    notifications: [],
    setNotifications: (data: ReceiveNotificationPropType) => set((state) => ({notifications: [...state.notifications, data]}))
}))