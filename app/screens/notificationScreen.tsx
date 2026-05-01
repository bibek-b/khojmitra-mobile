import { notificationApi } from "@/api/notificationApi";
import OptimizedList from "@/components/common/OptimizedList";
import Notification from "@/components/Notification";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { getItem } from "@/utils/AsyncStorage";
import { useContext, useEffect } from "react";
import { View } from "react-native";

export default function NotificationScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const { showPopupNotification } = useContext(PopupNotificationContext);
  const { showLoading, hideLoading } = useLoaderStore();

  const { notifications, setNotifications } = useNotificationStore();

  useEffect(() => {
    (async () => {
      try {
        showLoading("notificationScreen");
        const me = await getItem("user");
        const res = await notificationApi.getMyNotifications(me?._id);
        console.log({res})
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

  return (
    <View className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#F9FAFB]"} flex-1`}>
      <OptimizedList
        data={notifications}
        renderItem={({ item }) => (
          <Notification
            key={item?._id}
            sender={item.sender}
            post={item.post}
            createdAt={item?.createdAt}
            title= {item.title}
            message={item.message}
            type={item.type}
            matchedPosts={item.matchedPosts}
            relatedPost={item.relatedPost}
          />
        )}
        keyExtractor={(item) => item._id!}
      />
    </View>
  );
}
