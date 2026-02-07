import {
  NotificationPropType,
  NotificationStoreType,
} from "@/types/notification";
import { create } from "zustand";

export const useNotificationStore = create<NotificationStoreType>((set) => ({
  notifications: [],
  setNotifications: (data: NotificationPropType[]) =>
    set({ notifications: data }),
}));
