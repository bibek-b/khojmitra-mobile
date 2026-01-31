import { ThemeContext } from "@/context/ThemeContext";
import { useSearchFeedStore } from "@/store/useSearchFeedStore";
import { HeaderAnimationPropsType } from "@/types/animation";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HeaderRight({
  showSearchBar,
  setShowSearchBar,
  searchWidth,
}: HeaderAnimationPropsType) {
  const { isDarkMode } = useContext(ThemeContext);
  const { searchInput, setSearchInput } = useSearchFeedStore();

  return (
    <View className="flex-row pr-2 gap-4 ">
      <Animated.View
        style={{
          width: searchWidth?.interpolate({
            inputRange: [0, 1],
            outputRange: ["30%", "100%"],
          }),
        }}
      >
        {showSearchBar && (
          <View
            className={`border w-full ${isDarkMode ? "border-white/30" : "border-black/30"}  rounded-full flex-row items-center justify-between px-2 `}
          >
            <TextInput
              className={`flex-1 px-4 text-base ${isDarkMode ? "text-[#e0e0e0] placeholder:text-white" : "text-black"}`}
              placeholder="Search"
              autoFocus={showSearchBar}
              value={searchInput}
              onChangeText={setSearchInput}
            />
            <TouchableOpacity
              onPress={() => (setShowSearchBar?.(false), setSearchInput(""))}
            >
              <Feather
                name="x"
                size={22}
                color="white"
                className="bg-[#1a1a1a]/50 w-8 h-8  rounded-full text-center py-0.5 "
              />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
      {!showSearchBar && (
        <>
          <TouchableOpacity
            className="p-2"
            onPress={() => setShowSearchBar?.(true)}
          >
            <Feather
              name="search"
              size={28}
              color={isDarkMode ? "#E0E0E0" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 relative"
            onPress={() => router.push("/screens/notificationScreen")}
          >
            <Ionicons
              name="notifications-outline"
              size={28}
              color={isDarkMode ? "#E0E0E0" : "black"}
            />
            <Text
              className={`h-5 w-5 text-center right-1 top-1 rounded-full bg-red-500 text-sm absolute text-white `}
            >
              1
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
