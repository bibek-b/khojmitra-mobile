import Feed from "@/components/feed/Feed";
import { ScrollView, Text, View } from "react-native";
import Fab from "../../components/common/Fab";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { postType } from "@/types/post.types";
import { postApi } from "@/api/postApi";
import { getItem } from "@/utils/AsyncStorage";
import { usePostStore } from "@/store/usePostStore";

export default function MyPostsTab() {
  const { showLoading, hideLoading } = useLoaderStore();
  const { showNotification } = useContext(NotificationContext);
  const [myPosts, setMyPosts] = useState<postType[]>([]);
  const { allPosts, setAllPosts } = usePostStore();

  useEffect(() => {
    (async () => {
      const user = await getItem("user");
      showLoading("myPosts");
      const userPosts = allPosts?.filter((ap) => ap?.user?._id === user?._id);
      setMyPosts(userPosts);
      hideLoading();
    })();
  }, [allPosts]);

  const handleDeletePost = async (id: string) => {
    try {
      showLoading("Feed");

      await postApi.delete(id);
      setAllPosts(allPosts.filter((p) => p._id !== id));
      showNotification?.({
        type: "success",
        message: "Post deleted successfully",
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Oops! Something went wrong. Please try again";
      showNotification?.({
        type: "error",
        message,
      });
    } finally {
      hideLoading();
    }
  };
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {myPosts.length > 0 ? (
          myPosts?.map((data) => (
            <View key={data._id} className=" justify-center w-full">
              <Feed post={data} onDeletePost={handleDeletePost} />
              <View
                className={`h-[3px] w-full bg-black/30 mt-2 dark:bg-white/30}`}
              />
            </View>
          ))
        ) : (
          <View className="items-center justify-center h-screen">
            <Text className="text-2xl dark:text-white">No data.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
