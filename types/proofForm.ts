
export type ProofFormContextType = {
  isFormVisible?: boolean;
  setIsFormVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  showForm?: () => void;
  hideForm?: () => void;
  proofFormType?: "lost" | "found" | string;
  setProofFormType?: React.Dispatch<React.SetStateAction<string>>;
};