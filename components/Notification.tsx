import { ThemeContext } from "@/context/ThemeContext";
import { NotificationPropType } from "@/types/notification";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { format } from "timeago.js";


export default function Notification({data}: NotificationPropType) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <TouchableOpacity className="p-5 flex-1 flex-row gap-2 ">
      <View className="relative">
        <FontAwesome name="user-circle" size={54}  color={isDarkMode ? "white": "#1a1a1a"}/>
     {/* <Text className="absolute text-2xl -bottom-2 right-0">{type === "Lost"? "🔴": "🟢"}</Text> */}
      </View>
      <View>
        <Text className={`max-w-[260px] flex-row flex-wrap ${isDarkMode ? "text-white": "text-[#a1a1a1]"}`} numberOfLines={2}>
        <Text className={`font-semibold `}>{data?.senderName}</Text>
        <View>
          <Text className="dark:text-white">Reported to your <Text className="font-bold dark:text-white">{data.postTitle} </Text> post</Text>
        </View>
      </Text>
      <Text className={`opacity-60 ${isDarkMode ? "text-white": "text-black"}`}>{format(data.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}
