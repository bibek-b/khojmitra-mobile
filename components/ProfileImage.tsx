import usePickImages from "@/hooks/usePickImages";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native";
import ImagePickerModal from "./common/ImagePickerModal";

export default function ProfileImage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string>("");

  // const { pickImages} = usePickImages()
  return (
    <View>
      <ImagePickerModal
        visible={isModalOpen}
        animationType="slide"
        onClose={() => setIsModalOpen(false)}
        setImage={setImage}
        selectionLimit={1}
        singleImage = {true}
      />
      <TouchableOpacity
        onPress={() => setIsModalOpen(true)}
        className=" rounded-full items-center w-full relative"
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
    </View>
  );
}
