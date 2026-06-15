import { Stack, useRouter } from "expo-router";
import "@/global.css";
import { ThemeContext, ThemeContextProvider } from "@/context/ThemeContext";
import { useContext, useEffect } from "react";
import { ProofFormContextProvider } from "@/context/ProofFormContext";
import ProofForm from "@/components/feed/ProofForm";
import { GlobalLoader } from "@/components/common/GlobalLoader";
import { useLoaderStore } from "@/store/useLoaderStore";
import GlobalConfirmModal from "@/components/common/GlobalConfirmModal";
import socket from "./lib/socket";
import { getItem } from "@/utils/AsyncStorage";
import registerForPushNotifications from "@/utils/registerForPushNotifications";
import * as Notifications from "expo-notifications";
import { useNotificationDetailStore } from "@/store/useNotificationDetailStore";
import {
  NotificationDetailPostType,
  SenderType,
} from "@/types/notificationDetail";
import { NotificationType } from "@/types/notification";
import { userApi } from "@/api/userApi";
import { postApi } from "@/api/postApi";
import { notificationApi } from "@/api/notificationApi";
import { ToastProvider } from "react-native-toast-notifications";
import { customToastRenderers } from "@/components/ToastConfig";

function LayoutWithTheme() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? "#1a1a1a" : "white",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/notificationScreen"
        options={{
          title: "Notifications",
          headerTitleStyle: { fontWeight: 700, fontSize: 24 },
          headerTintColor: isDarkMode ? "white" : "#1a1a1a",
        }}
      />
      <Stack.Screen
        name="screens/notificationDetailScreen"
        options={{
          title: "Notification(s) Details",
          headerTitleStyle: { fontWeight: 700, fontSize: 24 },
          headerTintColor: isDarkMode ? "white" : "#1a1a1a",
        }}
      />
      <Stack.Screen
        name="screens/profileScreen"
        options={{
          title: "",
          headerTintColor: isDarkMode ? "#f5f5f5" : "black",
        }}
      />
      <Stack.Screen
        name="screens/chatScreen"
        options={{
          title: "",
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />

      <Stack.Screen
        name="screens/languageScreen"
        options={{
          title: "Language",
          headerTitleStyle: { fontWeight: 400, fontSize: 20 },
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />
      <Stack.Screen
        name="screens/aboutScreen"
        options={{
          title: "About",
          headerTitleStyle: { fontWeight: 400, fontSize: 20 },
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />
      <Stack.Screen
        name="screens/signUpScreen"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a" : "white",
          },
        }}
      />
      <Stack.Screen
        name="screens/signInScreen"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a" : "white",
          },
        }}
      />
      <Stack.Screen
        name="screens/editProfileScreen"
        options={{
          title: "Edit Profile",
          headerTintColor: isDarkMode ? "#F5F5F5" : "black",
        }}
      />

      <Stack.Screen
        name="screens/addEditPostScreen"
        options={{
          title: "",
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />
    </Stack>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const { loading } = useLoaderStore();
  const router = useRouter();
  const { setSender, setPost, setType, setMatchedPosts, setRelatedPost } =
    useNotificationDetailStore();

  useEffect(() => {
    Notifications.getLastNotificationResponse();

    async function pushNotificationsetup() {
      registerForPushNotifications();
    }

    pushNotificationsetup();

    const notificationTapListener =
      Notifications.addNotificationResponseReceivedListener(async (res) => {
        const data = res.notification.request.content.data;
        const type = data.type as NotificationType;

        setType(type as NotificationType);
        const senderDetail = await userApi.getUserById(data.senderId as string);
        const postDetail = await postApi.getPost(data.postId as string);

        const notification = await notificationApi.getNotificationById(
          data.notificationId as string,
        );

        if (type === "POSSIBLE_MATCH_OWNER") {
          const { matchedPosts, ...rest } = notification.data.data;
          setMatchedPosts(matchedPosts);
        } else if (type === "POSSIBLE_MATCH_EXISTING") {
          const { relatedPost, ...rest } = notification.data.data;
          setRelatedPost(relatedPost);
        }

        setSender(senderDetail?.data.data as SenderType);
        setPost(postDetail?.data.data as NotificationDetailPostType);

        if (data.redirectScreen === "notificationDetailScreen") {
          setTimeout(() => {
            router.push("/screens/notificationDetailScreen");
          }, 500);
        }
      });

    const initializeSocket = async () => {
      const user = await getItem("user");
      socket.connect();
      socket.emit("joinRoom", user?._id);
    };

    initializeSocket();

    return () => {
      notificationTapListener.remove();
      socket.disconnect();
    };
  }, []);

  return (
    <ToastProvider
      duration={3000}
      offset={50}
      animationType="slide-in"
      swipeEnabled={true}
      renderType={customToastRenderers}
    
    >
      <ProofFormContextProvider>
        <ThemeContextProvider>
          <LayoutWithTheme />
          <ProofForm />

          {loading.boolean && (
            <GlobalLoader
              loaderText={
                loading?.parent === "reportSubmit" ? "Uploading.." : ""
              }
            />
          )}
          <GlobalConfirmModal />
        </ThemeContextProvider>
      </ProofFormContextProvider>
    </ToastProvider>
  );
}
