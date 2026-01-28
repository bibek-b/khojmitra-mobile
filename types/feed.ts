import { PostType } from "./post.types";

export interface FeedProps {
    post: PostType,
    onDeletePost?: (value: string) => void;
}

export interface SearchFeedInputType {
    searchInput: string,
    setSearchInput: (value: string) => void;
}