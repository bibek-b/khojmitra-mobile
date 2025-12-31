import ReportForm from "@/components/ReportForm";
import { getItem } from "@/utils/AsyncStorage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function AddReportScreen() {
  const { isEditPost, idToUpdate } = useLocalSearchParams();

  const navigation = useNavigation();
  const access_token = getItem("access_token");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditPost === "true" ? "Edit Report" : "Add Report",
    });
  }, [navigation]);
  return (
    <ReportForm
      isEditPost={Array.isArray(isEditPost) ? isEditPost[0] : isEditPost}
      idToUpdate={Array.isArray(idToUpdate) ? idToUpdate[0] : idToUpdate}
    />
  );
}
