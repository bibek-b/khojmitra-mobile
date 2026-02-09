import SeparatorLine from "@/components/common/SeparatorLine";
import Feed from "@/components/feed/Feed";
import { PossibleMatchPropType } from "@/types/notificationDetail";
import { View } from "react-native";

export default function PossibleMatchDetail({ posts }: PossibleMatchPropType) {
  if (!posts) return null;

  return (
    <View className="py-2">
      <SeparatorLine />
      {/* {Array.isArray(posts) ? (
        posts?.map((p) => {
          return (
            <View key={p?._id}>
              <Feed post={p} />
              <SeparatorLine />
            </View>
          );
        })
      ) : (
        <Feed post={posts} />
      )} */}
    </View>
  );
}
