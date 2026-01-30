import Notification from "@/components/Notification";
import { notificationData } from "@/constants/dummyData";
import { ThemeContext } from "@/context/ThemeContext";
import { userNotificationStore } from "@/store/useNotificationStore";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function NotificationScreen() {
  const [slicedData, setSlicedData] = useState(notificationData.slice(0, 9));
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const { isDarkMode } = useContext(ThemeContext);

  const { notifications } = userNotificationStore();

  useEffect(() => {
    try {
      
    } catch (error) {
      
    }
  },[])


  const handleLoadNotification = () => {
    setSlicedData(notificationData);
    setIsBtnClicked(true);
  };
  return (
    <ScrollView className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#F9FAFB]"}`}>
      {notifications.map((data, idx) => (
        <Notification
          key={data._id || idx}
          data={data}
        />
      ))}
      {notifications.length > 9 && !isBtnClicked && (
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
