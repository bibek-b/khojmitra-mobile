import { ImgType } from "./image";
import { ProofType } from "./proofForm";

export interface ContentProps {
    proof?: ProofType;
    setSelectedImage: (val: ImgType) => void;
}