import { postApi } from "@/api/postApi";
import { useLoaderStore } from "@/store/useLoaderStore";
import { usePostStore } from "@/store/usePostStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useToast } from "react-native-toast-notifications";

export const useDeletePost = () => {
  const { showLoading, hideLoading } = useLoaderStore();
  const { setAllPosts, allPosts } = usePostStore();
  const toast = useToast();

  const handleDeletePost = async (id: string) => {
    try {
      showLoading("Feed");

      await postApi.delete(id);
      setAllPosts(allPosts.filter((p) => p._id !== id));
      toast.show("Post deleted successfully", {
        type: "success",
      });
    } catch (error: any) {
     const message = getErrorMessage(error);
      toast.show(message, {
        type: "error",
      });
    } finally {
      hideLoading();
    }
  };

  return { handleDeletePost };
};
