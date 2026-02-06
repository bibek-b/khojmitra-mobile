import { NotificationDetailPostType, SenderType } from "./notificationDetailStoreType";

export interface NotificationStoreType {
  notifications: ReceiveNotificationPropType[];
  setNotifications: (value: ReceiveNotificationPropType[]) => void;
}

export interface NotificationPropType {
  sender: SenderType;
  post: NotificationDetailPostType;
  createdAt: string;
  message: string;
}

export interface ReceiveNotificationPropType {
  _id: string;
  senderId: string;
  sender: SenderType;
  createdAt: string;
  postId: string;
post: NotificationDetailPostType;
  message: string;
}
