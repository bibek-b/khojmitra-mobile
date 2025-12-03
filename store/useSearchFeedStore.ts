import { SearchFeedInputType } from "@/types/feed";
import { create } from "zustand";


export const useSearchFeedStore = create<SearchFeedInputType>(set => ({
    searchInput: "",
    setSearchInput: (searchInput: string) => set({searchInput})
}))