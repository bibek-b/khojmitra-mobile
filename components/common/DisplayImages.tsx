import { DisplayImagesProps } from "@/types/common";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function DisplayImages({
  images,
  setImages,
}: DisplayImagesProps) {
  const removeSelImages = (img: string) => {
    const updatedImages = images.filter((sm) => sm !== img);
    setImages(updatedImages);
  };
  return (
    <View className="gap-3">
      {images.length !== 0 && <Text className={`dark:text-[#f5f5f5]`}>Image(s)</Text>}
      {images.map((img, idx) =>  (
          <View
            key={idx}
            className="flex-row gap-4 bg-[#f5f5f5] rounded shadow"
          >
            <Image
              source={{ uri: img }}
              className=" w-full h-[200px]  my-8  rounded-xl"
            />
            <TouchableOpacity
              onPress={() => removeSelImages(img)}
              className="absolute right-0 -top-2"
            >
              <MaterialIcons name="close" size={28} className={`dark:mt-2`} />
            </TouchableOpacity>
          </View>
        )
      )}
    </View>
  );
}
