import Feed from "@/components/feed/Feed";
import { useEffect, useState } from "react";
import { postApi } from "@/api/postApi";
import { useLoaderStore } from "@/store/useLoaderStore";
import { usePostStore } from "@/store/usePostStore";
import { useSearchFeedStore } from "@/store/useSearchFeedStore";
import { useDeletePost } from "@/customHooks/useDeletePost";
import socket from "../lib/socket";
import { PostType, updateFeedType } from "@/types/post.types";
import { useDebouncedValue } from "@/customHooks/useDebouncedValue";
import { useFilteredPost } from "@/customHooks/useFilteredPost";
import OptimizedList from "@/components/common/OptimizedList";
import { useToast } from "react-native-toast-notifications";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { authApi } from "@/api/authApi";
import { removeItem } from "@/utils/AsyncStorage";

export default function HomeTab() {
  const { showLoading, hideLoading } = useLoaderStore();

  const [myId, setMyId] = useState("");
  const { allPosts, setAllPosts, updateFeed } = usePostStore();
  const { searchInput } = useSearchFeedStore();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await authApi.getCurrentUser();
        setMyId(res.data.data?._id);
      } catch (error) {
        await removeItem("user");
        await removeItem("access_token");
        const message = getErrorMessage(error);
        toast.show(message, {
          type: "danger",
        });
      }
    })();
  }, []);

  const fetchAllPosts = async () => {
    try {
      showLoading("fetchPosts");
      const res = await postApi.getAll();
      setAllPosts(res?.data.data);
      toast.show("Posts loaded successfully!", {
        type: "success",
      });
    } catch (error: any) {
      const message = getErrorMessage(error);
      toast.show(message, {
        type: "danger",
      });
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchAllPosts();

    const handleNewPost = (data: PostType, type: updateFeedType) => {
      console.log("new: ", data, type);
      updateFeed(data, type);
    };
    const handleDeletePost = (data: PostType, type: updateFeedType) => {
      console.log("delete: ", data, type);
      updateFeed(data, type);
    };
    socket.on("new-post", handleNewPost);
    socket.on("delete-post", handleDeletePost);

    return () => {
      socket.off("new-post", handleNewPost);
      socket.off("delete-post", handleDeletePost);
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
