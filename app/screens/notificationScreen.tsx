import { notificationApi } from "@/api/notificationApi";
import Notification from "@/components/Notification";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { getItem } from "@/utils/AsyncStorage";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export default function NotificationScreen() {
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const { isDarkMode } = useContext(ThemeContext);
  const { showPopupNotification } = useContext(PopupNotificationContext);
  const { showLoading, hideLoading } = useLoaderStore();

  const { notifications, setNotifications } = useNotificationStore();
  // const [slicedData, setSlicedData] = useState(notifications.slice(0, 9));

  useEffect(() => {
    (async () => {
      try {
        showLoading('notificationScreen');
        const me = await getItem("user");
        const res = await notificationApi.getMyNotifications(me?._id);
        setNotifications(res?.data?.data);
      } catch (error: any) {
        showPopupNotification?.({
          type: "error",
          message: "Error fetching notifications!",
        });
      } finally {
        hideLoading();
      }
    })();
  }, []);


  const handleMoreNotification = () => {
    setIsBtnClicked(true);
  };

  return (
    <ScrollView className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#F9FAFB]"}`}>
      {notifications.length > 0 ? (
        notifications.map((data, idx) => (
          <Notification
          key={data?._id || idx}
            sender={data.sender}
            post={data.post}
            createdAt={data?.createdAt}
            message={data.message}
            type={data.type}
            matchedPosts={data.matchedPosts}
            relatedPost={data.relatedPost}
          />
        ))
      ) : (
        <Text className="text-white/60 text-lg mt-60 ml-32 ">
          No notification yet!
        </Text>
      )}
      {notifications.length > 9 && !isBtnClicked && (
        <TouchableOpacity
          className=" mb-4 items-center"
          onPress={handleMoreNotification}
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
