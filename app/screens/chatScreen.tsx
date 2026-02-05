import { messageList } from "@/constants/dummyData";
import { ThemeContext } from "@/context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useLayoutEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatScreen() {
  const { avatar, username } = useLocalSearchParams();
  const navigation = useNavigation();
  const [inputText, setInputText] = useState("");
  const { isDarkMode } = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTintColor: isDarkMode ? "white" : "black",

      headerTitle: () => (
        <View className="flex-row items-center gap-2">
          <Image
            source={{ uri: avatar  }}
            className="w-14 h-14 object-cover rounded-full"
          />
          <Text className={`text-xl font-medium ${isDarkMode ? "text-white": "text-black"}`}>{username}</Text>
        </View>
      ),
    });
  }, [navigation, avatar, username]);
  return (
    <View className={`flex-1 ${isDarkMode ? "bg-[#1a1a1a]": "bg-white"}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {messageList.map((m, idx) => (
          <View key={idx} className={`${m.isMe && "items-end"}`}>
            <View className="flex-row items-center gap-2 p-4">
              {!m.isMe && (
                <Image
                  source={{ uri: avatar }}
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
              <Text
                className={` p-2 max-w-[80%] text-[15px] rounded-2xl ${m.isMe ? "bg-[#1976D2] text-white" : "bg-gray-300"}`}
              >
                {m.msg}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        className="px-5 my-5 flex-row items-center gap-4"
      >
        <TextInput
          placeholder="Type a message"
          className={`border ${isDarkMode ? "border-white/30 placeholder:text-white text-white": "border-black/30"}  rounded-full w-[90%] px-4`}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={() => setInputText("")}>
          <AntDesign name="send" size={30} color={isDarkMode ? "white": "black"}/>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
