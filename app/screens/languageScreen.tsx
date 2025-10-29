import { languages } from "@/constants/languages";
import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function LanguageScreen() {
    const language = "en";
    const { isDarkMode} = useContext(ThemeContext);
  return (
    <View className={`p-5 flex-1 gap-2 ${isDarkMode && "bg-[#1a1a1a]"}`}>
      {languages.map((l) => (
        <View key={l.code} className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className={`text-xl ${isDarkMode && "text-white"}`}>{l.label}</Text>
           <TouchableOpacity>
            {l.code === language ? <Ionicons name="radio-button-on" size={20} color={isDarkMode ? "white" : "black"} /> :  <Ionicons name="radio-button-off-sharp" size={20} color={isDarkMode ? "white" : "black"}/>}
           </TouchableOpacity>
          </View>
          <View className="h-px w-full bg-gray-500" />
        </View>
      ))}
    </View>
  );
}
