import { useNotificationStore } from "@/store/useNotificationStore"
import socket from "./socket";
import { ReceiveNotificationPropType } from "@/types/notification";

export const registerNotificationEvent = () => {
    const { addNotification, setNewNotification } = useNotificationStore.getState();

    socket.on('notification:new', (data: ReceiveNotificationPropType) => {
        setNewNotification(true);
        // addNotification(data)
    });
}