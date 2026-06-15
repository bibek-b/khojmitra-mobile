import PostForm from "@/components/PostForm";
import { usePostStore } from "@/store/usePostStore";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function AddReportScreen() {
  const params = useLocalSearchParams();
  const { isEditPost } = usePostStore();

  const idToUpdate = typeof params.idToUpdate === "object" ? params.idToUpdate?.[0]: params.idToUpdate;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditPost  ? "Edit Report" : "Add Report",
    });
  }, [navigation]);
  return (
    <PostForm
      idToUpdate={idToUpdate}
    />
  );
}
