import { ThemeContext } from "@/context/ThemeContext";
import { NotificationType } from "@/types/common";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";


export default function Notification({username, message, date, type}: NotificationType) {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <TouchableOpacity className="p-5 flex-1 flex-row gap-2 ">
      <View className="relative">
        <FontAwesome name="user-circle" size={54}  color={isDarkMode ? "white": "#1a1a1a"}/>
     <Text className="absolute text-2xl -bottom-2 right-0">{type === "Lost"? "🔴": "🟢"}</Text>
      </View>
      <View className="text-sm">
        <Text className={`max-w-[260px] flex-row flex-wrap ${isDarkMode ? "text-white": "text-[#a1a1a1]"}`} numberOfLines={2}>
        <Text className={`font-semibold `}>{username}: </Text>
        {message}
      </Text>
      <Text className={`opacity-60 ${isDarkMode ? "text-white": "text-black"}`}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}
