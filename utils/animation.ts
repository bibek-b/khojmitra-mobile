import { Animated } from "react-native";
import { AnimateValueProps } from "../types/common";

export const animateValue = ({
  value,
  toValue,
  duration,
  useNativeDriver,
}: AnimateValueProps) => {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver,
  }).start();
};
