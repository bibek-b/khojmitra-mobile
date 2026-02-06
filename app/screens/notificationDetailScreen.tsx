import { proofApi } from "@/api/proofApi";
import Content from "@/components/notification/Content";
import Underline from "@/components/notification/Underline";
import { notificationDetailPostActionBtns } from "@/constants/notification";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useNotificationDetailStore } from "@/store/useNotificationDetailStore";
import { imageType } from "@/types/image";
import { ProofType } from "@/types/proofForm";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { format } from "timeago.js";

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
    <View className={`flex-1 ${isDarkMode ? "bg-[#0f0f0f]" : "bg-[#F9FAFB]"}`}>
      {/* Image Modal */}
      {!!selectedImage && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedImage(null)}
        >
          <View className="flex-1 bg-black/95 justify-center items-center">
            <TouchableOpacity
              className="absolute top-12 right-6 z-10 bg-white/10 backdrop-blur-md rounded-full p-2"
              onPress={() => setSelectedImage(null)}
              activeOpacity={0.8}
            >
              <Feather name="x" size={28} color="#f5f5f5" />
            </TouchableOpacity>
            <Image
              source={{ uri: String(selectedImage) }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Content Card */}
        <View
          className={`mx-4 my-8 rounded-3xl ${
            isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
          } shadow-xl overflow-hidden border ${
            isDarkMode ? "border-white/5" : "border-gray-100"
          }`}
        >
          {/* User Header */}
          <View className="p-5">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                className="flex-row items-center gap-3 flex-1"
                activeOpacity={0.7}
              >
                {/* Avatar with ring */}
                <View className="relative">
                  <View className="absolute inset-0 bg-blue-500/20 rounded-full blur-md" />
                  <Image
                    source={{
                      uri:
                        sender.avatar ||
                        "https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg",
                    }}
                    className="w-14 h-14 rounded-full border-2 border-blue-500/30"
                  />
                  {/* Online indicator */}
                  <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-[#1a1a1a]" />
                </View>

                <View className="flex-1">
                  <Text
                    className={`text-lg font-bold ${
                      isDarkMode ? "text-[#f5f5f5]" : "text-gray-900"
                    }`}
                  >
                    {sender?.fullname}
                  </Text>
                  <Text className="text-gray-500 dark:text-gray-400 text-sm">
                    @{sender?.fullname || "user"}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Timestamp badge */}
              <View
                className={`px-3 py-1.5 rounded-full ${
                  isDarkMode ? "bg-white/5" : "bg-gray-100"
                }`}
              >
                <Text className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                  {format(new Date(proof!?.createdAt))}
                </Text>
              </View>
            </View>

            {/* Claim Type Badge */}
            <View className="mt-3 bg-gray-100 dark:bg-white/5 rounded-xl p-3 flex-row items-center justify-center gap-2">
              <Ionicons name="shield-checkmark" size={18} color="#3B82F6" />
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                Claimed as
              </Text>
              <Text className="font-bold text-blue-600 capitalize">
                {proof?.claimType}
              </Text>
            </View>
          </View>

          {/* Proof Content */}
          <View className="p-5">
            <Content proof={proof} setSelectedImage={setSelectedImage} />
          </View>
          <Underline />

          {/* Action Buttons */}
          <View className="px-4 py-4 flex-row gap-3">
            {notificationDetailPostActionBtns.map((b) => (
              <TouchableOpacity
                key={b.id}
                className={`flex-1 py-2 rounded-xl flex-row items-center justify-center gap-2 border 
        ${b.accessor === "accept" ? "border-green-500" : "border-red-500"}
        `}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={
                    b.accessor === "accept"
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={22}
                  color={b.accessor === "accept" ? "#22c55e" : "#ef4444"}
                />
                <Text className="text-white font-bold text-base">
                  {b.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
