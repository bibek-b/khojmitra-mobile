import {  useRef } from "react";
import { Animated } from "react-native";
import { animateValue } from "../utils/animation";

export const useHeaderAnimations = () => {
  const searchWidth = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  const animateHeader = (showSearchBar: boolean) => {
    animateValue({value: searchWidth, toValue: showSearchBar ? 1 : 0, duration: 300, useNativeDriver: false});
    animateValue({value: logoAnim, toValue: showSearchBar ? -50 : 0, duration: 300, useNativeDriver: true});
  };

  return {
    searchWidth,
    logoAnim,
    animateHeader,
  };
};
