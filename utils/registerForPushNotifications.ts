import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.getPermissionsAsync();
    finalStatus = status;
  }

  if(finalStatus !== "granted") return null;

  const tokenData = await Notifications.getExpoPushTokenAsync();

  return tokenData.data;
}
