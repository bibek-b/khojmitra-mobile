import { PostStoreType, PostType } from "@/types/post.types";
import { create } from "zustand";

export const usePostStore = create<PostStoreType>(set => ({
    allPosts: [],
    setAllPosts: (data: PostType[]) => set({allPosts: data}),
    isEditPost: false,
    TrueEditPost: () => set({isEditPost: true}),
    FalseEditPost: () => set({isEditPost: false}),
}))