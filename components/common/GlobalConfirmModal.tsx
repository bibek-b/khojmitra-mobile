import { useConfirmModal } from "@/store/useConfirmModal";
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function GlobalConfirmModal() {
  const { confirmModal, modalContent, onConfirm, hideConfirmModal } =
    useConfirmModal();
  const acceptBtnBg = modalContent?.acceptBtnBg;
  return (
   <Modal visible={confirmModal} transparent={true} animationType="fade">
   <TouchableWithoutFeedback onPress={hideConfirmModal}>
      <View className=" flex-1 bg-black/60">
     <TouchableWithoutFeedback>
       <View className="absolute top-72 left-12 bg-[#1e1e1e] w-80 px-2 py-6 rounded-xl shadow-lg dark:shadow-white gap-4">
        <Text className="dark:text-white text-3xl text-center font-bold">
          {modalContent?.title}
        </Text>
        <Text className="dark:text-white text-lg text-center">
          {modalContent?.detailInfo}
        </Text>
        <View className=" gap-4 justify-center items-center">
          <TouchableOpacity
            onPress={() => (onConfirm(), hideConfirmModal())}
            className={` ${acceptBtnBg ? acceptBtnBg : "bg-red-500"} py-2 rounded-full w- text-center w-[90%] items-center `}
          >
            <Text className="dark:text-white text-lg">
              {modalContent?.acceptText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={hideConfirmModal}
            className=" border dark:border-white/60 py-2 rounded-3xl w-[90%] items-center"
          >
            <Text className="dark:text-white text-lg">
              {modalContent?.denyText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     </TouchableWithoutFeedback>
    </View>
   </TouchableWithoutFeedback>
   </Modal>
  );
}
