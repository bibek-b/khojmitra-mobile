import { NotificationStoreType, ReceiveNotificationPropType } from "@/types/notification";
import { create } from "zustand";

export const useNotificationStore = create<NotificationStoreType>((set) => ({
    newNotification: false,
    setNewNotification: (value: boolean) => set({newNotification: value}),
    notifications: [],
    setNotifications: (data: ReceiveNotificationPropType[]) => set({notifications: data}),
    addNotification: (newNotifi: ReceiveNotificationPropType) => set(state => ({notifications: [...state.notifications, newNotifi]}))
}))