import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { View } from "react-native";

export default function SeparatorLine () {
    const { isDarkMode } = useContext(ThemeContext);
    return (
          <View
          className={`h-[3px] w-full  ${isDarkMode ? "bg-white/30": "bg-black/30"}`}
        />
    )
}