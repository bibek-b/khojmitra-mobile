import { Stack } from "expo-router";
import "@/global.css";
import { ThemeContext, ThemeContextProvider } from "@/context/ThemeContext";
import { useContext, useEffect } from "react";
import {  PopupNotificationContextProvider } from "@/context/PopupNotificationContext";
import { ProofFormContextProvider } from "@/context/ProofFormContext";
import ProofForm from "@/components/feed/ProofForm";
import PopupNotification from "@/components/common/PopupNotification";
import { GlobalLoader } from "@/components/common/GlobalLoader";
import { useLoaderStore } from "@/store/useLoaderStore";
import GlobalConfirmModal from "@/components/common/GlobalConfirmModal";
import socket from "./lib/socket";
import { getItem } from "@/utils/AsyncStorage";

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
        name="screens/addEditReportScreen"
        options={{
          title: "",
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const { loading } = useLoaderStore();
  
  useEffect(() => {
    const initializeSocket = async () => {
      const user = await getItem("user");
      socket.connect();
      socket.emit("joinRoom", user._id);
    };
    initializeSocket();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ProofFormContextProvider>
      <PopupNotificationContextProvider>
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
          <PopupNotification />
        </ThemeContextProvider>
      </PopupNotificationContextProvider>
    </ProofFormContextProvider>
  );
}
