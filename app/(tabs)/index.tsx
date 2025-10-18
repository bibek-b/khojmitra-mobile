import Feed from "@/components/feed/Feed";
import { ScrollView, Text, View } from "react-native";
import Fab from "../../components/common/Fab";
import { postData } from "@/constants/dummyData";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function HomeTab() {
  const { isDarkMode}  = useContext(ThemeContext);
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={`h-[3px] w-full bg-black/30 ${isDarkMode && "bg-white/30"}`} />
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
            />
            <View className={`h-[3px] w-full bg-black/30 mt-2 ${isDarkMode && "bg-white/30"}`} />
          </View>
        ))}
      </ScrollView>
      <View className="absolute bottom-4 right-2  text-center items-end w-fit bg-none">
        <Fab />
      </View>
    </View>
  );
}
