import {  postType } from "@/types/post.types";
import api from "./axios";

export const postApi = {
  create: (data: FormData) => api.post("/posts/create", data, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "multipart/form-data"
    }
  }),
  getAll: () => api.get("posts/getAll"),
  getPost: (id: string) => api.get(`/posts/${id}`),
  getUserPosts: (id: string) => api.get(`/posts/user/${id}`),
  update: (id: string, data: postType) => api.put(`/posts/${id}`,data),
  delete: (id: string) => api.delete(`/posts/${id}`),
};
