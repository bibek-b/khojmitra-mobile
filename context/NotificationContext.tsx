import {
  NotificationContextType,
  NotificationPayload,
  NotificationType,
} from "@/types/common";
import React, { createContext, useState } from "react";

export const NotificationContext = createContext<NotificationContextType>({});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<NotificationType>();

  const showNotification = ({ type, message }: NotificationPayload) => {
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
