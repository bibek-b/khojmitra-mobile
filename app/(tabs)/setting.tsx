import SettingDetails from "@/components/SettingDetails";
import { ThemeContext } from "@/context/ThemeContext";
import { useUserStore } from "@/store/useUserStore";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {Image} from 'expo-image';


export default function SettingTab() {
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
const { fullname, avatar} = useUserStore();

  const handleLogout = () => {
    setIsLogoutClicked(false);

    router.navigate("/screens/signInScreen");
  };

  return (
    <View className="py-4 px-2 gap-4">
      <Modal
        visible={isLogoutClicked}
        transparent={true}
        onRequestClose={() => setIsLogoutClicked(false)}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setIsLogoutClicked(false)}>
          <View
            className={`flex-1 items-center justify-center  bg-black/30 backdrop-blur-md`}
          >
            <TouchableWithoutFeedback>
              <View
                className={`${isDarkMode ? "bg-[#242424]" : "bg-white"} rounded-lg`}
              >
                <Text
                  className={`px-10 py-6 text-xl font-semibold ${isDarkMode ? "text-[#f5f5f5]" : "text-black"}`}
                >
                  Log out of your account?
                </Text>
                <View className="h-[1px]  bg-gray-400" />
                <View className="flex-row justify-evenly">
                  <TouchableOpacity onPress={() => setIsLogoutClicked(false)}>
                    <Text
                      className={`${isDarkMode ? "text-[#f5f5f5]" : "text-blue-500"} text-xl pt-4`}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <View className="h-full w-[1px] bg-gray-400" />

                  <TouchableOpacity onPress={() => handleLogout()}>
                    <Text
                      className={`${isDarkMode ? "text-red-500" : "text-red-600"} text-xl font-medium pb-3.5 pt-4`}
                    >
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
     {(avatar && fullname) &&  <TouchableOpacity
        className={`flex-row items-center justify-between ${isDarkMode ? "bg-[#242424]" : "bg-white"}  shadow-lg p-4 rounded-3xl`}
        onPress={() => (router.push("/screens/profileScreen"))}
      >
        <View className="flex-row items-center gap-2">
          <Image
            source={{
              uri:
                avatar ||
                "https://i.pinimg.com/736x/79/e5/2f/79e52ff7ce03e1e30ab4a1dd63e68730.jpg",
            }}
            className="w-16 h-16 object-cover rounded-full"
          />
          <Text
            className={`text-2xl ${isDarkMode ? "text-[#f5f5f5]" : "text-black"} font-bold`}
          >
            {fullname}
          </Text>
        </View>
        <AntDesign
          name="down"
          size={20}
          className={`${isDarkMode ? "bg-gray-500/30" : "bg-gray-200"} rounded-full p-1`}
          color={isDarkMode ? "#e0e0e0" : "black"}
        />
      </TouchableOpacity>}

      <View
        className={` ${isDarkMode ? "bg-[#242424]" : "bg-white"} shadow-lg py-4 rounded-3xl`}
      >
        <SettingDetails />
      </View>
     {  <TouchableOpacity
        className={` ${isDarkMode ? "bg-[#242424]" : "bg-gray-200"} py-3 rounded-lg mt-[240px]`}
        onPress={() => (avatar && fullname) ? setIsLogoutClicked(true) : handleLogout()}
      >
        <Text
          className={`font-medium text-[16px] text-center ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {(avatar && fullname) ? "Log Out" : "Sign In"}
        </Text>
      </TouchableOpacity>}
    </View>
  );
}
