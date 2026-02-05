import { addProofPropsType } from "@/types/proofForm";
import api from "./axios";

export const proofApi = {
  addProof: ({ data, type }: addProofPropsType) =>
    api.post(`/proofs/${type}`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }),
  getAllProofs: () => api.get("/proofs"),
  getProof: (id: string) => api.get(`/proofs/${id}`),
  getProofByClaimerAndPostId: (claimerId: string, postId: string) =>
    api.get(`/proofs/${claimerId}/${postId}`),
  getUserProofs: (userId: string) => api.get(`/proofs/mines/${userId}`),
};
