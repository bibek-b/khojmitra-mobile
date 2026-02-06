import { imageType } from "./image";

export type ProofFormContextType = {
  isFormVisible?: boolean;
  setIsFormVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  showForm?: () => void;
  hideForm?: () => void;
  proofForm?: ProofFormTypeState;
  setProofForm?: (data: ProofFormTypeState) => void;
};

export interface ProofType {
    _id: string;
    claimType: "owner" | "found"
    description?: string,
    images?: imageType[],
    postId: string,
    claimerId: string;
    createdAt: string;
}

export interface addProofPropsType {
    data: FormData,
    type: "found" | "owner" | ""
}

export interface ProofFormTypeState {
    type: "lost" | "found" | "",
    postId: string,
    postOwnerId: string;
}