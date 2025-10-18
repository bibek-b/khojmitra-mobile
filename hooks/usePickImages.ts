import { PickImagesPropsType } from "@/types/common";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";

export default function usePickImages({
  selectionLimit,
  setSelectedImages,
  setImage,
  singleImage
}: PickImagesPropsType) {
  const pickImages = useCallback(
    async (source: "camera" | "gallery") => {
      let result;
      try {
        if (source === "camera") {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();

          if (status !== "granted") {
            alert("Camera permission is required to take a photo.");
            return;
          }

          result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled) {
            if (!singleImage) {
              const newImages = result?.assets.map((asset) => asset.uri);
              setSelectedImages && setSelectedImages((prev) => [...prev, ...newImages]);
            } else {
              const newImg = result?.assets[0].uri;
              setImage && setImage(newImg);
            }
          }
        } else {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (status !== "granted") {
            alert("Permission to access gallery is required.");
            return;
          }
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            allowsMultipleSelection: true,
            quality: 1,
            selectionLimit: selectionLimit,
          });
          console.log(result.assets);
            if (!result.canceled) {
              if (!singleImage) {
                const newImages = result?.assets.map((asset) => asset.uri);
                setSelectedImages && setSelectedImages((prev) => [...prev, ...newImages]);
              } else {
                const newImg = result?.assets[0].uri;
                setImage && setImage(newImg);
              }
            }
        }
      } catch (error) {}
    },
    [selectionLimit, setSelectedImages, setImage]
  );

  return { pickImages };
}
