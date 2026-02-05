import { proofApi } from "@/api/proofApi";
import Content from "@/components/notification/Content";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useNotificationDetailStore } from "@/store/useNotificationDetailStore";
import { ProofType } from "@/types/proofForm";
import { ReportType } from "@/types/report";
import { Ionicons } from "@expo/vector-icons";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function NotificationDetailScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const { sender, post } = useNotificationDetailStore();
  const [proof, setProof] = useState<ProofType>();
  const { showPopupNotification } = useContext(PopupNotificationContext);

  console.log(post._id);

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
      <View className="p-4 ">
        <View className="flex-row items-center">
          <Text className="dark:text-white">Type: </Text>
          <TouchableOpacity
            className="bg-blue-600  py-1 px-4 rounded-full flex-row items-center justify-center
                 gap-2"
          >
            <Text className="text-white">Report</Text>
            <Ionicons name="chevron-down" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-4 py-2  ">
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
            ellipsizeMode="tail"
            className={`tracking-wide mt-2 ${isDarkMode && "text-[#f5f5f5]"}  font-medium`}
          >
            Claimed post as
          </Text>
          <Text
            className={`tracking-wide mt-2 ${isDarkMode && "text-[#f5f5f5]"}  font-medium capitalize`}
          >
            {proof?.claimType}
          </Text>
        </View>
        <Text className={` dark:text-[#f5f5f5] font-semibold`}>Proofs</Text>
        <Content proof={proof} />
      </View>
    </View>
  );
}
