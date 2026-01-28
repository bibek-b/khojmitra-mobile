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
    senderId: string;
    postId: string;
}