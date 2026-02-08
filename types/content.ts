import {  ServerImgType } from "./image";
import { ProofType } from "./proofForm";

export interface ContentProps {
    proof?: ProofType;
    setSelectedImage: (val: ServerImgType) => void;
}