
import { NotificationContextType, NotificationStateType } from "@/types/popupNotification";
import React, { createContext, useState } from "react";

export const NotificationContext = createContext<NotificationContextType>({});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<NotificationStateType>();

  const showNotification = ({ type, message }: NotificationStateType) => {
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
