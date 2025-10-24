import { ProofFormContextType } from "@/types/common";
import { createContext, useState } from "react";

export const ProofFormContext = createContext<ProofFormContextType>({});

export const ProofFormContextProvider = ({children}: {children:React.ReactNode}) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const showForm = () => setIsFormVisible(true);
    const hideForm = () => setIsFormVisible(false);
    return <ProofFormContext.Provider value={{isFormVisible,showForm, hideForm}}>
        {children}
    </ProofFormContext.Provider>
}