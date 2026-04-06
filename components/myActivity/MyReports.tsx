import { ImgType } from "@/types/image";
import { ReportType } from "@/types/report";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import ReportDetail from "../notification/notificationDetail/ReportDetail";

export default function MyReports({ report }: { report: ReportType }) {
  const images = report?.images;
  const [selectedImage, setSelectedImage] = useState<ImgType | null>(null);

  if (!report) return null;

  const handleAction = () => {};
  return (
    <>
      {/* Image Modal */}
      {selectedImage && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedImage(null)}
        >
          <View className="flex-1 bg-black/95 justify-center items-center">
            <TouchableOpacity
              className="absolute top-12 right-6 z-10 bg-white/10 backdrop-blur-md rounded-full p-2"
              onPress={() => setSelectedImage(null)}
              activeOpacity={0.8}
            >
              <Feather name="x" size={28} color="#f5f5f5" />
            </TouchableOpacity>
            <Image
              source={{ uri: String(selectedImage) }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}
      <ReportDetail
        data={report}
        setSelectedImage={setSelectedImage}
        handleAction={handleAction}
        parent="myReports"
      />
    </>
  );
}
