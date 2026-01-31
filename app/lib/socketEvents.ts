import { useNotificationStore } from "@/store/useNotificationStore"
import socket from "./socket";
import { ReceiveNotificationPropType } from "@/types/notification";

export const registerNotificationEvent = () => {
    const { setNotifications, setNewNotification } = useNotificationStore.getState();

    socket.on('notification', (data: ReceiveNotificationPropType) => {
        setNewNotification(true);
        setNotifications(data);
    });
}