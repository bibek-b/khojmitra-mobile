import Feed from "@/components/feed/Feed";
import { ScrollView, Text, View } from "react-native";
import Fab from "../../components/common/Fab";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { postApi } from "@/api/postApi";
import { NotificationContext } from "@/context/NotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { usePostStore } from "@/store/usePostStore";

export default function HomeTab() {

  const { isDarkMode } = useContext(ThemeContext);
  const { showLoading, hideLoading} = useLoaderStore();

  const { showNotification } = useContext(NotificationContext);
  const {allPosts, setAllPosts} = usePostStore();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        showLoading("fetchPosts")
        const res = await postApi.getAll();
         setAllPosts(res?.data.data);
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
        {allPosts?.length > 0 ? allPosts.map((data) => (
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
    
    </View>
  );
}
