import { router, Tabs } from "expo-router";
import { Entypo, Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import HeaderRight from "@/components/headers/HeaderRight";
import HeaderLeft from "@/components/headers/HeaderLeft";
import { useHeaderAnimations } from "../../hooks/useHeaderAnimations";
import { ThemeContext } from "@/context/ThemeContext";
import Fab from "@/components/common/Fab";
import { TouchableOpacity } from "react-native";

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
        name="myActivity"
        options={{
          title: "My Activity",
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
        name="addEdit"
        options={{
          title: "",
          tabBarButton: () => (
            <TouchableOpacity
              className="absolute shadow-white bottom-4 w-16 h-16 rounded-full p-2 bg-[#1976D2] mx-2  items-center flex-row justify-center gap-2 shadow-lg dark:shadow-white  elevation-10 "
              onPress={() => router.push("/screens/addEditReportScreen")}
            >
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          ),
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
          headerTitleStyle: {
            fontWeight: 700,
            fontSize: 24,
            color: isDarkMode ? "white" : "black",
          },

          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
