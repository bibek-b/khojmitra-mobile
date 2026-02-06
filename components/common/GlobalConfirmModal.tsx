import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function GlobalConfirmModal() {
  const { confirmModal, modalContent, onConfirm, hideConfirmModal } =
    useConfirmModalStore();
    
  return (
    <Modal visible={confirmModal} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={hideConfirmModal}>
        <View className="flex-1 bg-black/70 justify-center items-center px-6">
          <TouchableWithoutFeedback>
            <View className="bg-white dark:bg-[#1a1a1a] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Icon Header */}
              <View className={`pt-8 pb-6 items-center ${
                modalContent?.confirmBtnVariant === "primary" 
                  ? "bg-blue-50 dark:bg-blue-500/10" 
                  : "bg-red-50 dark:bg-red-500/10"
              }`}>
                <View className={`w-16 h-16 rounded-full items-center justify-center ${
                  modalContent?.confirmBtnVariant === "primary"
                    ? "bg-blue-100 dark:bg-blue-500/20"
                    : "bg-red-100 dark:bg-red-500/20"
                }`}>
                  <Ionicons
                    name={modalContent?.confirmBtnVariant === "primary" ? "information-circle" : "warning"}
                    size={36}
                    color={modalContent?.confirmBtnVariant === "primary" ? "#3B82F6" : "#EF4444"}
                  />
                </View>
              </View>

              {/* Content */}
              <View className="px-6 py-6 gap-3">
                <Text className="text-gray-900 dark:text-white text-2xl font-bold text-center">
                  {modalContent?.title}
                </Text>
                <Text className="text-gray-600 dark:text-gray-300 text-base text-center leading-6">
                  {modalContent?.detail}
                </Text>
              </View>

              {/* Buttons */}
              <View className="px-6 pb-6 gap-3">
                <TouchableOpacity
                  onPress={() => {
                    onConfirm();
                    hideConfirmModal();
                  }}
                  className={`py-4 rounded-2xl items-center ${
                    modalContent?.confirmBtnVariant === "primary"
                      ? "bg-blue-600"
                      : "bg-red-500"
                  }`}
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-base font-bold">
                    {modalContent?.confirmText}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={hideConfirmModal}
                  className="py-4 rounded-2xl items-center bg-gray-100 dark:bg-white/5"
                  activeOpacity={0.8}
                >
                  <Text className="text-gray-700 dark:text-gray-300 text-base font-semibold">
                    Cancel
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