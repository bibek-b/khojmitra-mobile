import { ThemeContext } from "@/context/ThemeContext";
import { useNotificationDetailStore } from "@/store/useNotificationDetailStore";
import { NotificationPropType } from "@/types/notification";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
    router.navigate({ pathname: "/screens/notificationDetailScreen" });
  };

  return (
    <TouchableOpacity
      className={`mx-4 my-2 p-4 rounded-2xl flex-row gap-3 ${
        isDarkMode ? "bg-white/5" : "bg-white"
      } border ${isDarkMode ? "border-white/10" : "border-gray-100"}`}
      onPress={handleNotificationClick}
      activeOpacity={0.7}
    >
      {/* Avatar with notification badge */}
      <View className="relative">
        {sender?.avatar ? (
          <Image
            source={{ uri: sender.avatar }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <View className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 items-center justify-center">
            <Ionicons
              name="person"
              size={24}
              color={isDarkMode ? "#60A5FA" : "#3B82F6"}
            />
          </View>
        )}
        
        {/* Notification type indicator */}
        <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full items-center justify-center border-2 border-white dark:border-[#0f0f0f]">
          <Ionicons name="notifications" size={10} color="white" />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text
          className={`text-base leading-5 mb-1 ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
          numberOfLines={2}
        >
          {message}
        </Text>

        <View className="flex-row items-center gap-1.5 mt-1">
          <Ionicons
            name="time-outline"
            size={12}
            color={isDarkMode ? "#9CA3AF" : "#6B7280"}
          />
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(createdAt))}
          </Text>
        </View>
      </View>

      {/* Arrow indicator */}
      <View className="justify-center">
        <Ionicons
          name="chevron-forward"
          size={20}
          color={isDarkMode ? "#4B5563" : "#D1D5DB"}
        />
      </View>
    </TouchableOpacity>
  );
}