import { postApi } from "@/api/postApi";
import { proofApi } from "@/api/proofApi";
import PossibleMatchDetail from "@/components/notification/notificationDetail/PossibleMatchDetail";
import ReportDetail from "@/components/notification/notificationDetail/ReportDetail";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useNotificationDetailStore } from "@/store/useNotificationDetailStore";
import { modalContentType } from "@/types/ConfirmModal";
import { ImgType } from "@/types/image";
import { PostType } from "@/types/post.types";
import { ProofType } from "@/types/proofForm";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotificationDetailScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const { sender, post, type, matchedPosts, relatedPost } =
    useNotificationDetailStore();
  const [proof, setProof] = useState<ProofType>();
  const [postsDetail, setPostsDetail] = useState<PostType[]>();
  const { showPopupNotification } = useContext(PopupNotificationContext);
  const [selectedImage, setSelectedImage] = useState<ImgType | null>(null);
  const { setModalContent, showConfirmModal } = useConfirmModalStore();
  const { showLoading, hideLoading } = useLoaderStore();
  useEffect(() => {
    if (!type) return;
    (async () => {
      try {
        showLoading("");
        if (type === "REPORT") {
          if (!sender._id || !post._id) {
            setProof(undefined);
            return;
          }
          const proofRes = await proofApi.getProofByClaimerAndPostId(
            sender?._id,
            post?._id,
          );
          setProof(proofRes.data.data);
        }

        if (type === "POSSIBLE_MATCH_OWNER") {
          if (!matchedPosts || matchedPosts.length === 0) {
            setPostsDetail([]);
            return;
          }
          const matchedPostIds = matchedPosts.map((m) => m.postId);

          const posts = await Promise.all(
            matchedPostIds?.map((id) => postApi.getPost(id)),
          );

          setPostsDetail(posts.map((p) => p.data.data));
        }
      } catch (error: any) {
        showPopupNotification?.({
          type: "error",
          message: error.response?.data?.message ?? "Something went wrong",
        });
      } finally {
        hideLoading();
      }
    })();
  }, [type, matchedPosts, sender, post]);

  const handleAction = (type: string) => {
    if (!sender || !post || !proof) return;
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

  console.log({proof})

const renderContent = () => {
  if (type === "REPORT") {
    if (proof) {
      return (
        <ReportDetail
          sender={sender}
          proof={proof}
          setSelectedImage={setSelectedImage}
          handleAction={handleAction}
        />
      );
    }
    return (
      <View className="flex-1 items-center justify-center py-16 px-6">
        <View
          className="w-20 h-20 rounded-full items-center justify-center mb-4"
          style={{ backgroundColor: "rgba(239, 68, 68, 0.15)" }}
        >
          <Ionicons name="document-text-outline" size={36} color="#ef4444" />
        </View>
        <Text className="text-white text-lg font-semibold mb-2">
          Proof Unavailable
        </Text>
        <Text className="text-gray-400 text-center text-sm">
          The proof is no longer available
        </Text>
      </View>
    );
  } else if (type === "POSSIBLE_MATCH_EXISTING") {
    if (relatedPost) {
      return <PossibleMatchDetail posts={relatedPost} />;
    }
    return (
      <View className="flex-1 items-center justify-center py-16 px-6">
        <View
          className="w-20 h-20 rounded-full items-center justify-center mb-4"
          style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}
        >
          <MaterialIcons name="post-add" size={36} color="#3b82f6" />
        </View>
        <Text className="text-white text-lg font-semibold mb-2">
          Post Unavailable
        </Text>
        <Text className="text-gray-400 text-center text-sm">
          The post is no longer available
        </Text>
      </View>
    );
  } else if (type === "POSSIBLE_MATCH_OWNER") {
    if (postsDetail && postsDetail.length > 0) {
      return <PossibleMatchDetail posts={postsDetail} />;
    }
    return (
      <View className="flex-1 items-center justify-center py-16 px-6">
        <View
          className="w-20 h-20 rounded-full items-center justify-center mb-4"
          style={{ backgroundColor: "rgba(139, 92, 246, 0.15)" }}
        >
          <Feather name="inbox" size={36} color="#8b5cf6" />
        </View>
        <Text className="text-white text-lg font-semibold mb-2">
          No Posts Found
        </Text>
        <Text className="text-gray-400 text-center text-sm">
          The posts are no longer available
        </Text>
      </View>
    );
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
        {renderContent()}
      </ScrollView>
    </View>
  );
}
