import SeparatorLine from "@/components/common/SeparatorLine";
import Feed from "@/components/feed/Feed";
import { PossibleMatchPropType } from "@/types/notificationDetail";
import { Text, View } from "react-native";

export default function PossibleMatchDetail({posts}: PossibleMatchPropType) {
    return (
        <View className="py-2">
            <SeparatorLine />
          {Array.isArray(posts) ?posts?.map(p => {
            return (
           <>
            <Feed key={p._id} post={p} />
            <SeparatorLine /></>
          )
          }): <Feed post={posts} />}
        </View>
    )
}