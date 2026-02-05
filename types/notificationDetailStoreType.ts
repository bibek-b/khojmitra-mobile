export interface SenderType {
    _id: string;
    fullname: string;
    avatar: string;
} 
export interface NotificationDetailPostType {
    _id: string;
    title: string;
} 

export interface NotificationDetailStoreType {
    sender: SenderType;
    post: NotificationDetailPostType;
    setSender: (val: SenderType) => void;
    setPost: (val: NotificationDetailPostType) => void;
}