import { PostType } from "./post.types";

export interface FeedProps {
    post: PostType,
    onDeletePost?: (value: string) => void;
    myId: string
}

export interface SearchFeedInputType {
    searchInput: string,
    setSearchInput: (value: string) => void;
}

export interface FeedColorThemesPropsType {
    isDarkMode: boolean;
    isLost: boolean;
}
