import { postType } from "@/types/api/post.types";
import api from "./axios";

export const postApi = {
  create: (data: postType) => api.post("/posts", data),
  getAll: () => api.get("/posts"),
  getPost: (id: string) => api.get(`/posts/${id}`),
  update: (id: string, data: postType) => api.put(`/posts/${id}`,data),
  delete: (id: string) => api.delete(`/posts/${id}`),
};
