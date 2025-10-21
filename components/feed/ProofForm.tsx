import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import UploadImgBtn from "../common/UploadImgBtn";
import ImagePickerModal from "../common/ImagePickerModal";
import DisplayImages from "../common/DisplayImages";
import { Feather } from "@expo/vector-icons";
import { NotificationContext } from "@/context/NotificationContext";

export default function ProofForm({ setIsPostBtnClicked }: any) {
  const { showNotification } = useContext(NotificationContext);
  const [images, setImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");

  const { isDarkMode } = useContext(ThemeContext);

  const handleSubmit = () => {
    if (images.length === 0 && description.trim().length === 0) {
      showNotification &&
        showNotification({
          type: "error",
          message: "Please fill description or upload an image.",
        });
    }
  };
  return (
    <TouchableWithoutFeedback>
      <View
        className={`w-[330px] min-h-80 max-h-full rounded-lg ${isDarkMode ? "bg-[#1e1e1e] " : "bg-gray-50"}   p-2`}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between my-4">
            <Text className="dark:text-[#f5f5f5] text-4xl text-center font-bold">
              Found Proof Form
            </Text>
            <Feather
              name="x"
              size={28}
              color={isDarkMode ? "#e0e0e0" : "gray"}
              onPress={() => setIsPostBtnClicked(false)}
            />
          </View>

          <View className="gap-4 my-4">
            <Text className="dark:text-[#f5f5f5]">
              Can you describe what you found?
            </Text>
            <TextInput
              className={` border ${isDarkMode ? "border-[#f5f5f5]/40 text-[#f5f5f5]  placeholder:text-[#f5f5f5]/50 " : "border-black/40"} p-4  rounded-lg h-40`}
              placeholder="Describe what you have found.."
              textAlignVertical="top"
              multiline={true}
            />
          </View>

          <ImagePickerModal
            visible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectionLimit={4}
            setImages={setImages}
            images={images}
          />

          <View className="gap-4 my-4">
            <Text className="dark:text-[#f5f5f5]">
              Can you upload the image(s) of what you've found?
            </Text>
            <DisplayImages images={images} setImages={setImages} />
            <UploadImgBtn images={images} setIsModalOpen={setIsModalOpen} />
          </View>

          <View className="flex-row gap-6 my-4">
            <TouchableOpacity
              className={`border ${isDarkMode ? "border-[#f5f5f5]/40  placeholder:text-[#f5f5f5]/50 text-[#f5f5f5]" : "border-black/40"} rounded p-2 w-32`}
              onPress={() => setIsPostBtnClicked(false)}
            >
              <Text
                className={`text-center text-[16px] ${isDarkMode && "text-[#f5f5f5]"}`}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#1976D2] p-2 rounded w-[120px]"
              onPress={() => handleSubmit()}
            >
              <Text className="text-[#f5f5f5] text-[16px] text-center">
                Submit Report
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
