import { ContentProps } from "@/types/content";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Underline from "./Underline";
import { ImgType } from "@/types/image";

export default function Content({ proof, setSelectedImage }: ContentProps) {
  const [expanded, setExpanded] = useState(false);


  return (
    <View className="gap-4">
          <View className="gap-2">
            <View className="flex-row items-center gap-2 px-1">
              <View className="w-8 h-8 rounded-full bg-purple-500/20 items-center justify-center">
               <Ionicons name="document-attach" size={18} color="#3B82F6" />
            </View>
            <Text className="text-gray-700 dark:text-gray-300 font-semibold text-base">
              Evidence 
            </Text>
            </View>
        <Underline />          
          </View>

      {/* Description */}
      {proof?.description && (
        <View>
          <Text
            numberOfLines={expanded ? undefined : 3}
            ellipsizeMode="tail"
            className="text-gray-700 dark:text-gray-200 leading-6 text-base"
          >
            {proof.description}
          </Text>

          {proof.description.trim().length > 100 && (
            <TouchableOpacity 
              onPress={() => setExpanded(!expanded)}
              className="mt-2"
            >
              <Text className="text-blue-600 font-medium text-sm">
                {expanded ? "Show Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Images */}
      {proof?.images && proof.images.length > 0 && (
        <View className={`flex-row flex-wrap gap-2 ${
          proof.images.length === 1 ? 'justify-center' : 'justify-start'
        }`}>
          {proof.images.map((img: ImgType, idx: number) => {
            return (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedImage(img.uri as ImgType )}
              activeOpacity={0.8}
            >
              <View className="relative rounded-lg overflow-hidden">
                <Image
                  source={{ uri: img.uri }}
                  className={`${
                    proof.images!.length === 1 
                      ? 'w-80 h-52' 
                      : 'w-[143px] h-[143px]'
                  } bg-gray-200 dark:bg-gray-700`}
                  resizeMode="cover"
                />
                
                {/* Image counter for multiple images */}
                {proof.images!.length > 1 && (
                  <View className="absolute top-2 left-2 bg-black/60 rounded-md px-2 py-0.5">
                    <Text className="text-white text-xs font-semibold">
                      {idx + 1}/{proof.images!.length}
                    </Text>
                  </View>
                )}

                {/* Expand hint */}
                <View className="absolute bottom-2 right-2 bg-black/60 rounded-md p-1">
                  <Ionicons name="expand-outline" size={12} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          )
          })}
        </View>
      )}

    </View>
  );
}