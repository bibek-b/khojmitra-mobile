import Feed from "@/components/feed/Feed";
import { ScrollView, Text, View } from "react-native";
import Fab from "../../components/common/Fab";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { postType } from "@/types/post.types";
import { postApi } from "@/api/postApi";
import { getItem } from "@/utils/AsyncStorage";

export default function MyPostsTab() {
const { showLoading, hideLoading} = useLoaderStore();
  const { showNotification } = useContext(NotificationContext);
  const [myPosts, setMyPosts] = useState<postType[]>([]);

  
  useEffect(() => {
    (async () => {
     const user = await getItem('user');
     try {
      showLoading("myPosts");
      const res = await postApi.getUserPosts(user?._id);
      setMyPosts(res?.data.data);
    } catch (error: any) {
          showNotification?.({ type: "error", message: error?.response.data.message });
      } finally{
        hideLoading();
      }
   })()
  },[])
  
  const handleDeletePost = async (id: string) => {
    try {
      showLoading("Feed");
      
      await postApi.delete(id);
      setMyPosts(prev => prev.filter(p => p._id === id));
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
  }
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
         {myPosts.length > 0 ? myPosts?.map((data) => (
                  <View key={data._id} className=" justify-center w-full">
                    <Feed post={data}
                    onDeletePost={handleDeletePost}
                    />
                    <View
                      className={`h-[3px] w-full bg-black/30 mt-2 dark:bg-white/30}`}
                    />
                  </View>
                )): <View className="items-center justify-center h-screen">
                  <Text className="text-2xl dark:text-white">No data.</Text>
                  </View>}
      </ScrollView>
      <View className="absolute bottom-4 right-2  text-center items-end w-fit bg-none">
        <Fab />
      </View>
    </View>
  );
}
