import { proofApi } from "@/api/proofApi";
import SeparatorLine from "@/components/common/SeparatorLine";
import Content from "@/components/notification/Content";
import { notificationDetailPostActionBtns } from "@/constants/notification";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useNotificationDetailStore } from "@/store/useNotificationDetailStore";
import { imageType } from "@/types/image";
import { ProofType } from "@/types/proofForm";
import { ReportType } from "@/types/report";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

export default function NotificationDetailScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const { sender, post } = useNotificationDetailStore();
  const [proof, setProof] = useState<ProofType>();
  const { showPopupNotification } = useContext(PopupNotificationContext);
  const [selectedImage, setSelectedImage] = useState<imageType | null>(null);


  useEffect(() => {
    (async () => {
      try {
        const res = await proofApi.getProofByClaimerAndPostId(
          sender._id,
          post._id,
        );
        setProof(res.data.data);
      } catch (error: any) {
        showPopupNotification?.({
          type: "error",
          message: error.response.data.message,
        });
      }
    })();
  }, []);

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#F9FAFB]"}`}>
       {!!selectedImage && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedImage(null)}
        >
          <View className="flex-1 bg-black justify-center items-center">
            <TouchableOpacity
              className="absolute top-12 right-6 z-10"
              onPress={() => setSelectedImage(null)}
            >
              <Feather name="x" size={32} color="#f5f5f5" />
            </TouchableOpacity>
            <Image
              source={{ uri:  String(selectedImage) }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}
      <View>
        <View className="flex-row items-center p-4">
          <Text className="dark:text-white">Type: </Text>
          <TouchableOpacity
            className="bg-blue-600  py-1 px-4 rounded-full flex-row items-center justify-center
                 gap-2"
          >
            <Text className="text-white">Report</Text>
            <Ionicons name="chevron-down" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <SeparatorLine />

        <View className="gap-3 p-4">
          <View className="flex-row gap-4">
            <View className=" flex-row gap-10 items-center ">
              <TouchableOpacity
                className="flex-row items-center gap-2"
                //   onPress={() => router.push("/screens/profileScreen")}
              >
                <Image
                  source={{
                    uri:
                      sender.avatar ||
                      "https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg",
                  }}
                  className="w-12 h-12 object-cover rounded-full "
                />
                <Text
                  className={`text-xl font-bold ${isDarkMode && "text-[#f5f5f5]"}`}
                >
                  {sender?.fullname}
                </Text>
              </TouchableOpacity>
              <Text
                className={`opacity-60 ${isDarkMode && "text-[#f5f5f5]"}  text-sm`}
              >
                {/* {format(new Date(post?.createdAt!))} */}
                1h
              </Text>
            </View>
          </View>

          <View className="gap-1 flex-row items-center justify-center">
            <Text
              className={`tracking-wide  ${isDarkMode && "text-[#f5f5f5]"}`}
            >
              Claimed post as
            </Text>
            <Text
              className={`tracking-wide  ${isDarkMode && "text-[#f5f5f5]"}  font-medium capitalize`}
            >
              {proof?.claimType}
            </Text>
          </View>

          <Text className={` dark:text-[#f5f5f5] font-semibold text-lg`}>
            Proof(s)
          </Text>

          <Content proof={proof} setSelectedImage={setSelectedImage} />

          <View className="flex-row justify-between mt-4">
            {notificationDetailPostActionBtns.map((b) => (
              <TouchableOpacity key={b.id} className="flex-row items-center gap-2">
                <FontAwesome
                  name={
                    b.iconName as React.ComponentProps<
                      typeof FontAwesome
                    >["name"]
                  } 
                  size={20}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text className="text-white">{b.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <SeparatorLine />
        </View>
      </View>
    </View>
  );
}
