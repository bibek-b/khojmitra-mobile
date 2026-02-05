import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function NotificationDetailScreen(){
      const { isDarkMode } = useContext(ThemeContext);
    return (
        <View className={`flex-1 ${isDarkMode ?"bg-[#1a1a1a]": "bg-[#F9FAFB]"}`}><Text>Noti detail</Text></View>
    )
}