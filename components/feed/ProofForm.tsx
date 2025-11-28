import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
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
import { ProofFormContext } from "@/context/ProofFormContext";

export default function ProofForm() {
  const { isDarkMode } = useContext(ThemeContext);
  const { isFormVisible, hideForm, proofFormType } = useContext(ProofFormContext);

  const { showNotification } = useContext(NotificationContext);
  const [images, setImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const scaleAnim = useRef(new Animated.Value(0.1)).current;

  const handleSubmit = () => {
    if (images.length === 0 && description.trim().length === 0) {
      showNotification &&
        showNotification({
          type: "error",
          message: "Please fill description or upload an image.",
        });
    }
  };

  const closeFormWithAnim = (onComplete?: () => void) => {
    setDescription('');
    setImages([]);
    Animated.timing(scaleAnim, {
      toValue: 0.1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onComplete?.();
    });
  };
  useEffect(() => {
    if (!isFormVisible) return;

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFormVisible]);
  return (
    isFormVisible && (
      <TouchableWithoutFeedback onPress={() => closeFormWithAnim(hideForm)}>
        <View className="w-full h-full absolute top-0 left-0 bg-black/60 justify-center items-center ">
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "android" ? "padding" : "height"}>
              <Animated.View
                style={{ transform: [{ scale: scaleAnim }] }}
                className={`w-[330px] min-h-80  max-h-full  rounded-lg ${isDarkMode ? "bg-[#1e1e1e] " : "bg-gray-50"}   p-2`}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="my-4 gap-2">
                    <Text className="dark:text-[#f5f5f5] text-4xl text-center font-bold capitalize tracking-widest">
                      {proofFormType} proof form
                    </Text>
                    <Text className="dark:text-white opacity-60 text-center">You can submit with both or only one fields.</Text>
                    <View className="h-[2px] w-full bg-[#1976D2]"/>
                  </View>

                  <View className="gap-4 my-4">
                    <Text className="dark:text-[#f5f5f5]">
                      Can you describe what you {proofFormType}?
                    </Text>
                    <TextInput
                      className={` border ${isDarkMode ? "border-[#f5f5f5]/40 text-[#f5f5f5]  placeholder:text-[#f5f5f5]/50 " : "border-black/40"} p-4  rounded-lg h-40`}
                      placeholder={`Describe what you have ${proofFormType}..`}
                      textAlignVertical="top"
                      multiline={true}
                      onChangeText={setDescription}
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
                      Can you upload the image(s) of what you've {proofFormType}?
                    </Text>
                    <DisplayImages images={images} setImages={setImages} />
                    <UploadImgBtn
                      images={images}
                      setIsModalOpen={setIsModalOpen}
                    />
                  </View>

                  <View className="flex-row justify-between my-4">
                    <TouchableOpacity
                      className={`border ${isDarkMode ? "border-[#f5f5f5]/40  placeholder:text-[#f5f5f5]/50 text-[#f5f5f5]" : "border-black/40"} rounded p-2 w-32`}
                      onPress={() => closeFormWithAnim(hideForm)}
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
              </Animated.View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    )
  );
}
