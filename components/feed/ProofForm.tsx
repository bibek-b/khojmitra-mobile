import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function ProofForm () {
    const { isDarkMode } = useContext(ThemeContext);
    return (
         <View className={`w-[325px] rounded-lg ${isDarkMode ? "bg-[#1e1e1e] " : "bg-gray-50"}`}>
            <Text>Proof Form</Text>
        </View>
    )
}