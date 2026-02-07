import { MatchedPostsType, NotificationType } from "@/types/notification";
import {
    NotificationDetailPostType,
  NotificationDetailStoreType,
  SenderType,
} from "@/types/notificationDetail";
import { PostType } from "@/types/post.types";
import { create } from "zustand";

export const useNotificationDetailStore = create<NotificationDetailStoreType>(
  (set) => ({
    sender: { _id: "", fullname: "", avatar: "" },
    setSender: (val: SenderType) =>
      set({
        sender: { _id: val?._id, fullname: val?.fullname, avatar: val?.avatar },
      }),
    post: { _id: "", title: "" },
    setPost: (val: NotificationDetailPostType) =>
      set({ post: { _id: val._id, title: val.title } }),
    type: "",
    setType: (val: NotificationType) => set({type: val}),
    matchedPosts: [],
    setMatchedPosts: (val: MatchedPostsType[]) => set({matchedPosts: val}),
    relatedPost: null,
    setRelatedPost : (val: PostType) => set({relatedPost: val})
  }),
);
