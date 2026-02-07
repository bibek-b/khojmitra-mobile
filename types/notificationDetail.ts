import { imageType } from "./image";
import { MatchedPostsType, NotificationType } from "./notification";
import { ProofType } from "./proofForm";

export type ActionType = "accept" | "decline"; 

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
    type: NotificationType | "";
    setType: (val: NotificationType) => void;
    matchedPosts: MatchedPostsType | [];
    setMatchedPosts: (val: MatchedPostsType) => void;
}

export interface ReportDetailPropType {
    sender: SenderType;
    proof: ProofType;
    setSelectedImage: (img: imageType) => void;
    handleAction : (val: ActionType) => void;
}