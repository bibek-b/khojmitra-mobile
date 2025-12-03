import { HeaderAnimationPropsType } from "@/types/animation";
import { router } from "expo-router";
import { Animated, Text, TouchableOpacity } from "react-native";

export default function HeaderLeft({
  logoAnim,
  showSearchBar,
}: HeaderAnimationPropsType) {
  return (
    <Animated.View
      style={{
        opacity: logoAnim?.interpolate({
          inputRange: [-50, 0],
          outputRange: [0, 1],
        }),
        transform: [{ translateX: logoAnim! }],
      }}
    >
      {!showSearchBar && (
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text className="text-3xl pl-2 text-[#1976D2] dark:text-white font-bold">
            KhojMitra
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
