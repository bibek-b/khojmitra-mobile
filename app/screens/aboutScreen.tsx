import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { View, Text } from "react-native";

export default function AboutScreen() {
  const year = new Date().getFullYear();
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <View className={`flex-1 items-center justify-center gap-4 p-6 ${isDarkMode && "bg-[#1a1a1a]"}`}>
      <Text className={`font-bold text-3xl ${isDarkMode && "text-[#f5f5f5]"}`} >KhojMitra</Text>

      <Text className={`text-gray-500 ${isDarkMode && "text-gray-300"} mb-6`}>
        Your trusted companion for finding lost & found items.
      </Text>

      <View className="flex-row gap-2">
        <Text className={`font-bold ${isDarkMode && "text-[#f5f5f5]"}`}>Version:</Text>
        <Text className={`text-gray-600 ${isDarkMode && "text-gray-300"}`}>1.0.0</Text>
      </View>

      <Text className={`text-gray-500 ${isDarkMode && "text-gray-300"}`}>
        &copy; {year} KhojMitra. All rights reserved.
      </Text>
    </View>
  );
}
