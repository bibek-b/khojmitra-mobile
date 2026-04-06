import { ImgType } from "./image";
import { MatchedPostsType, NotificationType } from "./notification";
import { PostType } from "./post.types";
import { ProofType } from "./proofForm";
import { ReportType } from "./report";

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
    matchedPosts: MatchedPostsType[];
    setMatchedPosts: (val: MatchedPostsType[]) => void;
    relatedPost: PostType | null;
    setRelatedPost: (val: PostType) => void;
}

export interface ReportDetailPropType {
    sender?: SenderType;
    data: ProofType | ReportType;
    setSelectedImage: (img: ImgType) => void;
    handleAction : (val: ActionType) => void;
    parent?:string
}

export interface PossibleMatchPropType {
    posts: PostType[] | PostType;

}