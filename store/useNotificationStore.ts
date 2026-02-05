import {
  NotificationStoreType,
  ReceiveNotificationPropType,
} from "@/types/notification";
import { create } from "zustand";

export const useNotificationStore = create<NotificationStoreType>((set) => ({
  notifications: [],
  setNotifications: (data: ReceiveNotificationPropType[]) =>
    set({ notifications: data }),
}));
