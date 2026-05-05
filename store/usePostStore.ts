import { PostStoreType, PostType, updateFeedType } from "@/types/post.types";
import { create } from "zustand";

export const usePostStore = create<PostStoreType>((set) => ({
  allPosts: [],
  setAllPosts: (data: PostType[]) => set({ allPosts: data }),
  updateFeed: (post: PostType, type: updateFeedType) =>
    set((state) => {
      if (type === "add") {
        return {
          allPosts: [post, ...state.allPosts.filter((p) => p._id !== post._id)],
        };
      } else if (type === "delete") {
        return {
          allPosts: state.allPosts.filter((p) => p._id !== post._id),
        };
      } else if (type === "update") {
        return {
          allPosts: state.allPosts.map((p) => (p._id === post._id ? post : p)),
        };
      }

      return state;
    }),
    
  isEditPost: false,
  TrueEditPost: () => set({ isEditPost: true }),
  FalseEditPost: () => set({ isEditPost: false }),
}));
