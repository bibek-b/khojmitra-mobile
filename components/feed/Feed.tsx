import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
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
} from "react-native";
// dynamically loaded on client to avoid server bundling of native-only files
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { ProofFormContext } from "@/context/ProofFormContext";
import { format } from "timeago.js";
import { getItem } from "@/utils/AsyncStorage";
import { FeedProps } from "@/types/feed";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { ServerImgType } from "@/types/image";
import { usePostStore } from "@/store/usePostStore";

const moreOptions = [
  { id: 1, label: "Edit Post", icon: <Entypo name="edit" size={20} /> },
  { id: 2, label: "Delete Post", icon: <FontAwesome name="trash" size={20} /> },
];

export default function Feed({ post, onDeletePost }: FeedProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ServerImgType | null>(null);
  const isLost = post.type === "Lost";
  const [moreOptionOpen, setMoreOptionOpen] = useState(false);
  const [myId, setMyId] = useState("");
  const { showConfirmModal, confirmModal, setModalContent, setOnConfirm } =
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

  // useEffect(() => {
  //   if (confirmModal) {
  //     setModalContent({
  //       title: "Delete post",
  //       detailInfo: "Are you sure you want to delete this post?",
  //       acceptText: "Yes, Delete",
  //       denyText: "Cancel",
  //       acceptBtnBg: "bg-red-500",
  //     });

  //     setOnConfirm(() => {
  //       onDeletePost?.(idToDelete);
  //     });
  //   } else {
  //     setModalContent({
  //       title: "",
  //       detailInfo: "",
  //       acceptText: "",
  //       denyText: "",
  //       acceptBtnBg: "",
  //     });
  //   }
  // }, [confirmModal]);

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

  const images = post.images!;
  const type = post.type!;
  const description = post.description!;

  const parent = "myPost";

  console.log({images})
  return (
    <View>
      <Modal
        visible={moreOptionOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMoreOptionOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMoreOptionOpen(false)}>
          <View className={`flex-1 bg-black/20 `}>
            <TouchableWithoutFeedback>
              <View
                className={`absolute bottom-0  ${isDarkMode ? "bg-[#1e1e1e]" : "bg-gray-50"} p-5 rounded-tr-2xl rounded-tl-2xl w-full`}
              >
                <View className={`px-2 gap-4 rounded-2xl`}>
                  {moreOptions.map((opt) => (
                    <TouchableOpacity
                      key={opt.id}
                      className="flex-row items-center gap-4"
                      onPress={() => {
                        opt.label === "Edit Post"
                          ? (router.push({
                              pathname: "/screens/addEditReportScreen",
                              params: { idToUpdate: post?._id },
                            }),
                            TrueEditPost())
                          : handleDeletePost(post._id!);
                      }}
                    >
                      <Text
                        className={`${isDarkMode ? "text-[#e0e0e0]" : "text-black"}`}
                      >
                        {opt.icon}
                      </Text>
                      <Text
                        className={`text-xl font-semibold ${isDarkMode ? "text-[#f5f5f5]" : "text-black"}`}
                      >
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
              source={{ uri: String(selectedImage) }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}

      {post.user._id === myId && (
        <TouchableOpacity
          className="absolute right-3 top-2"
          onPress={() => parent === "myPost" && handleMorePress()}
        >
          <Entypo name="dots-three-horizontal" size={24} color="gray" />
        </TouchableOpacity>
      )}

      <View className="px-4 ">
        <View className="flex-row gap-4 py-2  ">
          <View className=" relative ">
            <TouchableOpacity
              className="flex-row items- gap-2"
              onPress={() => router.push("/screens/profileScreen")}
            >
              <Image
                source={{
                  uri:
                    post?.user?.avatar ||
                    "https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg",
                }}
                className="w-12 h-12 object-cover rounded-full "
              />
              <Text
                className={`text-xl font-bold ${isDarkMode && "text-[#f5f5f5]"}`}
              >
                {post?.user?.fullname}
              </Text>
            </TouchableOpacity>
            <Text
              className={`opacity-60 ${isDarkMode && "text-[#f5f5f5]"} absolute bottom-1 left-14 text-sm`}
            >
              {format(new Date(post?.createdAt!))}
            </Text>
          </View>
          <Text className={`font-medium ${isDarkMode && "text-[#F5F5F5]"}`}>
            {isLost ? "🔴 Lost" : "🟢 Found"}
          </Text>
        </View>
        <View className="gap-2">
          {[
            { key: `${isLost ? "Lost" : "Found"} Item`, value: post.title },
            { key: "Category", value: post.category },
            {
              key: `${isLost ? "Lost" : "Found"} Location`,
              value: post.location,
            },
            { key: `${isLost ? "Lost" : "Found"} Date`, value: post.date },
          ].map((item) => (
            <View key={item.key} className="flex-row pt-2">
              <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>
                {item.key}:
              </Text>
              <Text
                className={`font-semibold ${isDarkMode && "text-[#f5f5f5]"}`}
              >
                {" "}
                {item.value}
              </Text>
            </View>
          ))}

          <Text
            numberOfLines={expanded ? undefined : 2}
            ellipsizeMode="tail"
            className={`tracking-wide mt-2 ${isDarkMode && "text-[#f5f5f5]"}`}
          >
            {description}
          </Text>
          {description.trim().length > 97 && (
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text className="text-blue-600 font-medium -mt-1">
                {expanded ? "See Less" : "See More"}
              </Text>
            </TouchableOpacity>
          )}

          <View className="flex-row  w-full flex-wrap justify-center gap-2">
            {images.map((img: ServerImgType, idx: number) => (
              <TouchableOpacity key={idx} 
              onPress={() => setSelectedImage(img.url as ServerImgType)}
              >
                <Image
                  source={{ uri: img.url }}
                  className="w-[160px] h-[160px] rounded-md shadow-md"
                />
              </TouchableOpacity>
            ))}
          </View>

          {post.user._id === myId ? (
            <TouchableOpacity className="flex-row items-center gap-3 justify-start pt-6">
              <AntDesign
                name="check-circle"
                size={24}
                color={isDarkMode ? "white" : "black"}
              />
              <Text className={`${isDarkMode && "text-[#f5f5f5]"} `}>
                Resolve
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
              className="flex-row items-center gap-3 justify-start pt-6"
            >
              {type === "Lost" ? (
                <FontAwesome5
                  name="handshake"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
              ) : (
                <Feather
                  name="user-check"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
              )}
              <Text className={`${isDarkMode && "text-[#f5f5f5]"} `}>
                {type === "Lost" ? "I Found This" : "This is Mine"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
