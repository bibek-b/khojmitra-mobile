import { ProofFormContextType, ProofFormTypeState } from "@/types/proofForm";
import { createContext, useState } from "react";

export const ProofFormContext = createContext<ProofFormContextType>({});

export const ProofFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [proofForm, setProofForm] = useState<ProofFormTypeState>({type: "", postId: "", postOwnerId: ""});

  const showForm = () => setIsFormVisible(true);
  const hideForm = () => setIsFormVisible(false);
  return (
    <ProofFormContext.Provider
      value={{
        isFormVisible,
        showForm,
        hideForm,
        proofForm,
        setProofForm,
      }}
    >
      {children}
    </ProofFormContext.Provider>
  );
};
