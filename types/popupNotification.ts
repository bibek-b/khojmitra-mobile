
type PopupNotificationType = "error" | "success" | "info" 


export type PopupNotificationStateType = {
  type?: PopupNotificationType ;
  message?: string;
  visible?: boolean;
};



export type PopupNotificationContextType = {
  notification?: PopupNotificationStateType;
  setNotification?: React.Dispatch<
    React.SetStateAction<PopupNotificationStateType | undefined>
  >;
  showNotification?: ({ type, message }: PopupNotificationStateType) => void;
  hideNotification?: () => void;
};

