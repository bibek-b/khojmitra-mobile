import ConversationList from "@/components/ConversationList";
import OnlinePeople from "@/components/OnlinePeople";
import { onlineData } from "@/constants/dummyData";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { ScrollView, TextInput, View } from "react-native";

export default function ChatTab() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="px-5 py-8 gap-4">
        <View>
          <TextInput
            placeholder="Search"
            className={`border ${isDarkMode ? "border-white/30 placeholder:text-white text-white": "border-black/30"}  rounded-full px-4`}
          />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-[9px]">
            {onlineData.map((o) => (
              <OnlinePeople key={o.id} />
            ))}
          </View>
        </ScrollView>

        <View className="gap-4">
          {onlineData.map((d) => (
            <ConversationList key={d.id} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
