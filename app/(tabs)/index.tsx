import Feed from "@/components/feed/Feed";
import { ScrollView, View } from "react-native";
import Fab from "../../components/common/Fab";
import { postData } from "@/constants/dummyData";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { postType } from "@/types/api/post.types";
import { postApi } from "@/api/post+api";
import { NotificationContext } from "@/context/NotificationContext";

export default function HomeTab() {
  const { isDarkMode } = useContext(ThemeContext);
  const { showNotification } = useContext(NotificationContext);
  const [allPosts, setAllPosts] = useState<postType | []>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await postApi.getAll();
        res && setAllPosts(res.data);
      } catch (error) {
        console.log(error)
        showNotification &&
          showNotification({ type: "error", message: "Cant fetch post" });
      }
    };
    fetchAllPosts();
  }, []);
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className={`h-[3px] w-full bg-black/30 ${isDarkMode && "bg-white/30"}`}
        />
        {postData?.map((data) => (
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
            <View
              className={`h-[3px] w-full bg-black/30 mt-2 ${isDarkMode && "bg-white/30"}`}
            />
          </View>
        ))}
      </ScrollView>
      <View className="absolute bottom-4 right-2  text-center items-end w-fit bg-none">
        <Fab />
      </View>
    </View>
  );
}
