import Notification from "@/components/Notification";
import { notificationData } from "@/constants/dummyData";
import { ThemeContext } from "@/context/ThemeContext";
import { userNotificationStore } from "@/store/useNotificationStore";
import { useContext, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import socket from "../lib/socket";
console.log(socket.connected);
export default function NotificationScreen() {
  const [slicedData, setSlicedData] = useState(notificationData.slice(0, 9));
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const { isDarkMode } = useContext(ThemeContext);

  const { notifications } = userNotificationStore();

  const handleLoadNotification = () => {
    setSlicedData(notificationData);
    setIsBtnClicked(true);
  };
  return (
    <ScrollView className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#F9FAFB]"}`}>
      {slicedData.map((data) => (
        <Notification
          key={data.id}
          username={data.username}
          message={data.message}
          date={data.date}
        />
      ))}
      {notificationData.length > 9 && !isBtnClicked && (
        <TouchableOpacity
          className=" mb-4 items-center"
          onPress={handleLoadNotification}
        >
          <Text
            className={`text-white text-center  ${isDarkMode ? "bg-white/30" : "bg-black/30"} text-[18px] font-medium px-10 py-2 w-[90%] rounded-md`}
          >
            See previous notifications
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
