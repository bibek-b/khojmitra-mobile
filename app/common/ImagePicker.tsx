import { ImagePickerPropTypes } from "@/types/common";
import { Feather } from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CommonImagePicker({ image, setImage }: ImagePickerPropTypes) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
     setImage && setImage(result?.assets[0].uri);
    }
  };
  return (
    <TouchableOpacity
      className=" rounded-full items-center w-full relative"
      onPress={() => pickImage()}
    >
      <Feather
        name="camera"
        size={28}
        color="white"
        className="absolute  top-12"
      />
      <Image
        source={{
          uri: image
            ? image
            : "https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg",
        }}
        className="w-32 h-32  object-cover rounded-full -z-10"
      />
    </TouchableOpacity>
  );
}
