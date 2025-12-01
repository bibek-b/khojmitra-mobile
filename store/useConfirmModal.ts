import { ConfirmModalType, modalContentType } from "@/types/ConfirmModal";
import { create } from "zustand";

export const useConfirmModal = create<ConfirmModalType>((set) => ({
  confirmModal: false,
  showConfirmModal: () => set({ confirmModal: true }),
  hideConfirmModal: () => set({ confirmModal: false }),
  modalContent: {
    title: "",
    detailInfo: "",
    acceptText: "",
    denyText: "",
    acceptBtnBg: "",
  },
  setModalContent: (data: modalContentType) => set({ modalContent: data }),
  onConfirm: () => {},
  setOnConfirm: (cb) => set({onConfirm: cb})
}));
