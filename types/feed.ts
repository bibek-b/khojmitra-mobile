import { postType } from "./post.types";

export interface FeedProps {
    post: postType,
    onDeletePost?: (value: string) => void;
}

export interface SearchFeedInputType {
    searchInput: string,
    setSearchInput: (value: string) => void;
}