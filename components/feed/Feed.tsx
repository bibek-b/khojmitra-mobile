import { PostType } from "@/types/common";
import {
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ImageViewing from "react-native-image-viewing";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { ProofFormContext } from "@/context/ProofFormContext";

const moreOptions = [
  { id: 1, label: "Edit Post", icon: <Entypo name="edit" size={20} /> },
  { id: 2, label: "Delete Post", icon: <FontAwesome name="trash" size={20} /> },
];

export default function Feed({
  username,
  type,
  createdAt,
  item,
  category,
  location,
  date,
  description,
  images,
  parent,
}: PostType) {
  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isLost = type === "Lost";
  const [moreOptionOpen, setMoreOptionOpen] = useState(false);

  const { isDarkMode } = useContext(ThemeContext);
  const { showForm, setProofFormType } = useContext(ProofFormContext);

  const handleMorePress = () => {
    setMoreOptionOpen(true);
  };
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
                        opt.label === "Edit Post" &&
                          router.push({
                            pathname: "/addEditReportScreen",
                            params: { isEditPost: "true" },
                          });
                        setMoreOptionOpen(false);
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

      
      <ImageViewing
        images={images.map((img) => ({ uri: img }))}
        imageIndex={images.findIndex((img) => img === selectedImage)}
        visible={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
        animationType="slide"
        HeaderComponent={({ imageIndex }) => (
          <View
            style={{
              paddingTop: 50,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text className="text-[#f5f5f5] text-xl">
              {imageIndex + 1} / {images.length}
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedImage(null)}
              className="absolute right-0 p-4"
            >
              <Feather name="x" size={28} color="[#f5f5f5]" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        className="absolute right-3 top-10"
        onPress={() => parent === "myPost" && handleMorePress()}
      >
        {parent === "myPost" ? (
          <Entypo name="dots-three-horizontal" size={24} color="gray" />
        ) : (
          <Feather name="x" size={28} color={isDarkMode ? "#e0e0e0" : "gray"} />
        )}
      </TouchableOpacity>
      <View className="px-4 ">
        <View className="flex-row items-center gap-2 pt-6 ">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.push("/profileScreen")}
          >
            <EvilIcons
              name="user"
              size={50}
              color={isDarkMode ? "#f5f5f5" : "black"}
            />
            <Text
              className={`text-xl font-bold ${isDarkMode && "text-[#f5f5f5]"}`}
            >
              {username}
            </Text>
          </TouchableOpacity>
          <Text className={`font-medium ${isDarkMode && "text-[#F5F5F5]"}`}>
            {isLost ? "🔴 Lost" : "🟢 Found"}
          </Text>
          <Text className={`opacity-60 ${isDarkMode && "text-[#f5f5f5]"}`}>
            {createdAt}
          </Text>
        </View>
        <View className="gap-2">
          {[
            { key: `${isLost ? "Lost" : "Found"} Item`, value: item },
            { key: "Category", value: category },
            { key: `${isLost ? "Lost" : "Found"} Location`, value: location },
            { key: `${isLost ? "Lost" : "Found"} Date`, value: date },
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
            {images.map((img) => (
              <TouchableOpacity key={img} onPress={() => setSelectedImage(img)}>
                <Image
                  source={{
                    uri: img,
                  }}
                  className="w-[160px] h-[160px] rounded-md shadow-md"
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => (showForm?.(), setProofFormType?.(type.toLowerCase()))}
            className="flex-row items-center gap-3 justify-start pt-6"
          >
            {type === "Lost" ? (
              <FontAwesome5 name="handshake" size={24} color={isDarkMode ? "white" : "black"} />
            ) : (
              <Feather name="user-check" size={24} color={isDarkMode ? "white" : "black"} />
            )}
            <Text className={`${isDarkMode && "text-[#f5f5f5]"} `}>
              {type === "Lost" ? "I Found This" : "This is Mine"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
