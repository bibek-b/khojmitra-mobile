export type confirmBtnVariantType = "primary" | "danger"


export interface modalContentType {
    title: string,
    detail: string,
    confirmText: string,
    confirmBtnVariant: confirmBtnVariantType,
}

export interface ConfirmModalType {
    confirmModal: boolean,
    showConfirmModal: () => void;
    hideConfirmModal: () => void;
    modalContent: modalContentType,
    setModalContent: (value: modalContentType) => void; 
    onConfirm: () => void;
    setOnConfirm: (cb: () => void) => void
}

