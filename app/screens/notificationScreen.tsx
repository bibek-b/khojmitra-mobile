import { notificationApi } from "@/api/notificationApi";
import LoginPrompt from "@/components/common/LoginPrompt";
import OptimizedList from "@/components/common/OptimizedList";
import Notification from "@/components/Notification";
import { ThemeContext } from "@/context/ThemeContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useUserStore } from "@/store/useUserStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useContext, useEffect } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";

export default function NotificationScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const { showLoading, hideLoading } = useLoaderStore();

  const { notifications, setNotifications } = useNotificationStore();
  const toast = useToast();
  const { userId }  = useUserStore();

  useEffect(() => {
    (async () => {
      try {
        if(userId) {
          showLoading("notificationScreen");
        const res = await notificationApi.getMyNotifications(userId);
        setNotifications(res?.data?.data);
        }
      } catch (error: any) {
      const message = getErrorMessage(error);
        toast.show(message, {
          type: "danger",
        }); 
      } finally {
        hideLoading();
      }
    })();
  }, []);

  return (
    <View className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#F9FAFB]"} flex-1`}>
     {userId  ?  <OptimizedList
        data={notifications}
        parent="notification"
        renderItem={({ item }) => (
          <Notification
            key={item?._id}
            sender={item.sender}
            post={item.post}
            createdAt={item?.createdAt}
            title= {item.title}
            type={item.type}
            matchedPosts={item.matchedPosts}
            relatedPost={item.relatedPost}
          />
        )}
        keyExtractor={(item) => item._id!}
      />: <LoginPrompt screen="notifications" />}
    </View>
  );
}
