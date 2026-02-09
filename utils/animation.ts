import { AnimateValuePropsType } from "@/types/animation";
import { Animated } from "react-native";

export const animateValue = ({
  value,
  toValue,
  duration,
  useNativeDriver,
}: AnimateValuePropsType) => {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver,
  }).start();
};
