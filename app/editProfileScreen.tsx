import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePicker from "./common/ImagePicker";
import { useContext, useState } from "react";
import { router } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";

export default function EditProfile() {
  const [image, setImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | "">("");
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      className={`flex-1 justify-center ${isDarkMode && "bg-[#1a1a1a]"} items-center`}
    >
      <View className={` ${isDarkMode ? "bg-[#242424]": "bg-white"} w-[80%]  px-4 py-6 rounded-lg shadow gap-4`}>
        <ImagePicker image={image!} setImage={setImage} />

        <View className="gap-2">
          <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            className={`border border-gray-300 px-2 rounded text-left ${isDarkMode && "placeholder:text-[#f5f5f5] text-[#f5f5f5]"}`}
            placeholder="Enter your full name.."
          />
        </View>

        <View className="flex-row gap-4">
          <TouchableOpacity
            className="border border-gray-300 p-2 rounded w-[70px]"
            onPress={() => router.back()}
          >
            <Text className={`text-[16px] ${isDarkMode && "text-[#f5f5f5]"}`}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#1976D2]  w-[70px] rounded justify-center">
            <Text className="text-[#f5f5f5] text-center  text-[16px]">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
