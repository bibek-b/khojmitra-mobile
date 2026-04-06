import { ImgType } from "./image";
import { ProofType } from "./proofForm";
import { ReportType } from "./report";

export interface ContentProps {
    data?: ProofType | ReportType;
    setSelectedImage: (val: ImgType) => void;
}