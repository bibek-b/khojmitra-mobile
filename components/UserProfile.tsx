import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function UserProfile() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <View>
      <View className="items-center">
        <FontAwesome name="user" size={80} color={isDarkMode ? "#e0e0e0" : "black"} />
        <Text className={`text-3xl font-medium ${isDarkMode ? "text-[#f5f5f5]": "text-black"}`}>Bibek Bishwokarma</Text>
      </View>
      <View className="py-5 px-5">
        {/* <Text className="text-xl font-medium">Details</Text>
        <View className="mt-2">
            <View className="flex-row items-center ">
                <Ionicons name="location-outline" size={24} />
                <Text className="text-[18px]">From: <Text className="font-bold">Dhading, Nepal</Text></Text>
            </View>
        </View> */}
      </View>
    </View>
  );
}
