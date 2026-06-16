import Feed from "@/components/feed/Feed";
import { Text, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useLoaderStore } from "@/store/useLoaderStore";
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
import { useToast } from "react-native-toast-notifications";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useUserStore } from "@/store/useUserStore";
import { Link } from "expo-router";
import LoginPrompt from "@/components/common/LoginPrompt";

export default function MyPostsTab() {
  const { showLoading, hideLoading } = useLoaderStore();
  const [myPosts, setMyPosts] = useState<PostType[]>([]);
  const { allPosts } = usePostStore();
  const { isDarkMode } = useContext(ThemeContext);
  const { activeReportNav, setActiveReportNav } = useActiveReportNavStore();
  const { reports, setReports } = useReportStore();
  const toast = useToast();
  const { userId } = useUserStore();

  useEffect(() => {
    (async () => {
      showLoading("myPosts");
      const userPosts = allPosts?.filter((ap) => ap?.user?._id === userId);
      setMyPosts(userPosts);
      hideLoading();
    })();
  }, [allPosts]);

  useEffect(() => {
    (async () => {
      try {
        if (userId) {
          const res = await proofApi.getUserProofs(userId);
          setReports(res?.data.data);
        }
      } catch (error: any) {
        const message = getErrorMessage(error);
        toast.show(message, { type: "danger" });
      } finally {
        hideLoading();
      }
    })();
  }, [activeReportNav]);

  const { handleDeletePost } = useDeletePost();
  return (
    <View className=" gap-4 px-2 py-8">
      {userId && <View className="flex-row">
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
      </View>}

      {userId ? (
        activeReportNav === "myPosts" ? (
          <OptimizedList
            parent="myPosts"
            data={myPosts}
            renderItem={({ item }) => (
              <View className=" justify-center w-full">
                <Feed
                  post={item}
                  onDeletePost={handleDeletePost}
                  myId={userId}
                />
              </View>
            )}
            keyExtractor={(item) => item._id!}
          />
        ) : (
          <OptimizedList
            parent="myActivity"
            data={reports}
            renderItem={({ item }) => (
              <View className=" justify-center w-full">
                <MyReports report={item} />
              </View>
            )}
            keyExtractor={(item) => item._id!}
          />
        )
      ) : (
      <LoginPrompt screen="activity" />
      )}
    </View>
  );
}
