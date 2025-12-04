import { addProofPropsType } from "@/types/proof";
import api from "./axios";

export const proofApi = {
    addProof : ({data, type}: addProofPropsType) => api.post(`/proofs/:${type}`, data),
    getAllProofs: () => api.get('/proofs'),
    getProof: (id: string) => api.get(`/proofs/${id}`)
}