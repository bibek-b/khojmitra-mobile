import Feed from "@/components/feed/Feed";
import UserProfile from "@/components/UserProfile";
import { postData } from "@/constants/dummyData";
import { ThemeContext } from "@/context/ThemeContext";
import { useNavigation } from "expo-router";
import { useContext, useLayoutEffect } from "react";
import { ScrollView, Text, View } from "react-native";



export default function ProfileScreen() {
  const navigation = useNavigation();
  const username = "Bibek Bishwokarma";
  const { isDarkMode } = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: username,
    })
  },[navigation])
  
  return (
    <ScrollView className={`${isDarkMode ? "bg-[#1a1a1a]": "bg-[#F9FAFB]"} flex-1`}>
      <View className="flex-1 mt-10">
        <UserProfile />
      </View>
      <View className={`h-[3px] w-full ${isDarkMode ? "bg-white/30" : "bg-black/30"} mt-2`} />

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
          <View className={`h-[3px] w-full ${isDarkMode ? "bg-white/30" : "bg-black/30"} mt-2`} />
        </View>
      ))}
    </ScrollView>
  );
}
