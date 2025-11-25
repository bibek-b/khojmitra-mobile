import { Animated } from "react-native";


export type AnimatedStyleProp = Animated.AnimatedInterpolation<string | number>;

export type HeaderAnimationPropsType = {
  searchWidth?: AnimatedStyleProp;
  logoAnim?: AnimatedStyleProp;
  showSearchBar?: boolean;
  setShowSearchBar?: (show: boolean) => void;
};

export type AnimateValuePropsType = {
  value: Animated.Value;
  toValue: number;
  duration: number;
  useNativeDriver: boolean;
};