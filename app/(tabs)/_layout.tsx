import { router, Tabs } from "expo-router";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import HeaderRight from "@/components/headers/HeaderRight";
import HeaderLeft from "@/components/headers/HeaderLeft";
import { useHeaderAnimations } from "../../hooks/useHeaderAnimations";
import { ThemeContext } from "@/context/ThemeContext";

export default function TabLayout() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { searchWidth, logoAnim, animateHeader } = useHeaderAnimations();

  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    animateHeader(showSearchBar);
  }, [showSearchBar]);

  return (
    <Tabs
      screenOptions={{
        sceneStyle: { backgroundColor: isDarkMode ? "#1a1a1a" : "#F9FAFB" },
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#1a1a1a" : "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarLabel: "Home",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a" : "white",
          },
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          headerLeft: () => (
            <HeaderLeft logoAnim={logoAnim} showSearchBar={showSearchBar} />
          ),
          headerRight: () => (
            <HeaderRight
              showSearchBar={showSearchBar}
              setShowSearchBar={setShowSearchBar}
              searchWidth={searchWidth}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myPosts"
        options={{
          title: "My Posts",
          headerStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a" : "white",
          },
          headerTitleStyle: {
            fontWeight: 700,
            fontSize: 24,
            color: isDarkMode ? "#f5f5f5" : "black",
          },
          tabBarIcon: ({ color }) => (
            <Feather name="file-text" size={24} color={color} />
          ),
          headerShadowVisible: false,
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chats",
          headerStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a" : "white",
          },
          headerTitleStyle: {
            fontWeight: 700,
            fontSize: 24,
            color: isDarkMode ? "#f5f5f5" : "black",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={24} color={color} />
          ),
          headerShadowVisible: false,
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: isDarkMode ? "#1a1a1a" : "white",
          },
          headerTitleStyle: { fontWeight: 700, fontSize: 24,  color: isDarkMode ? "white" : "black", },

          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
