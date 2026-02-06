import { ContentProps } from "@/types/content";
import { imageType } from "@/types/image";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Content({ proof, setSelectedImage }: ContentProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="gap-6">
      {proof?.description && (
        <>
          <Text
            numberOfLines={expanded ? undefined : 2}
            ellipsizeMode="tail"
            className={`tracking-wide mt-2 dark:text-[#f5f5f5]`}
          >
            {proof.description}
          </Text>
          {proof.description.trim().length > 97 && (
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text className="text-blue-600 font-medium -mt-1">
                {expanded ? "See Less" : "See More"}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {proof?.images && (
        <View className="flex-row  w-full flex-wrap justify-center gap-2">
          {proof.images.map((img: imageType, idx: number) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedImage(img)}
            >
              <Image
                source={{ uri: String(img) }}
                className="w-[160px] h-[160px] rounded-md shadow-md"
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
