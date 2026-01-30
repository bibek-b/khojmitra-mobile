export interface NotificationStoreType  {
    notifications : ReceiveNotificationPropType[];
    setNotifications: (value: ReceiveNotificationPropType) => void;
}

export interface NotificationPropType {
    data : ReceiveNotificationPropType
}

export interface ReceiveNotificationPropType {
    _id: string;
    senderId: string;
    senderName: string;
    createdAt: string;
    postId: string;
    postTitle: string;
    message?:string;
}