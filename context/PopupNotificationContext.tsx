
import { PopupNotificationContextType, PopupNotificationStateType } from "@/types/popupNotification";
import React, { createContext, useState } from "react";

export const PopupNotificationContext = createContext<PopupNotificationContextType>({});

export const PopupNotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popupNotification, setPopupNotification] = useState<PopupNotificationStateType>();

  const showPopupNotification = ({ type, message }: PopupNotificationStateType) => {
    setPopupNotification({ visible: true, type, message });
  };
  const hidePopupNotification = () => {
    setPopupNotification(undefined)
  }

  return (
    <PopupNotificationContext.Provider
      value={{ popupNotification, showPopupNotification, hidePopupNotification }}
    >
      {children}
    </PopupNotificationContext.Provider>
  );
};
