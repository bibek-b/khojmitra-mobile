import { postApi } from "@/api/postApi";
import { proofApi } from "@/api/proofApi";
import PossibleMatchDetail from "@/components/notification/notificationDetail/PossibleMatchDetail";
import ReportDetail from "@/components/notification/notificationDetail/ReportDetail";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { useNotificationDetailStore } from "@/store/useNotificationDetailStore";
import { modalContentType } from "@/types/ConfirmModal";
import { ServerImgType } from "@/types/image";
import { PostType } from "@/types/post.types";
import { ProofType } from "@/types/proofForm";
import { Feather } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Image, Modal, ScrollView, TouchableOpacity, View } from "react-native";

export default function NotificationDetailScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const { sender, post, type, matchedPosts, relatedPost } =
    useNotificationDetailStore();
  const [proof, setProof] = useState<ProofType>();
  const [postsDetail, setPostsDetail] = useState<PostType[]>();
  const { showPopupNotification } = useContext(PopupNotificationContext);
  const [selectedImage, setSelectedImage] = useState<ServerImgType | null>(null);
  const { setModalContent, showConfirmModal } = useConfirmModalStore();
  useEffect(() => {
    (async () => {
        if (type === "REPORT") {
         try {
           const proofRes = await proofApi.getProofByClaimerAndPostId(
             sender?._id,
             post?._id,
           );
           setProof(proofRes.data.data);
         } catch (error: any) {
          console.log({error})
           showPopupNotification?.({
          type: "error",
          message: error.response.data.message,
        });
         }
        }  else if (type === "POSSIBLE_MATCH_OWNER") {
          try {
            const matchedPostIds = matchedPosts.map((m) => m.postId);
  
            const posts = await Promise.all(
              matchedPostIds.map((id) => postApi.getPost(id)),
            );
  
            setPostsDetail(posts.map((p) => p.data.data));
          } catch (error: any) {
           showPopupNotification?.({
          type: "error",
          message: error.response.data.message,
        });
        }
      }
     
    })();
  }, []);
console.log({proof})
  const handleAction = (type: string) => {
    showConfirmModal();

    const isAccept = type === "accept";

    const data: modalContentType = {
      title: "Are you sure?",
      detail: `You want to ${isAccept ? "accept" : "decline"} this post "${post.title}" by ${sender.fullname} as ${proof?.claimType} and start chat with a person.`,
      confirmText: isAccept ? "Start Chatting" : "Yes Decline",
      confirmBtnVariant: isAccept ? "primary" : "danger",
    };
    if (type === "accept") {
      setModalContent(data);
    } else if (type == "decline") {
      setModalContent(data);
    }
  };

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-[#0f0f0f]" : "bg-[#F9FAFB]"}`}>
      {/* Image Modal */}
      {selectedImage && (
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
        {type === "REPORT" ? (
          <ReportDetail
            sender={sender}
            proof={proof!}
            setSelectedImage={setSelectedImage}
            handleAction={handleAction}
          />
        ) : (
          (type === "POSSIBLE_MATCH_EXISTING" ||
            type === "POSSIBLE_MATCH_OWNER") && (
            <PossibleMatchDetail posts={matchedPosts.length > 0 ? postsDetail! : relatedPost!} />
          )
        )}
      </ScrollView>
    </View>
  );
}
