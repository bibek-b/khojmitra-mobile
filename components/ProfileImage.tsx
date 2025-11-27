import usePickImages from "@/hooks/usePickImages";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native";
import ImagePickerModal from "./common/ImagePickerModal";
import { imageType } from "@/types/image";

export default function ProfileImage({setImg}: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<imageType>({});

  useEffect(() => {
    if(image) setImg(image)
    },[image])
    console.log("profile img: ",image)

  // const { pickImages} = usePickImages()
  return (
    <View>
      <ImagePickerModal
        visible={isModalOpen}
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
            uri: 
               image?.uri 
              ?? "https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg",
          }}
          className="w-32 h-32  object-cover rounded-full -z-10"
        />
      </TouchableOpacity>
    </View>
  );
}
