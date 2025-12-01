

export interface modalContentType {
    title: string,
    detailInfo: string,
    acceptText: string,
    acceptBtnBg: string,
    denyText: string
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

