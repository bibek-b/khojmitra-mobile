import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useContext, useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Category } from "@/constants/categories";
import DatePicker from "@react-native-community/datetimepicker";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";
import ImagePickerModal from "./common/ImagePickerModal";
import UploadImgBtn from "./common/UploadImgBtn";
import DisplayImages from "./common/DisplayImages";
import { postApi } from "@/api/postApi";
import { useLoaderStore } from "@/store/useLoaderStore";
import { GlobalLoader } from "./common/GlobalLoader";
import { AddEditPostFormTypes } from "@/types/post.types";
import { usePostStore } from "@/store/usePostStore";
import { postCategories } from "@/types/post.types";
import { ImgType } from "@/types/image";
import { useToast } from "react-native-toast-notifications";
import { validatePostForm } from "@/validations/validatePostForm";
import { postType } from "@/constants/post";
import { useUserStore } from "@/store/useUserStore";

export default function PostForm({ idToUpdate }: { idToUpdate?: string }) {
  const { isDarkMode } = useContext(ThemeContext);
  const { showLoading, hideLoading } = useLoaderStore();
  const { allPosts, isEditPost } = usePostStore();
  const { userId } = useUserStore();

  const [formData, setFormData] = useState({
    type: "",
    category: "" as unknown as postCategories,
    date: new Date(),
    images: [] as ImgType[] | undefined,
    title: "",
    location: "",
    description: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<AddEditPostFormTypes>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (idToUpdate) {
      const post = allPosts.find((p) => p._id === idToUpdate);
      if (post) {
        setFormData({
          type: post.type,
          title: post.title,
          category: post.category,
          date: new Date(post.date),
          images: post?.images,
          description: post.description,
          location: post.location,
        });
      }
    }
  }, [isEditPost]);

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const errors = validatePostForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const fd = new FormData();

    fd.append("type", formData.type);
    fd.append("title", formData.title);
    fd.append("category", String(formData.category));
    fd.append("location", formData.location);

    const numericDate = `${formData.date.getFullYear()}-${(formData.date.getMonth() + 1).toString().padStart(2, "0")}-${formData.date.getDate().toString().padStart(2, "0")}`;
    fd.append("date", numericDate);

    fd.append("description", formData.description);
    fd.append("user", userId);

    if (formData.images && formData.images.length > 0) {
      const newImages = (formData.images ?? []).filter(
        (img) =>
          typeof img === "object" && img !== null && !("publicId" in img),
      );

      // If user is editing and keeps existing images unchanged
      const existingImages = (formData.images ?? []).filter(
        (img) => typeof img === "object" && img !== null && "publicId" in img,
      );

      // Only append files for actually-new images.
      newImages.forEach((img, index) => {
        fd.append("postImages", {
          uri: img.uri,
          type: img.mimeType || "image/jpeg",
          name: img.fileName || `image_${Date.now()}_${index}.jpg`,
        } as any);
      });

      fd.append("existingImages", JSON.stringify(existingImages));
    }

    let res;

    try {
      showLoading("postSubmit");
      if (isEditPost) {
        res = await postApi.update(idToUpdate!, fd);
      } else {
        res = await postApi.create(fd);
      }
      toast.show(res.data.message, { type: "success" });
      router.push("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Oops! Something went wrong. Please try again";
      toast.show(message, { type: "danger" });
    } finally {
      hideLoading();
    }
  };
  return (
    <View
      className={`items-center py-10 flex-1 ${isDarkMode && "bg-[#1a1a1a]"}`}
    >
      <GlobalLoader loaderText={"Uploading"} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={110}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className={`${isDarkMode ? "bg-[#242424]" : "bg-[#f5f5f5]"} py-5 px-4  rounded-lg shadow  w-[90%]`}
      >
        <View className="gap-6 pb-14">
          <Text className={`text-center ${isDarkMode && "text-[#f5f5f5]"}`}>
            Please provide details so others can help.
          </Text>
          <View className="gap-2">
            <View className="flex-row gap-4">
              <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>Type</Text>

              {postType.map((r) => (
                <View className="  items-center" key={r.id}>
                  <TouchableOpacity
                    className="flex-row gap-2"
                    onPress={() =>
                      setFormData({
                        ...formData,
                        type: formData.type === r.label ? "" : r.label,
                      })
                    }
                  >
                    <Checkbox
                      style={{ width: 18, height: 18 }}
                      value={formData.type === r.label}
                      color={isDarkMode ? "#bbb" : "black"}
                    />
                    <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>
                      {r.sign} {r.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {errors.type && <Text className="text-red-600">{errors.type}</Text>}
          </View>

          <View className="gap-2">
            <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>Title</Text>
            <TextInput
              placeholder="Item title.."
              className={`border ${isDarkMode ? "border-[#f5f5f5]/40 text-[#f5f5f5]  placeholder:text-[#f5f5f5]/50 " : "border-black/40"}  rounded-3xl px-4`}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
            {errors?.title && (
              <Text className="text-red-600">{errors.title}</Text>
            )}
          </View>
          <View className="gap-2">
            <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>
              Category
            </Text>
            <SelectList
              setSelected={(val: string) =>
                setFormData({
                  ...formData,
                  category: val as unknown as postCategories,
                })
              }
              data={Category}
              defaultOption={{
                key: formData.category,
                value: formData.category,
              }}
              save="value"
              notFoundText="Not found"
              placeholder="Select Category"
              boxStyles={{
                borderRadius: 24,
              }}
              arrowicon={
                <FontAwesome
                  name="chevron-down"
                  size={16}
                  color={isDarkMode ? "#f5f5f5" : "black"}
                />
              }
              searchicon={
                <FontAwesome
                  name="search"
                  size={16}
                  color={isDarkMode ? "#f5f5f5" : "black"}
                />
              }
              closeicon={
                <FontAwesome
                  name="close"
                  size={16}
                  color={isDarkMode ? "#f5f5f5" : "black"}
                />
              }
              searchPlaceholder=""
              inputStyles={{
                color: isDarkMode ? "silver" : "black",
                paddingLeft: 4,
              }}
              dropdownTextStyles={{ color: isDarkMode ? "#f5f5f5" : "black" }}
            />
            {errors?.category && (
              <Text className="text-red-600">{errors.category}</Text>
            )}
          </View>

          <View className="gap-2">
            <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>
              {formData.type} Location
            </Text>
            <TextInput
              placeholder={`Item ${formData.type ? formData.type.toLowerCase() + " location" : "location"}`}
              className={`border ${isDarkMode ? "border-[#f5f5f5]/40  placeholder:text-[#f5f5f5]/50 text-[#f5f5f5]" : "border-black/40"}  rounded-3xl px-4`}
              value={formData.location}
              onChangeText={(text) =>
                setFormData({ ...formData, location: text })
              }
            />
            {errors?.location && (
              <Text className="text-red-600">{errors.location}</Text>
            )}
          </View>
          <View className="gap-2 ">
            <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>
              {formData.type} Date
            </Text>
            <View
              className={`border ${isDarkMode ? "border-[#f5f5f5]/40  placeholder:text-[#f5f5f5]/50 text-[#f5f5f5]" : "border-black/40"}  rounded-3xl px-4`}
            >
              <TextInput
                className={`w-[80%] ${isDarkMode && "text-[#f5f5f5]"}`}
                value={formData?.date?.toDateString()}
                editable={false}
              />
              <Fontisto
                name="date"
                size={24}
                className="absolute right-2 top-2"
                color="gray"
                onPress={() => setShowDatePicker(true)}
              />
            </View>
            {showDatePicker && (
              <DatePicker
                value={formData.date}
                display="spinner"
                className="text-[#f5f5f5]"
                onChange={(evt, selDate) => {
                  setShowDatePicker(false);
                  if (selDate) setFormData({ ...formData, date: selDate });
                }}
              />
            )}
          </View>

          <View className="gap-2">
            <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>
              Description
            </Text>
            <TextInput
              placeholder="Description.."
              className={`border ${isDarkMode ? "border-[#f5f5f5]/40  placeholder:text-[#f5f5f5]/50 text-[#f5f5f5]" : "border-black/40"} rounded-3xl px-4  min-h-[100px]`}
              multiline={true}
              textAlignVertical="top"
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
            />
            {errors?.description && (
              <Text className="text-red-600">{errors.description}</Text>
            )}
          </View>

          <View className="gap-2 w-full">
            <ImagePickerModal
              visible={isModalOpen}
              selectionLimit={4}
              onClose={() => setIsModalOpen(false)}
              setImages={(images) => setFormData({ ...formData, images })}
              images={formData.images}
            />
            <DisplayImages
              images={formData.images!}
              setImages={(images) => setFormData({ ...formData, images })}
            />
            <UploadImgBtn
              images={formData.images!}
              setIsModalOpen={setIsModalOpen}
            />
          </View>

          <View className="flex-row gap-6">
            <TouchableOpacity
              className={`border ${isDarkMode ? "border-[#f5f5f5]/40  placeholder:text-[#f5f5f5]/50 text-[#f5f5f5]" : "border-black/40"} rounded p-2 w-32`}
              onPress={() => router.back()}
            >
              <Text
                className={`text-center text-[16px] ${isDarkMode && "text-[#f5f5f5]"}`}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#1976D2] p-2 rounded w-[120px]"
              onPress={handleSubmit}
            >
              <Text className="text-[#f5f5f5] text-[16px] text-center">
                {isEditPost ? "Update" : "Submit"} Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
