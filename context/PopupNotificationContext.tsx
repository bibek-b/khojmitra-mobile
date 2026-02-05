import socket from "@/app/lib/socket";
import {
  PopupNotificationContextType,
  PopupNotificationStateType,
} from "@/types/popupNotification";
import React, { createContext, useEffect, useState } from "react";

export const PopupNotificationContext =
  createContext<PopupNotificationContextType>({});

export const PopupNotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popupNotification, setPopupNotification] =
    useState<PopupNotificationStateType>();

  const showPopupNotification = ({
    type,
    message,
  }: PopupNotificationStateType) => {
    setPopupNotification({ visible: true, type, message });
  };
  const hidePopupNotification = () => {
    setPopupNotification(undefined);
  };

  useEffect(() => {
    const handler = (message: string) => {
      if(!message) return;
      showPopupNotification({ type: "info", message });
    };

    socket.on("notification:new", handler);

    return () => {
      socket.off("notification:new", handler);
    };
  }, []);

  return (
    <PopupNotificationContext.Provider
      value={{
        popupNotification,
        showPopupNotification,
        hidePopupNotification,
      }}
    >
      {children}
    </PopupNotificationContext.Provider>
  );
};
