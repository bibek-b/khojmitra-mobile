import { NotificationDetailPostType, SenderType } from "./notificationDetail";

export type NotificationType = "REPORT" | "POSSIBLE_MATCH";

export interface NotificationStoreType {
  notifications: NotificationPropType[];
  setNotifications: (value: NotificationPropType[]) => void;
}
export interface ScoreDetailType {
  titleScore: number;
  descScore: number;
  categoryScore: number;
  dateScore: number;
  locationScore: number;
}

export interface MatchedPostsType {
  postId: string;
  userId: string;
  totalScore: number;
  scoreDetail: ScoreDetailType;
}
export interface NotificationPropType {
  _id: string;
  sender: SenderType;
  post: NotificationDetailPostType;
  createdAt: string;
  message: string;
  type: NotificationType;
  matchedPosts?: MatchedPostsType;
}

// export interface ReceiveNotificationPropType {
//   _id: string;
//   senderId: string;
//   sender: SenderType;
//   createdAt: string;
//   postId: string;
//   post: NotificationDetailPostType;
//   message: string;
//   type: NotificationType;
// }
