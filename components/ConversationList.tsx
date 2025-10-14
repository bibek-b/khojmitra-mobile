import { ThemeContext } from "@/context/ThemeContext";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ConversationList() {
  const { isDarkMode } = useContext(ThemeContext);
  const user = {
    avatar: "https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/7728/1746255777728-i",
    username: "Jay Hanuman"
  }
  return (
    <TouchableOpacity className="flex-row items-center gap-4" onPress={() => router.push({pathname: '/chatScreen', params: { avatar: user.avatar, username: user.username }})}>
      <View className="relative">
        <Image
        source={{
          uri: "https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/7728/1746255777728-i",
        }}
        className="w-16 h-16 object-cover rounded-full"
      />
      {/* <Text className="h-4 w-4 bg-green-500 absolute rounded-full bottom-2 right-0" /> */}
      </View>
      <View>
        <Text className={`text-xl font-medium ${isDarkMode ? "text-white": "text-black"}`}>Bibek Gd</Text>
        <Text className={`opacity-80 ${isDarkMode ? "text-white": "text-black"}`}>You: Hello 11 sept</Text>
      </View>
    </TouchableOpacity>
  );
}
