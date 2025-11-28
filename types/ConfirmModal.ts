export interface ConfirmModalProps {
    title: string;
    denyText: string;
    desc?: string,
    acceptText: string;
    acceptBtnBg?: string;
}

export interface ConfirmModalType {
    isConfirmModalVisible: boolean,
    modalContent: object,
    setModalContent: (value: ConfirmModalProps) => void; 
}

