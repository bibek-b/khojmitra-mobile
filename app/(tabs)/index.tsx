import Feed from "@/components/feed/Feed";
import { ScrollView, Text, View } from "react-native";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { postApi } from "@/api/postApi";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { usePostStore } from "@/store/usePostStore";
import { useSearchFeedStore } from "@/store/useSearchFeedStore";


export default function HomeTab() {
  const { isDarkMode } = useContext(ThemeContext);
  const { showLoading, hideLoading } = useLoaderStore();

  const { showPopupNotification } = useContext(PopupNotificationContext);
  const { allPosts, setAllPosts } = usePostStore();
  const { searchInput } = useSearchFeedStore();

  // useEffect(() => {
  //   if (newNotification) {
  //     showNotification?.({ type: "info", message: "New Notification!" });
  //   }
  // }, [newNotification]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        showLoading("fetchPosts");
        const res = await postApi.getAll();
        setAllPosts(res?.data.data);
      } catch (error: any) {
          showPopupNotification?.({ type: "error", message: "Can't fetch post" });
      } finally {
        hideLoading();
      }
    };
    fetchAllPosts();
  }, []);

  const filteredPost = allPosts.filter(
    (p) =>
      p.title
        ?.trim()
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()) ||
      p.type?.trim().toLowerCase().includes(searchInput.trim().toLowerCase()) ||
      String(p.category)
        ?.trim()
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()) ||
      p.location
        ?.trim()
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()) ||
      p.date?.trim().toLowerCase().includes(searchInput.trim().toLowerCase()) ||
      p.description
        ?.trim()
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()),
  );
  return (
    <View className="relative h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className={`h-[3px] w-full bg-black/30 ${isDarkMode && "bg-white/30"}`}
        />
        {allPosts?.length > 0 && filteredPost?.length > 0 ? (
          filteredPost.map((data) => (
            <View key={data._id} className=" justify-center w-full">
              <Feed post={data} />
              <View
                className={`h-[3px] w-full bg-black/30 mt-2 ${isDarkMode && "bg-white/30"}`}
              />
            </View>
          ))
        ) : (
          <View className="items-center justify-center h-screen">
            <Text className="text-2xl dark:text-white">No data found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
