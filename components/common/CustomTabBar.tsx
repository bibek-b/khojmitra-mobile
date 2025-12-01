import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Fab from "./Fab";

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        // Center position → space for floating button
        if (index === Math.floor(state.routes.length / 2)) {
          return (
            <View key={route.key} style={styles.centerSpace}>
              <Fab /> 
            </View>
          );
        }

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={styles.tabButton}
          >
            {options.tabBarIcon?.({ focused: isFocused, color: "black", size: 20 })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#111",
    justifyContent: "space-around",
    alignItems: "center",
    position: "relative",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  centerSpace: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30, // lifts button above bar
  }
});
