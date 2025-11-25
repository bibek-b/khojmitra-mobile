import { PickImagesPropsType } from "@/types/common";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";

export default function usePickImages({
  selectionLimit,
  setImages,
  setImage,
  images,
  singleImage
}: PickImagesPropsType) {


  const pickImages = useCallback(
    async (source: "camera" | "gallery") => {
      let result: any;
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
              // const newImages = result?.assets.map((asset) => asset);
              // const mappedImgs = newImages.map(img => img.assetId)
              setImages?.((prev) => [...prev, ...result?.assets]);
            } else {
              // const newImg = result?.assets[0];
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
            selectionLimit: selectionLimit && (selectionLimit - images.length),
          });
            if (!result.canceled) {
              if (!singleImage) {
                // const newImages = result?.assets.map((asset) => asset.uri);
                // setImages  && setImages((prev) => [...prev, ...newImages]);
              setImages?.((prev) => [...prev, ...result?.assets]);

              } else {
                const newImg = result?.assets[0].uri;
                setImage && setImage(newImg);
              }
            }
        }
      } catch (error) {}
    },
    [selectionLimit, setImages, setImage, images]
  );

  return { pickImages };
}
