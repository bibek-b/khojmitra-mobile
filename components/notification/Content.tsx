import { ContentProps } from "@/types/content";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Content({ proof }: ContentProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View>
      <Text
        numberOfLines={expanded ? undefined : 2}
        ellipsizeMode="tail"
        className={`tracking-wide mt-2 dark:text-[#f5f5f5]`}
      >
        {proof?.description}
      </Text>
      {proof?.description && proof.description.trim()?.length > 97 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text className="text-blue-600 font-medium -mt-1">
            {expanded ? "See Less" : "See More"}
          </Text>
        </TouchableOpacity>
      )}

      {/* <View className="flex-row  w-full flex-wrap justify-center gap-2">
                        {images.map((img: imageType, idx: number) => (
                          <TouchableOpacity key={idx} onPress={() => setSelectedImage(img)}>
                            <Image
                            source={{uri: String(img)}}
                              className="w-[160px] h-[160px] rounded-md shadow-md"
                            />
                          </TouchableOpacity>
                        ))}
                      </View> */}

      {/* {(post.user._id === myId) ? <TouchableOpacity
                       
                        className="flex-row items-center gap-3 justify-start pt-6"
                      >
                         
                          <AntDesign
                            name="check-circle"
                            size={24}
                            color={isDarkMode ? "white" : "black"}
                          />
                        <Text className={`${isDarkMode && "text-[#f5f5f5]"} `}>
                          Resolve
                        </Text>
                      </TouchableOpacity> : <TouchableOpacity
                        onPress={() => (
                          showForm?.(),
                          setProofForm?.({
                            type: type.toLowerCase() as "lost" | "found",
                            postId: post?._id!,
                            postOwnerId: post?.user?._id
                          })
            
                          
                        )}
                        className="flex-row items-center gap-3 justify-start pt-6"
                      >
                        {type === "Lost" ? (
                          <FontAwesome5
                            name="handshake"
                            size={24}
                            color={isDarkMode ? "white" : "black"}
                          />
                        ) : (
                          <Feather
                            name="user-check"
                            size={24}
                            color={isDarkMode ? "white" : "black"}
                          />
                        )}
                        <Text className={`${isDarkMode && "text-[#f5f5f5]"} `}>
                          {type === "Lost" ? "I Found This" : "This is Mine"}
                        </Text>
                      </TouchableOpacity>} */}
    </View>
  );
}
