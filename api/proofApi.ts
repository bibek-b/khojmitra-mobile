import { addProofPropsType } from "@/types/proofForm";
import api from "./axios";

export const proofApi = {
    addProof : ({data, type}: addProofPropsType) => api.post(`/proofs/${type}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
        }
    }),
    getAllProofs: () => api.get('/proofs'),
    getProof: (id: string) => api.get(`/proofs/${id}`)
}