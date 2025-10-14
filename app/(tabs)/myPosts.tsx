import Feed from "@/components/Feed";
import { ScrollView, Text, View } from "react-native";
import Fab from "../common/Fab";
import { postData } from "@/constants/dummyData";

export default function MyPostsTab() {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {postData.map((data) => (
          <View key={data.id} className=" justify-center w-full">
            <Feed
              username={data.username}
              type={data.type}
              createdAt={data.createdAt}
              item={data.item}
              category={data.category}
              location={data.location}
              date={data.date}
              description={data.description}
              images={data.images}
              parent="myPost"
            />
            <Text className="h-[3px] w-full bg-black/30 mt-2" />
          </View>
        ))}
      </ScrollView>
      <View className="absolute bottom-4 right-2  text-center items-end w-fit bg-none">
        <Fab />
      </View>
    </View>
  );
}
