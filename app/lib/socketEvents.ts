import { userNotificationStore } from "@/store/useNotificationStore"
import socket from "./socket";
import { ReceiveNotificationPropType } from "@/types/notification";

export const registerNotificationEvent = () => {
    const { setNotifications } = userNotificationStore.getState();

    socket.on('notification', (data: ReceiveNotificationPropType) => {
        setNotifications(data);
    });
}