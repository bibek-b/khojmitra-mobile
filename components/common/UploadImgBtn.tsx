import { UploadImgBtnProp } from "@/types/common";
import { Text, TouchableOpacity } from "react-native";

export default function UploadImgBtn({images, setIsModalOpen}: UploadImgBtnProp) {
  return (
    <TouchableOpacity
      className={`${images.length == 4 ? "bg-[#4a4949]" : "bg-[#1976D2]"} p-2 rounded`}
      onPress={() => setIsModalOpen(true)}
      disabled={images.length == 4}
    >
      <Text className="text-xl text-[#f5f5f5] text-center">
        Upload image(s)
      </Text>
    </TouchableOpacity>
  );
}
