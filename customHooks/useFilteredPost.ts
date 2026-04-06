import { PostType } from "@/types/post.types";
import { useMemo } from "react";

export const useFilteredPost = (posts: PostType[], search: string) => {
  return useMemo(() => {
    const s = search.trim().toLowerCase();
    return posts.filter(
      (p) =>
        p.title?.trim().toLowerCase().includes(s) ||
        p.type?.trim().toLowerCase().includes(s) ||
        String(p.category)?.trim().toLowerCase().includes(s) ||
        p.location?.trim().toLowerCase().includes(s) ||
        p.date?.trim().toLowerCase().includes(s) ||
        p.description?.trim().toLowerCase().includes(s),
    );
  }, [posts, search]);
};
