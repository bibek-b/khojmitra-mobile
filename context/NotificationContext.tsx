
import { PopupNotificationContextType, PopupNotificationStateType } from "@/types/popupNotification";
import React, { createContext, useState } from "react";

export const NotificationContext = createContext<PopupNotificationContextType>({});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<PopupNotificationStateType>();

  const showNotification = ({ type, message }: PopupNotificationStateType) => {
    setNotification({ visible: true, type, message });
  };
  const hideNotification = () => {
    setNotification(undefined)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
