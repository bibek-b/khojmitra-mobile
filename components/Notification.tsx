import { ThemeContext } from "@/context/ThemeContext";
import { useNotificationDetailStore } from "@/store/useNotificationDetailStore";
import { NotificationPropType } from "@/types/notification";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { format } from "timeago.js";

export default function Notification({
  sender,
  post,
  createdAt,
  message,
}: NotificationPropType) {
  const { isDarkMode } = useContext(ThemeContext);
  const { setSender, setPost } = useNotificationDetailStore();
  const router = useRouter();

  const handleNotificationClick = () => {
    setSender(sender);
    setPost(post);
    router.navigate("/screens/notificationDetailScreen");
  };

  return (
    <TouchableOpacity
      className="p-5 flex-1 flex-row gap-2 "
      onPress={handleNotificationClick}
    >
      <View className="relative">
        <FontAwesome
          name="user-circle"
          size={54}
          color={isDarkMode ? "white" : "#1a1a1a"}
        />
        {/* <Text className="absolute text-2xl -bottom-2 right-0">{type === "Lost"? "🔴": "🟢"}</Text> */}
      </View>
      <View className="flex-row items-center">
        <View>
          <Text
            className={`max-w-[260px] flex-row flex-wrap ${isDarkMode ? "text-white" : "text-[#a1a1a1]"}`}
            numberOfLines={2.5}
          >
            <View>
              <Text className="dark:text-white">{message}</Text>
            </View>
          </Text>
          <Text
            className={`opacity-60 ${isDarkMode ? "text-white" : "text-black"}`}
          >
            {format(new Date(createdAt))}
          </Text>
        </View>
        {/* <TouchableOpacity className="absolute right-4 bottom-0">
         <Text className="text-sm  text-blue-600">View Detail</Text>
       </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
}
