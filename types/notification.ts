
export interface NotificationStoreType {

  notifications: ReceiveNotificationPropType[];
  setNotifications: (value: ReceiveNotificationPropType[]) => void;
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
