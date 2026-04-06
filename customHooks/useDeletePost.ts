import { postApi } from "@/api/postApi";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { usePostStore } from "@/store/usePostStore";
import { useContext } from "react";

export const useDeletePost = () => {
  const { showLoading, hideLoading } = useLoaderStore();
  const { setAllPosts, allPosts } = usePostStore();
  const { showPopupNotification } = useContext(PopupNotificationContext);
  const handleDeletePost = async (id: string) => {
    try {
      showLoading("Feed");

      await postApi.delete(id);
      setAllPosts(allPosts.filter((p) => p._id !== id));
      showPopupNotification?.({
        type: "success",
        message: "Post deleted successfully",
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Oops! Something went wrong. Please try again";
      showPopupNotification?.({
        type: "error",
        message,
      });
    } finally {
      hideLoading();
    }
  };

  return { handleDeletePost };
};
