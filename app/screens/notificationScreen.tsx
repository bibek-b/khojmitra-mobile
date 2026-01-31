import { notificationApi } from "@/api/notificationApi";
import Notification from "@/components/Notification";
import { notificationData } from "@/constants/dummyData";
import { NotificationContext } from "@/context/NotificationContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function NotificationScreen() {
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  
  const { isDarkMode } = useContext(ThemeContext);
  const { showNotification } = useContext(NotificationContext);
  const { showLoading, hideLoading} = useLoaderStore();
  
  const { notifications, setNotifications } = useNotificationStore();
  const [slicedData, setSlicedData] = useState(notifications.slice(0, 9));

  useEffect(() => {
    (async () => {
      try {
        const res = await notificationApi.getNotifications();
        setNotifications(res?.data?.data);
      } catch (error: any) {
        console.log(error);
        showNotification &&
          showNotification({ type: "error", message: "Can't fetch post" });
      } finally {
        hideLoading();
      }
    })();
  },[])

  const handleLoadNotification = () => {
    // setSlicedData(notificationData);
    setIsBtnClicked(true);
  };
  return (
    <ScrollView className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#F9FAFB]"}`}>
      {slicedData.map((data, idx) => (
        <Notification
          key={data._id || idx}
          data={data}
        />
      ))}
      {slicedData.length > 9 && !isBtnClicked && (
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
