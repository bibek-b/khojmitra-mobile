import { ThemeContext } from "@/context/ThemeContext";
import usePickImages from "@/hooks/usePickImages";
import { ImagePickerModalPropTypes } from "@/types/common";
import { EvilIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
const ImagePickerModal = ({
  visible,
  animationType,
  onClose,
  setSelectedImages,
  selectionLimit = 1,
  setImage,
  singleImage
}: ImagePickerModalPropTypes) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { pickImages } = usePickImages({
    selectionLimit,
    setSelectedImages,
    setImage,
    singleImage
  });
  const handleCamera = async () => {
    await pickImages("camera");
    onClose();
  };

  const handleGallery = async () => {
    await pickImages("gallery");
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType={animationType}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/20">
          <TouchableWithoutFeedback>
            <View
              className={`absolute bottom-0  ${isDarkMode ? "bg-[#1e1e1e] " : "bg-gray-50"} w-full h-32 py-1`}
            >
              <Text
                className={`${isDarkMode ? "text-[#e0e0e0]" : "text-black"} text-center text-xl`}
              >
                Choose an option
              </Text>
              <View className="flex-row gap-6 w-full p-4">
                <TouchableOpacity
                  className="flex-col items-center"
                  onPress={handleCamera}
                >
                  <EvilIcons
                    name="camera"
                    size={36}
                    color={isDarkMode ? "#e0e0e0" : "black"}
                  />
                  <Text
                    className={`${isDarkMode ? "text-[#e0e0e0]" : "text-black"} text-xl`}
                  >
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-col items-center"
                  onPress={handleGallery}
                >
                  <EvilIcons
                    name="image"
                    size={36}
                    color={isDarkMode ? "#e0e0e0" : "black"}
                  />
                  <Text
                    className={`${isDarkMode ? "text-[#e0e0e0]" : "text-black"} text-xl`}
                  >
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImagePickerModal;
