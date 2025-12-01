import { postStore, postType } from "@/types/post.types";
import { create } from "zustand";

export const usePostStore = create<postStore>(set => ({
    allPosts: [],
    setAllPosts: (data: postType[]) => set({allPosts: data})
}))