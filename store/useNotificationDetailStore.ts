import {
    NotificationDetailPostType,
  NotificationDetailStoreType,
  SenderType,
} from "@/types/notificationDetailStoreType";
import { create } from "zustand";

export const useNotificationDetailStore = create<NotificationDetailStoreType>(
  (set) => ({
    sender: { _id: "", fullname: "", avatar: "" },
    setSender: (val: SenderType) =>
      set({
        sender: { _id: val._id, fullname: val.fullname, avatar: val.avatar },
      }),
    post: { _id: "", title: "" },
    setPost: (val: NotificationDetailPostType) =>
      set({ post: { _id: val._id, title: val.title } }),
  }),
);
