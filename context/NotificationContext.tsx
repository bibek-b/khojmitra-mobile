import { NotificationContextType, NotificationPayload, NotificationType } from "@/types/common";
import React, { createContext, useState } from "react";

export const NotificationContext = createContext<NotificationContextType>({});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<NotificationType>();

  const showNotification = ({type, message}: NotificationPayload) => {
    setNotification({visible: true, type, message});

    setTimeout(() => {
        setNotification(prev => ({...prev, visible: false}))
    }, 3000);
  }

//   const hideNotification = () => {
    
//   }
  return (
    <NotificationContext.Provider value={{ notification, setNotification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
