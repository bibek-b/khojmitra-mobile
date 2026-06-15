import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Failed to get push token for push notification!");
      return null;
    }
  }

  // Get the token
  try {
    const tokenData = await Notifications.getExpoPushTokenAsync();
    return tokenData.data;
  } catch (error) {
    console.error("Error getting push token:", error);
    return null;
  }
}
