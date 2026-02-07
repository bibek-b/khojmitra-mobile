import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { format } from "timeago.js";
import Content from "../Content";
import Underline from "../Underline";
import { notificationDetailPostActionBtns } from "@/constants/notification";
import { ActionType, ReportDetailPropType } from "@/types/notificationDetail";

export default function ReportDetail({
  sender,
  proof,
  setSelectedImage,
  handleAction,
}: ReportDetailPropType) {
  const { isDarkMode } = useContext(ThemeContext);
  return (
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
            onPress={() => handleAction(b.accessor as ActionType)}
            key={b.id}
            className={`flex-1 py-2 rounded-xl flex-row items-center justify-center gap-2 
                  dark:bg-white/5
                  border ${b.accessor === "accept" ? "border-green-500/30" : "border-red-500/30"}

        `}
            activeOpacity={0.8}
          >
            <Ionicons
              name={
                b.accessor === "accept" ? "checkmark-circle" : "close-circle"
              }
              size={22}
              color={b.accessor === "accept" ? "#22c55e" : "#ef4444"}
            />
            <Text className=" dark:text-white font-bold text-base">
              {b.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
