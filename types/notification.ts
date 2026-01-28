export interface NotificationStoreType  {
    notifications : ReceiveNotificationPropType[];
    setNotifications: (value: ReceiveNotificationPropType) => void;
}

export interface NotificationPropType {
    username: string,
    message: string,
    date: string,
}

export interface ReceiveNotificationPropType {
    _id: string;
    senderId: string;
    senderName: string;
    createdAt: string;
    postId: string;
}