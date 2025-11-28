import { Stack, useRouter } from "expo-router";
import "@/global.css";
import { ThemeContext, ThemeContextProvider } from "@/context/ThemeContext";
import { useContext } from "react";
import { NotificationContextProvider } from "@/context/NotificationContext";
import { ProofFormContextProvider } from "@/context/ProofFormContext";
import ProofForm from "@/components/feed/ProofForm";
import PopupNotification from "@/components/common/PopupNotification";
import { NavigationContainer } from "@react-navigation/native";
import Fab from "@/components/common/Fab";
import { GlobalLoader } from "@/components/common/GlobalLoader";
import { useLoaderStore } from "@/store/useLoaderStore";
import GlobalConfirmModal from "@/components/common/GlobalConfirmModal";

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
  // const router = useRouter();
  // routerRef.router= router;
  const { loading } = useLoaderStore();
  return (

    <ProofFormContextProvider>
      <NotificationContextProvider>
        <ThemeContextProvider>
          <LayoutWithTheme />
          <ProofForm />

          {loading.boolean && <GlobalLoader loaderText={loading?.parent === "reportSubmit" ? "Uploading..": "Loading.." } />}
          <GlobalConfirmModal />
          <PopupNotification />
        </ThemeContextProvider>
      </NotificationContextProvider>
    </ProofFormContextProvider>
  );
}
