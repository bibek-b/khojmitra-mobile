import { ReportType } from "@/types/report";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ImageViewing from "react-native-image-viewing";

export default function MyReports({ report }: { report: ReportType }) {
  const images = report?.images;
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <View className="p-5 gap-4 ">
      <View className="flex-row items-center">
        <Text className="dark:text-white text-lg">Claim Type: </Text>
        <Text className="dark:text-white text-lg font-semibold capitalize">
          {report?.claimType}
        </Text>
      </View>
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center">
          <Text className="dark:text-white text-lg">Post Title: </Text>
          <Text className="dark:text-white text-lg font-semibold">
            {report?.post?.title}
          </Text>
        </View>
        <TouchableOpacity>
          <Text className="text-[#1976D2]">See more..</Text>
        </TouchableOpacity>
      </View>

      <ImageViewing
        images={images.map((img) => ({ uri: img }))}
        imageIndex={images.findIndex((img) => img === selectedImage)}
        visible={!!selectedImage}
        onRequestClose={() => setSelectedImage("")}
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
              onPress={() => setSelectedImage("")}
              className="absolute right-0 p-4"
            >
              <Feather name="x" size={28} color="#f5f5f5" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View>
        {images.length > 0 ? (
          <View className="flex-row  w-full flex-wrap justify-center gap-2">
            {images.map((img, idx) => (
              <TouchableOpacity key={idx} onPress={() => setSelectedImage(img)}>
                <Image
                  source={{
                    uri: img,
                  }}
                  className="w-[160px] h-[160px] rounded-md shadow-md"
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View>
            <Text className="dark:text-white text-lg ">Description</Text>
            <Text className="dark:text-white text-lg font-semibold">
              {report?.description}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center">
        <Text className="dark:text-white text-lg ">Status: </Text>
        <Text className="dark:text-white text-lg font-semibold">Pending</Text>
      </View>
    </View>
  );
}
