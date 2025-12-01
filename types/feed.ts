import { postType } from "./post.types";

export interface FeedProps {
    post: postType,
    onDeletePost?: (value: string) => void;
}