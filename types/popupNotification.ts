
type PopupNotificationType = "error" | "success" | "info" 


export type PopupNotificationStateType = {
  type: PopupNotificationType ;
  message: string;
  visible?: boolean;
};



export type PopupNotificationContextType = {
  popupNotification?: PopupNotificationStateType;
  setPopupNotification?: React.Dispatch<
    React.SetStateAction<PopupNotificationStateType | undefined>
  >;
  showPopupNotification?: ({ type, message }: PopupNotificationStateType) => void;
  hidePopupNotification?: () => void;
};

