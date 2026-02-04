
export interface NotificationStoreType {
  newNotification: boolean;
  setNewNotification: (value: boolean) => void;
  notifications: ReceiveNotificationPropType[];
  setNotifications: (value: ReceiveNotificationPropType[]) => void;
  addNotification: (value: ReceiveNotificationPropType) => void;
}

export interface NotificationPropType {
    senderName : string;
    postTitle: string;
    createdAt: string;
    message: string;
}

export interface ReceiveNotificationPropType {
  _id: string;
  senderId: string;
  sender:  {  _id?: string; fullname: string };
  createdAt: string;
  postId: string;
  post: {_id?:string; title: string};
  message: string;
}
