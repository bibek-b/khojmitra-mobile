import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function Fab() {
  return (
    <TouchableOpacity className=" w-12 h-12 rounded-full p-2 bg-[#1976D2] mx-2  items-center flex-row justify-center gap-2" onPress={() => router.push('/addEditReportScreen')}>
      <AntDesign name="plus" size={24} color="white" />
      {/* <Text className="text-white text-center text-xl">Add Report</Text> */}
    </TouchableOpacity>
  );
}
