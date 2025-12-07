import Feed from "@/components/feed/Feed";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Fab from "../../components/common/Fab";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { useLoaderStore } from "@/store/useLoaderStore";
import { postType } from "@/types/post.types";
import { postApi } from "@/api/postApi";
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

export default function MyPostsTab() {
  const { showLoading, hideLoading } = useLoaderStore();
  const { showNotification } = useContext(NotificationContext);
  const [myPosts, setMyPosts] = useState<postType[]>([]);
  const { allPosts, setAllPosts } = usePostStore();
  const { isDarkMode } = useContext(ThemeContext);
  const { activeReportNav, setActiveReportNav }  = useActiveReportNavStore();
  const { reports, setReports} = useReportStore();
  useEffect(() => {
    (async () => {
      const user = await getItem("user");
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
    })()
  },[activeReportNav])

  const handleDeletePost = async (id: string) => {
    try {
      showLoading("Feed");

      await postApi.delete(id);
      setAllPosts(allPosts.filter((p) => p._id !== id));
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
  };
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
       <View className="flex-row gap-4 px-2 py-8">
        {navItems.map(nav => (
           <TouchableOpacity onPress={() => setActiveReportNav(nav.accessor as activeReportNavEnum)} key={nav.id}  className={`flex-row items-center  rounded-full px-2 w-30 ${nav.accessor === activeReportNav ? "bg-[#1976D2]": "border dark:border-white/50"}`}>
          <Text className="dark:text-white font-medium">{nav.label}</Text>
          <Entypo name="chevron-small-down" size={30} color={isDarkMode ? "white": "black"} />
        </TouchableOpacity>
        ))}
         
       </View>
        {activeReportNav === "myPosts"? myPosts.length > 0 ? (
          myPosts?.map((data) => (
            <View key={data._id} className=" justify-center w-full">
              
              <Feed post={data} onDeletePost={handleDeletePost} />
              <View
                className={`h-[3px] w-full bg-black/30 mt-2 dark:bg-white/30}`}
              />
            </View>
          ))
        ) : (
          <View className="items-center justify-center h-screen">
            <Text className="text-2xl dark:text-white">No data.</Text>
          </View>
        ): <View>
          {reports.length > 0 ? reports?.map((data) => (
            <View key={data?._id} className=" justify-center w-full">
              
              <MyReports report={data}/>
              <View
                className={`h-[3px] w-full bg-black/30 mt-2 dark:bg-white/30}`}
              />
            </View>
          )): <View><Text>No Report found</Text></View>}</View>}
      </ScrollView>
    </View>
  );
}
