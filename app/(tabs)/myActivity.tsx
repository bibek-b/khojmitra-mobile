import Feed from "@/components/feed/Feed";
import {  Text, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { getItem } from "@/utils/AsyncStorage";
import { usePostStore } from "@/store/usePostStore";
import { Entypo } from "@expo/vector-icons";
import { ThemeContext } from "@/context/ThemeContext";
import { useActiveReportNavStore } from "@/store/useActiveReportNavStore";
import { navItems } from "@/constants/myActivity";
import { activeReportNavEnum } from "@/types/myActivity";
import { useReportStore } from "@/store/useReportStore";
import { proofApi } from "@/api/proofApi";
import MyReports from "@/components/myActivity/MyReports";
import { PostType } from "@/types/post.types";
import { useDeletePost } from "@/customHooks/useDeletePost";
import OptimizedList from "@/components/common/OptimizedList";

export default function MyPostsTab() {
  const { showLoading, hideLoading } = useLoaderStore();
  const { showPopupNotification } = useContext(PopupNotificationContext);
  const [myPosts, setMyPosts] = useState<PostType[]>([]);
  const { allPosts } = usePostStore();
  const { isDarkMode } = useContext(ThemeContext);
  const { activeReportNav, setActiveReportNav } = useActiveReportNavStore();
  const { reports, setReports } = useReportStore();
  const [myId, setMyId] = useState("");
  useEffect(() => {
    (async () => {
      const user = await getItem("user");
      setMyId(user._id);
      showLoading("myPosts");
      const userPosts = allPosts?.filter((ap) => ap?.user?._id === user?._id);
      setMyPosts(userPosts);
      hideLoading();
    })();
  }, [allPosts]);

  useEffect(() => {
    (async () => {
      const user = await getItem("user");
      try {
        const res = await proofApi.getUserProofs(user?._id);
        setReports(res?.data.data);
      } catch (error: any) {
        console.log(error);
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
    })();
  }, [activeReportNav]);

  const { handleDeletePost } = useDeletePost();
  return (
    <View className=" gap-4 px-2 py-8">
      <View className="flex-row">
        {navItems.map((nav) => (
          <TouchableOpacity
            onPress={() =>
              setActiveReportNav(nav.accessor as activeReportNavEnum)
            }
            key={nav.id}
            className={`flex-row items-center  rounded-full px-2 w-30 ${nav.accessor === activeReportNav ? "bg-[#1976D2]" : "border dark:border-white/50"}`}
          >
            <Text className="dark:text-white font-medium">{nav.label}</Text>
            <Entypo
              name="chevron-small-down"
              size={30}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
        ))}
      </View>

      
      {activeReportNav === "myPosts" ? (
        <OptimizedList
          data={myPosts}
          renderItem={({ item }) => (
            <View className=" justify-center w-full">
              <Feed post={item} onDeletePost={handleDeletePost} myId={myId} />
            </View>
          )}
          keyExtractor={(item) => item._id!}
        />
      ) : (
        <OptimizedList
          data={reports}
          renderItem={({ item }) => (
            <View className=" justify-center w-full">
              <MyReports report={item} />
            </View>
          )}
          keyExtractor={(item) => item._id!}
        />
      )}
    </View>
  );
}
