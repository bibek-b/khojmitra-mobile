import { Stack } from "expo-router";
import "@/global.css";
import { ThemeContext, ThemeContextProvider } from "@/context/ThemeContext";
import { useContext } from "react";
import { NotificationContextProvider } from "@/context/NotificationContext";

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
        name="notificationScreen"
        options={{
          title: "Notifications",
          headerTitleStyle: { fontWeight: 700, fontSize: 24 },
          headerTintColor: isDarkMode ? "white" : "#1a1a1a",
        }}
      />
      <Stack.Screen
        name="profileScreen"
        options={{
          title: "",
          headerTintColor: isDarkMode ? "#f5f5f5" : "black",
        }}
      />
      <Stack.Screen
        name="chatScreen"
        options={{
          title: "",
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />

      <Stack.Screen
        name="languageScreen"
        options={{
          title: "Language",
          headerTitleStyle: { fontWeight: 400, fontSize: 20 },
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />
      <Stack.Screen
        name="aboutScreen"
        options={{
          title: "About",
          headerTitleStyle: { fontWeight: 400, fontSize: 20 },
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />
      <Stack.Screen
        name="signUpScreen"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a": "white"
          }
        }}

      />
      <Stack.Screen
        name="signInScreen"
        options={{
          headerShown: false,
           contentStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a": "white"
          }
        }}
      />
      <Stack.Screen
        name="editProfileScreen"
        options={{
          title: "Edit Profile",
          headerTintColor: isDarkMode ? "#F5F5F5" : "black",
        }}
      />

      <Stack.Screen
        name="addEditReportScreen"
        options={{
          title: "",
          headerTintColor: isDarkMode ? "white" : "black",

        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <NotificationContextProvider>
      <ThemeContextProvider>
      <LayoutWithTheme />
    </ThemeContextProvider>
    </NotificationContextProvider>
  );
}
