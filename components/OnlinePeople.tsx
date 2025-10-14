import { router } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

export default function OnlinePeople() {
   const user = {
    avatar: "https://media.rnztools.nz/rnz/image/upload/s--GP9Eu25U--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1731615435/4KGOQBB_MIKE_TYSON_ABC_2_avif?_a=BACCd2AD",
    username: "Mike Tyson"
  }
  return (
    <TouchableOpacity onPress={() => router.push({pathname: '/chatScreen', params: { avatar: user.avatar, username: user.username }})}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
        }}
        className="w-16 h-16 object-cover rounded-full"
      />
      <Text className="h-4 w-4 bg-green-500 absolute rounded-full bottom-2 right-0" />
    </TouchableOpacity>
  );
}
