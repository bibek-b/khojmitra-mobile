import { ReportType } from "@/types/report";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

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

      {!!selectedImage && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedImage("")}
        >
          <View className="flex-1 bg-black justify-center items-center">
            <TouchableOpacity
              className="absolute top-12 right-6 z-10"
              onPress={() => setSelectedImage("")}
            >
              <Feather name="x" size={32} color="#f5f5f5" />
            </TouchableOpacity>
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}
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
