import Feed from "@/components/feed/Feed";
import { ScrollView, Text, View } from "react-native";
import { useContext, useEffect, useMemo, useState } from "react";
import { postApi } from "@/api/postApi";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { usePostStore } from "@/store/usePostStore";
import { useSearchFeedStore } from "@/store/useSearchFeedStore";
import SeparatorLine from "@/components/common/SeparatorLine";
import { useDeletePost } from "@/customHooks/useDeletePost";
import socket from "../lib/socket";
import { PostType } from "@/types/post.types";
import { useDebouncedValue } from "@/customHooks/useDebouncedValue";
import { useFilteredPost } from "@/customHooks/useFilteredPost";
import { getItem } from "@/utils/AsyncStorage";

export default function HomeTab() {
  const { showLoading, hideLoading } = useLoaderStore();

  const { showPopupNotification } = useContext(PopupNotificationContext);
    const [myId, setMyId] = useState("");
  const { allPosts, setAllPosts, addNewPost } = usePostStore();
  const { searchInput } = useSearchFeedStore();

  useEffect(() => {
      (async () => {
        const user = await getItem("user");
        setMyId(user?._id);
      })();
    }, []);
  
  
  const fetchAllPosts = async () => {
    try {
      
      showLoading("fetchPosts");
      console.time("Posts loads")
      const res = await postApi.getAll();
      setAllPosts(res?.data.data);
  console.timeEnd("Posts loads")

    } catch (error: any) {
      showPopupNotification?.({ type: "error", message: "Can't fetch post" });
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchAllPosts();

    const handleNewPost = (data: PostType) => {
      addNewPost(data);
    };
    socket.on("new-post", handleNewPost);

    return () => {
      socket.off("new-post", handleNewPost);
    };
  }, []);

  const debouncedSearch = useDebouncedValue(searchInput, 400);

  const filteredPost = useFilteredPost(allPosts, debouncedSearch);

  const { handleDeletePost } = useDeletePost();

  return (
    <View className="relative h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <SeparatorLine />
        {filteredPost?.length > 0 ? (
          filteredPost.map((data) => (
            <View key={data?._id} className=" justify-center w-full">
              <Feed post={data} onDeletePost={handleDeletePost} myId={myId} />
              <SeparatorLine />
            </View>
          ))
        ) : (
          <View className="items-center justify-center h-screen">
            <Text className="text-xl dark:text-white/50">No post found!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
