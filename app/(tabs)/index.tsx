import Feed from "@/components/feed/Feed";
import { useContext, useEffect, useState } from "react";
import { postApi } from "@/api/postApi";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { usePostStore } from "@/store/usePostStore";
import { useSearchFeedStore } from "@/store/useSearchFeedStore";
import { useDeletePost } from "@/customHooks/useDeletePost";
import socket from "../lib/socket";
import { PostType } from "@/types/post.types";
import { useDebouncedValue } from "@/customHooks/useDebouncedValue";
import { useFilteredPost } from "@/customHooks/useFilteredPost";
import { getItem } from "@/utils/AsyncStorage";
import OptimizedList from "@/components/common/OptimizedList";

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
      const res = await postApi.getAll();
      setAllPosts(res?.data.data);
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
    <OptimizedList
    parent="postList"
      data={searchInput.trim() !== "" ? filteredPost : allPosts}
      renderItem={({ item }) => (
        <Feed post={item} onDeletePost={handleDeletePost} myId={myId} />
      )}
      keyExtractor={(item) => item._id!}
    />
  );
}
