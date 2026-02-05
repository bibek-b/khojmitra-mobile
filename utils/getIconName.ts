export const getPopupNotificationIcon = (type: string) => {
    if(type === "success") {
        return  "checkmark-circle"
    } 
    else if(type === "error") {
        return "close-circle"
    }
    else if(type === "info") {
        return  "notifications"
    }
}