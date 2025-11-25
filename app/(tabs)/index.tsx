import Feed from "@/components/feed/Feed";
import { ScrollView, Text, View } from "react-native";
import Fab from "../../components/common/Fab";
import { postData } from "@/constants/dummyData";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { postType } from "@/types/post.types";
import { postApi } from "@/api/postApi";
import { NotificationContext } from "@/context/NotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";

export default function HomeTab() {

  const { isDarkMode } = useContext(ThemeContext);
  const { showLoading, hideLoading} = useLoaderStore();

  const { showNotification } = useContext(NotificationContext);
  const [allPosts, setAllPosts] = useState<postType[]>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        showLoading("fetchPosts")
        const res = await postApi.getAll();
        res && setAllPosts(res.data.data);
      } catch (error: any) {
        showNotification &&
          showNotification({ type: "error", message: "Cant fetch post" });
      } finally{
        hideLoading();
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <View className="relative h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className={`h-[3px] w-full bg-black/30 ${isDarkMode && "bg-white/30"}`}
        />
        {allPosts.length > 0 ? allPosts?.map((data) => (
          <View key={data._id} className=" justify-center w-full">
            <Feed post={data}
            />
            <View
              className={`h-[3px] w-full bg-black/30 mt-2 ${isDarkMode && "bg-white/30"}`}
            />
          </View>
        )): <View className="items-center justify-center h-screen">
          <Text className="text-2xl dark:text-white">No data.</Text>
          </View>}
      </ScrollView>
      {/* <View className="text-center items-end w-fit bg-none h-full"> */}
        <Fab />
      {/* </View> */}
    </View>
  );
}
