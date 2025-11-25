
type notificationType = "error" | "success" 


export type NotificationStateType = {
  type?: notificationType ;
  message?: string;
  visible?: boolean;
};

export interface NotificationPropType {
    username: string,
    message: string,
    date: string,
    type: notificationType
}

export type NotificationContextType = {
  notification?: NotificationStateType;
  setNotification?: React.Dispatch<
    React.SetStateAction<NotificationPropType | undefined>
  >;
  showNotification?: ({ type, message }: NotificationStateType) => void;
  hideNotification?: () => void;
};

