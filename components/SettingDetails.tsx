import { ThemeContext } from "@/context/ThemeContext";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const options = [
  {
    id: 1,
    label: "Edit Profile",
    icon: <MaterialIcons name="manage-accounts" size={24} />,
  },
  // {
  //   id: 2,
  //   label: "Dark Mode",
  //   icon: <MaterialIcons name="dark-mode" size={24} />,
  // },
  // { id: 3, label: "App Preferences", icon: <Ionicons name="options" size={24} /> },
  {
    id: 3,
    label: "Notifications",
    icon: <MaterialIcons name="notifications-on" size={24} />,
  },
  {
    id: 4,
    label: "Language",
    icon: <FontAwesome name="language" size={24} />,
  },
  { id: 5, label: "About", icon: <AntDesign name="exclamation" size={24} /> },
];

export default function SettingDetails() {
  const { isDarkMode } = useContext(ThemeContext);

  const handlePress = (label: string) => {
    if(label === "Language") {
      router.push('/languageScreen');
    }
     if(label === "About") {
      router.push("/aboutScreen")
    }
    if(label === "Edit Profile") {
      router.push("/editProfileScreen");
    }
    if(label === "Dark Mode") {

    }
  }
  return (
    <View className="gap-6">
      {options.map((o) => (
        <View className="gap-2" key={o.id}>
          <TouchableOpacity className="flex-row items-center justify-between  px-4" onPress={() => handlePress(o.label)}>
            <View className="flex-row items-center gap-3">
              <Text className={`${isDarkMode ? "text-[#e0e0e0]": "text-black"}`}>{o.icon}</Text>
              <Text className={`font-medium text-[16px] ${isDarkMode ? "text-[#f5f5f5]": "text-black"}`}>{o.label}</Text>
            </View>
            {/* o.label === "Dark Mode"  ? (
              <MaterialCommunityIcons
                name="toggle-switch-off-outline"
                size={30}
                color={isDarkMode ? "white": "black"}
              />
            ) : */}
            { (o.label === "Notifications") ? <MaterialCommunityIcons name="toggle-switch" size={34}   color={isDarkMode ? "#e0e0e0": "black"}/> :(
              <AntDesign name="right" size={20}  color={isDarkMode ? "#e0e0e0": "gray"} />
            )}
          </TouchableOpacity>
          <View className="h-px w-full bg-gray-200" />
        </View>
      ))}
    </View>
  );
}
