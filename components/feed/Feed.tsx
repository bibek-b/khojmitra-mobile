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
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
  ScrollView,
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
import React from "react";
import { Image } from "expo-image";
import { useUserStore } from "@/store/useUserStore";

/**
 * VARIANT 3 — "Soft Premium"
 * - Status badge becomes a small floating "ribbon" pill on the card corner
 * - Header keeps avatar + name but trims vertical padding
 * - Title is promoted to its own large heading line (separate from info row)
 * - Category / location / date condensed into a single horizontal stat bar
 *   with vertical dividers (like a boarding-pass / ticket stub)
 * - Image gallery becomes a horizontal ScrollView with paging + dot indicator
 * - Softer rounded corners (rounded-[28px]) and subtle 1px border for depth
 */

const moreOptions = [
  {
    id: 1,
    label: "Edit Post",
    icon: <Entypo name="edit" size={20} />,
    color: "#3b82f6",
  },
  {
    id: 2,
    label: "Delete Post",
    icon: <FontAwesome name="trash" size={18} />,
    color: "#ef4444",
  },
];

const Feed = ({ post, onDeletePost }: FeedProps) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImgType | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const isLost = post?.type === "Lost";
  const [moreOptionOpen, setMoreOptionOpen] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  const { showConfirmModal, setModalContent, setOnConfirm } =
    useConfirmModalStore();
  const { TrueEditPost } = usePostStore();
  const { isDarkMode } = useContext(ThemeContext);
  const { showForm, setProofForm } = useContext(ProofFormContext);
  const { userId } = useUserStore();

  const accent = isLost ? "#ef4444" : "#22c55e";
  const accentSoft = isLost ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.12)";
  const border = isDarkMode ? "#2a2a2a" : "#f0f0f0";



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
      detail:
        "Are you sure you want to delete this post? This action is irreversible!",
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
      className={`mx-4 m-6 overflow-hidden ${
        isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
      }`}
      style={{
        borderRadius: 28,
        borderWidth: 1.5,
        borderColor: border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDarkMode ? 0.4 : 0.05,
        shadowRadius: 14,
        elevation: 5,
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
          <View className="flex-1 bg-black/50 justify-end">
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
                              pathname: "/screens/addEditPostScreen",
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
                  className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                  onPress={() => setSelectedImage(null)}
                >
                  <Feather n ame="x" size={24} color="white" />
                </TouchableOpacity>
                <View className="bg-white/20 px-4 py-2 rounded-full">
                  <Text className="text-white font-semibold">
                    {imageIndex + 1} / {images.length}
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={selectedImage}
              style={{width: "100%", height: "100%"}}
            />
          </View>
        </Modal>
      )}

      {/* Header */}
      <View className="flex-row items-center px-5 pt-5 pb-4">
        <TouchableOpacity
          className="flex-row items-center gap-3 flex-1"
          onPress={() => router.push("/screens/profileScreen")}
        >
          <Image
            source={
              post?.user?.avatar ||
              "https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg"
            }
            style={{ width: 48, height: 48, borderRadius: 50 }}
          />
          <View className="flex-1">
            <Text
              className={`text-base font-bold ${
                isDarkMode ? "text-[#f5f5f5]" : "text-gray-900"
              }`}
              numberOfLines={1}
            >
              {post?.user?.fullname}
            </Text>
            <Text
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {format(new Date(post?.createdAt!))}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Ribbon-style status */}
        <View
          className="px-3 py-1.5 rounded-xl mr-2 flex-row items-center gap-1.5"
          style={{ backgroundColor: accentSoft }}
        >
          <Ionicons
            name={isLost ? "help-circle" : "checkmark-circle"}
            size={14}
            color={accent}
          />
          <Text className="font-bold text-xs" style={{ color: accent }}>
            {isLost ? "LOST" : "FOUND"}
          </Text>
        </View>

        {post.user?._id === userId && (
          <TouchableOpacity
            className="w-8 h-8 rounded-full items-center justify-center"
            onPress={() => parent === "myPost" && handleMorePress()}
          >
            <Entypo
              name="dots-three-horizontal"
              size={16}
              color={isDarkMode ? "#9ca3af" : "#6b7280"}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <View className="px-5 mb-3">
        <Text
          className={`text-xl font-extrabold ${
            isDarkMode ? "text-[#f5f5f5]" : "text-gray-900"
          }`}
        >
          {post.title}
        </Text>
      </View>

      {/* Image carousel */}
      {images && images.length > 0 && (
        <View className="mb-4">
          <ScrollView
            horizontal
            pagingEnabled
            style={{ width: "100%", aspectRatio: 16 / 10 }}
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const idx = Math.round(
                e.nativeEvent.contentOffset
                  .x /*current horz scroll position - Image 1 → x = 0
Image 2 → x = 360
Image 3 → x = 720*/ / e.nativeEvent.layoutMeasurement.width, //width of the ScrollView (viewport)
              );
              setActiveDot(idx);
            }}
            scrollEventThrottle={16}
          >
            {images.map((img: ImgType, idx: number) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.9}
                onPress={() => {
                  setSelectedImage(img.uri as ImgType);
                  setImageIndex(idx);
                }}
                style={{ aspectRatio: 16 / 10 }}
                className="px-5"
              >
                <Image
                  source={img.uri}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {images.length > 1 && (
            <View className="flex-row justify-center gap-1.5 mt-3">
              {images.map((_: ImgType, idx: number) => (
                <View
                  key={idx}
                  className="rounded-full"
                  style={{
                    width: activeDot === idx ? 16 : 6,
                    height: 6,
                    backgroundColor:
                      activeDot === idx
                        ? accent
                        : isDarkMode
                          ? "#3a3a3a"
                          : "#e5e7eb",
                  }}
                />
              ))}
            </View>
          )}
        </View>
      )}

      {/* Stat bar (ticket stub style) */}
      <View
        className="flex-row mx-5 mb-4 rounded-2xl overflow-hidden"
        style={{ borderWidth: 1, borderColor: border }}
      >
        {[
          { label: "Category", value: post.category, icon: "pricetag-outline" },
          {
            label: isLost ? "Lost at" : "Found at",
            value: post.location,
            icon: "location-outline",
          },
          { label: "Date", value: post.date, icon: "calendar-outline" },
        ].map((item, i) => (
          <View
            key={item.label}
            className="flex-1 items-center py-3 px-1"
            style={{
              borderLeftWidth: i === 0 ? 0 : 1,
              borderLeftColor: border,
            }}
          >
            <Ionicons name={item.icon as any} size={16} color={accent} />
            <Text
              className={`text-[10px] mt-1 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {item.label}
            </Text>
            <Text
              numberOfLines={1}
              className={`text-xs font-bold mt-0.5 ${
                isDarkMode ? "text-[#f5f5f5]" : "text-gray-900"
              }`}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <View className="px-5 mb-4">
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
            <Text className="font-semibold" style={{ color: accent }}>
              {expanded ? "Show Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Action button */}
      <View className="px-5 pb-5">
        {post.user?._id === userId ? (
          <TouchableOpacity
            className="flex-row items-center justify-center gap-3 py-4 rounded-2xl"
            style={{ backgroundColor: "rgba(34,197,94,0.12)" }}
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
            style={{ backgroundColor: accent }}
          >
            {type === "Lost" ? (
              <FontAwesome5 name="handshake" size={20} color="#fff" />
            ) : (
              <Feather name="user-check" size={22} color="#fff" />
            )}
            <Text className="font-bold text-base text-white">
              {type === "Lost" ? "I Found This Item!" : "This is My Item!"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default React.memo(Feed);
