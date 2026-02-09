import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { ProofFormContext } from "@/context/ProofFormContext";
import { format } from "timeago.js";
import { getItem } from "@/utils/AsyncStorage";
import { FeedProps } from "@/types/feed";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { ImgType } from "@/types/image";
import { usePostStore } from "@/store/usePostStore";



const moreOptions = [
  { 
    id: 1, 
    label: "Edit Post", 
    icon: <Entypo name="edit" size={22} />,
    color: "#3b82f6"
  },
  { 
    id: 2, 
    label: "Delete Post", 
    icon: <FontAwesome name="trash" size={20} />,
    color: "#ef4444"
  },
];

export default function Feed({ post, onDeletePost }: FeedProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImgType | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const isLost = post?.type === "Lost";
  const [moreOptionOpen, setMoreOptionOpen] = useState(false);
  const [myId, setMyId] = useState("");
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  
  const { showConfirmModal, setModalContent, setOnConfirm } =
    useConfirmModalStore();
  const { TrueEditPost } = usePostStore();
  const { isDarkMode } = useContext(ThemeContext);
  const { showForm, setProofForm } = useContext(ProofFormContext);

  useEffect(() => {
    (async () => {
      const user = await getItem("user");
      setMyId(user?._id);
    })();
  }, []);

  useEffect(() => {
    if (moreOptionOpen) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
    }
  }, [moreOptionOpen]);

  const handleDeletePost = (id: string) => {
    showConfirmModal();
    setModalContent({
      title: "Delete post",
      detail: "Are you sure you want to delete this post? This action is irreversible!",
      confirmText: "Yes, Delete",
      confirmBtnVariant: "danger",
    });
    setOnConfirm(() => {
      onDeletePost?.(id);
    });
    setMoreOptionOpen(false);
  };

  const handleMorePress = async () => {
    setMoreOptionOpen(true);
  };

  const images = post?.images!;
  const type = post?.type!;
  const description = post?.description!;
  const parent = "myPost";

  return (
    <View 
      className={`mx-4 mb-6 rounded-3xl overflow-hidden shadow-2xl ${
        isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
      }`}
      style={{
        shadowColor: isDarkMode ? "#000" : "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: isDarkMode ? 0.5 : 0.1,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      {/* More Options Modal */}
      <Modal
        visible={moreOptionOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setMoreOptionOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMoreOptionOpen(false)}>
          <View className="flex-1 bg-black/50 backdrop-blur-lg justify-end">
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: scaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [300, 0],
                      }),
                    },
                  ],
                  opacity: fadeAnim,
                }}
                className={`${
                  isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
                } rounded-t-3xl overflow-hidden`}
              >
                <View className="h-1.5 w-12 bg-gray-400 rounded-full self-center mt-3 mb-4" />
                
                <View className="px-6 pb-8">
                  {moreOptions.map((opt, idx) => (
                    <TouchableOpacity
                      key={opt.id}
                      className={`flex-row items-center gap-4 py-4 px-4 rounded-2xl ${
                        idx !== moreOptions.length - 1 ? "mb-2" : ""
                      }`}
                      style={{
                        backgroundColor: isDarkMode ? "#2a2a2a" : "#f8f9fa",
                      }}
                      onPress={() => {
                        opt.label === "Edit Post"
                          ? (router.push({
                              pathname: "/screens/addEditReportScreen",
                              params: { idToUpdate: post?._id },
                            }),
                            TrueEditPost())
                          : handleDeletePost(post?._id!);
                      }}
                    >
                      <View
                        className="w-10 h-10 rounded-xl items-center justify-center"
                        style={{ backgroundColor: `${opt.color}20` }}
                      >
                        <Text style={{ color: opt.color }}>{opt.icon}</Text>
                      </View>
                      <Text
                        className={`text-lg font-semibold flex-1 ${
                          isDarkMode ? "text-[#f5f5f5]" : "text-gray-800"
                        }`}
                      >
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedImage(null)}
        >
          <View className="flex-1 bg-black">
            <View className="absolute top-0 left-0 right-0 z-20 pt-12 px-6 pb-6">
              <View className="flex-row justify-between items-center">
                <TouchableOpacity
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md items-center justify-center"
                  onPress={() => setSelectedImage(null)}
                >
                  <Feather name="x" size={24} color="#fff" />
                </TouchableOpacity>
                <View className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                  <Text className="text-white font-semibold">
                    {imageIndex + 1} / {images.length}
                  </Text>
                </View>
              </View>
            </View>

            <Image
              source={{ uri: String(selectedImage) }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}

      {/* Header */}
      <View className="relative">
        {/* Status Badge with Gradient */}
        <View className="absolute top-4 left-4 z-10">
          <View
            className="px-4 py-2 rounded-full flex-row items-center gap-2"
            style={{
              backgroundColor: isLost
                ? "rgba(239, 68, 68, 0.15)"
                : "rgba(34, 197, 94, 0.15)",
            }}
          >
            <View
              className={`w-2 h-2 rounded-full ${
                isLost ? "bg-red-500" : "bg-green-500"
              }`}
            />
            <Text
              className={`font-bold text-sm ${
                isLost ? "text-red-500" : "text-green-500"
              }`}
            >
              {isLost ? "LOST" : "FOUND"}
            </Text>
          </View>
        </View>

        {/* More Options Button */}
        {post.user?._id === myId && (
          <TouchableOpacity
            className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
            }}
            onPress={() => parent === "myPost" && handleMorePress()}
          >
            <Entypo
              name="dots-three-horizontal"
              size={20}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        )}

        {/* User Info */}
        <View className="px-5 pt-20 pb-5">
          <TouchableOpacity
            className="flex-row items-center gap-3"
            onPress={() => router.push("/screens/profileScreen")}
          >
            <View className="relative">
              <Image
                source={{
                  uri:
                    post?.user?.avatar ||
                    "https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg",
                }}
                className="w-14 h-14 rounded-full"
                style={{
                  borderWidth: 3,
                  borderColor: isLost ? "#ef4444" : "#22c55e",
                }}
              />
              <View
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full items-center justify-center"
                style={{
                  backgroundColor: isLost ? "#ef4444" : "#22c55e",
                }}
              >
                <Ionicons
                  name={isLost ? "alert-circle" : "checkmark-circle"}
                  size={12}
                  color="white"
                />
              </View>
            </View>

            <View className="flex-1">
              <Text
                className={`text-lg font-bold ${
                  isDarkMode ? "text-[#f5f5f5]" : "text-gray-900"
                }`}
              >
                {post?.user?.fullname}
              </Text>
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={isDarkMode ? "#9ca3af" : "#6b7280"}
                />
                <Text
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {format(new Date(post?.createdAt!))}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="px-5 pb-5">
        {/* Info Cards */}
        <View className="gap-3 mb-4">
          {[
            {
              key: `${isLost ? "Lost" : "Found"} Item`,
              value: post.title,
              icon: "cube-outline",
            },
            {
              key: "Category",
              value: post.category,
              icon: "pricetag-outline",
            },
            {
              key: `${isLost ? "Lost" : "Found"} Location`,
              value: post.location,
              icon: "location-outline",
            },
            {
              key: `${isLost ? "Lost" : "Found"} Date`,
              value: post.date,
              icon: "calendar-outline",
            },
          ].map((item) => (
            <View
              key={item.key}
              className={`p-4 rounded-2xl flex-row items-center gap-3 ${
                isDarkMode ? "bg-[#252525]" : "bg-gray-50"
              }`}
            >
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{
                  backgroundColor: isLost
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(34, 197, 94, 0.1)",
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={isLost ? "#ef4444" : "#22c55e"}
                />
              </View>
              <View className="flex-1">
                <Text
                  className={`text-xs font-medium mb-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.key}
                </Text>
                <Text
                  className={`text-base font-semibold ${
                    isDarkMode ? "text-[#f5f5f5]" : "text-gray-900"
                  }`}
                >
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Description */}
        <View
          className={`p-4 rounded-2xl mb-4 ${
            isDarkMode ? "bg-[#252525]" : "bg-gray-50"
          }`}
        >
          <Text
            numberOfLines={expanded ? undefined : 3}
            ellipsizeMode="tail"
            className={`text-base leading-6 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {description}
          </Text>
          {description.trim().length > 97 && (
            <TouchableOpacity
              onPress={() => setExpanded(!expanded)}
              className="mt-2"
            >
              <Text
                className="font-semibold"
                style={{ color: isLost ? "#ef4444" : "#22c55e" }}
              >
                {expanded ? "Show Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Images Grid */}
        {images && images.length > 0 && (
          <View className="mb-4">
            <View
              className={`flex-row flex-wrap justify-center gap-2`}
            >
              {images.map((img: ImgType, idx: number) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setSelectedImage(img.uri as ImgType);
                    setImageIndex(idx);
                  }}
                  className="rounded-xl overflow-hidden"
                  style={{
                    width:
                      images.length === 1
                        ? "100%"
                        : 142,
                    height: images.length === 1 ? 250 : 140,
                  }}
                >
                  <Image
                    source={{ uri: img.uri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Action Button */}
        {post.user?._id === myId ? (
          <TouchableOpacity
            className="flex-row items-center justify-center gap-3 py-4 rounded-2xl"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(34, 197, 94, 0.15)"
                : "rgba(34, 197, 94, 0.1)",
            }}
          >
            <AntDesign name="check-circle" size={22} color="#22c55e" />
            <Text className="text-green-500 font-bold text-base">
              Mark as Resolved
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => (
              showForm?.(),
              setProofForm?.({
                type: type.toLowerCase() as "lost" | "found",
                postId: post?._id!,
                postOwnerId: post?.user?._id,
              })
            )}
            className="flex-row items-center justify-center gap-3 py-4 rounded-2xl"
            style={{
              backgroundColor: isLost
                ? "rgba(59, 130, 246, 0.15)"
                : "rgba(139, 92, 246, 0.15)",
            }}
          >
            {type === "Lost" ? (
              <FontAwesome5
                name="handshake"
                size={20}
                color={isLost ? "#3b82f6" : "#8b5cf6"}
              />
            ) : (
              <Feather
                name="user-check"
                size={22}
                color={isLost ? "#3b82f6" : "#8b5cf6"}
              />
            )}
            <Text
              className="font-bold text-base"
              style={{ color: isLost ? "#3b82f6" : "#8b5cf6" }}
            >
              {type === "Lost" ? "I Found This Item!" : "This is My Item!"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}