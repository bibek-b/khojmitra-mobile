import { ProofFormContextType, ProofFormTypeState } from "@/types/proofForm";
import { createContext, useState } from "react";

export const ProofFormContext = createContext<ProofFormContextType>({});

export const ProofFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [proofFormType, setProofFormType] = useState<ProofFormTypeState>({type: "", postId: ""});

  const showForm = () => setIsFormVisible(true);
  const hideForm = () => setIsFormVisible(false);
  return (
    <ProofFormContext.Provider
      value={{
        isFormVisible,
        showForm,
        hideForm,
        proofFormType,
        setProofFormType,
      }}
    >
      {children}
    </ProofFormContext.Provider>
  );
};
