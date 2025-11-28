import { useConfirmModal } from "@/store/useConfirmModal";
import {  Text, TouchableOpacity, View } from "react-native";

export default function GlobalConfirmModal() {
    const { isConfirmModalVisible, modalContent} = useConfirmModal();
    return (
        <View className=" absolute top-0 bg-black/60 h-full w-full  items-center justify-center ">
          <View className="bg-[#1e1e1e] w-80 px-2 py-6 rounded-xl shadow-lg dark:shadow-white gap-4">
              
            <Text className="dark:text-white text-3xl text-center">{title}</Text>
             <Text className="dark:text-white text-xl text-center">{desc}</Text>
            <View className=" gap-4 justify-center items-center">
              <TouchableOpacity className={` ${acceptBtnBg ? acceptBtnBg : "bg-red-500"} py-2 rounded-full w- text-center w-[90%] items-center `}>
                  <Text className="dark:text-white text-xl">
                    {acceptText}
                </Text>
              </TouchableOpacity>
               <TouchableOpacity className=" border dark:border-white/60 py-2 rounded-3xl w-[90%] items-center">
                 <Text className="dark:text-white text-xl" >{denyText}</Text>
               </TouchableOpacity>

            </View>
          </View>
        </View>
    )
} 