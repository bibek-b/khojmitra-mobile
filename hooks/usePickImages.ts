import { ImagePickerTypes } from "@/types/image";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";

export default function usePickImages({
  selectionLimit,
  setImages,
  setImage,
  images,
  singleImage,
  isSignUp
}: ImagePickerTypes) {
  const pickImages = useCallback(
    async (source: "camera" | "gallery") => {
      let result: any;
      console.log(source)
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
            setImages?.((prev) => [...prev, ...result?.assets]);
            } else {
              setImage?.(result?.assets[0]);
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
            selectionLimit: isSignUp ? 1 : selectionLimit && selectionLimit - images!.length,
          });
          if (!result.canceled) {
            if (!singleImage) {
              setImages?.((prev) => [...prev, ...result?.assets]);
            } else {
              const newImg = result?.assets[0];
              setImage && setImage(newImg);
              console.log(newImg)
            }
          }
        }
      } catch (error) {}
    },
    [selectionLimit, setImages, setImage, images]
  );

  return { pickImages };
}
