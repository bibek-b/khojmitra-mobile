import { displayImageProps, ImgType } from "@/types/image";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { getImageUri } from "@/utils/getImageUri";
import { Image } from 'expo-image';

export default function DisplayImages({
  images,
  setImages,
}: displayImageProps) {
  const removeSelImages = (imgUri: ImgType) => {
    setImages(images?.filter((img: ImgType) => img.uri !== imgUri));
  };
  return (
    <View className="gap-3">
      {images?.length !== 0 && (
        <Text className={`dark:text-[#f5f5f5]`}>Image(s)</Text>
      )}
      {images?.map((img: ImgType, idx: number) => {
        return (
          <View
            key={idx}
            className="flex-row gap-4 bg-[#f5f5f5] rounded shadow"
          >
            <Image
              source={ getImageUri(img)}
              style={{width: "100%", height: 200, marginVertical: 8, borderRadius: 12}}
            />
            <TouchableOpacity
              onPress={() => removeSelImages(img.uri as ImgType)}
              className="absolute right-0 -top-2"
            >
              <MaterialIcons name="close" size={28} className={`dark:mt-2`} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
