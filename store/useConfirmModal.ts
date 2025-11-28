import { ConfirmModalProps, ConfirmModalType } from "@/types/ConfirmModal";
import { create } from "zustand";


export const useConfirmModal = create<ConfirmModalType>(set =>({
    isConfirmModalVisible: false,
    modalContent : {},
    setModalContent : (data: ConfirmModalProps) => set({modalContent: data})
}))