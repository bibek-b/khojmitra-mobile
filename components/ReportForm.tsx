import { Text, TextInput, TouchableOpacity, View } from "react-native";
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
import { NotificationContext } from "@/context/NotificationContext";
import { postApi } from "@/api/postApi";
import { getItem } from "@/utils/AsyncStorage";
import { useLoaderStore } from "@/store/useLoaderStore";
import { GlobalLoader } from "./common/GlobalLoader";
import { imageType } from "@/types/image";
import { AddEditReportFormTypes, ReportFormProps } from "@/types/report";
import { usePostStore } from "@/store/usePostStore";
import { postCategories } from "@/types/post.types";

const reportType = [
  { id: 1, sign: "🔴", label: "Lost" },
  { id: 2, sign: "🟢", label: "Found" },
];

export default function ReportForm({
  isEditPost,
  idToUpdate,
}: ReportFormProps) {
  const { isDarkMode } = useContext(ThemeContext);
  const { showNotification } = useContext(NotificationContext);
  const { showLoading, hideLoading } = useLoaderStore();
  const { allPosts } = usePostStore();

  const [checkedValue, setCheckedValue] = useState<string | null>(null);
  const [selCategory, setSelCategory] = useState<postCategories | string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState<imageType[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<AddEditReportFormTypes>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (idToUpdate) {
      const post = allPosts.find((p) => p._id === idToUpdate);
      setCheckedValue(post?.type!);
      setTitle(post?.title!);
      setSelCategory(post?.category!);
      setLocation(post?.location!);
      setDate(new Date(post?.date!));
      setDescription(post?.description!);
      setImages(post?.images!);
    }
  }, [isEditPost]);

  const handleSubmit = async () => {
    const newErrors: AddEditReportFormTypes = {};

    if (!title) newErrors.title = "Please input item title.";
    if (title.trim().length > 25)
      newErrors.title = "Title can be up to 25 chars or fewer.";
    if (!selCategory) newErrors.selCategory = "Please select item category.";
    if (!checkedValue) newErrors.checkedValue = "Please select report type.";
    if (!location) newErrors.location = "Please input item location.";
    if (location.trim().length > 50)
      newErrors.location = "Location can be up to 50 chars or fewer.";
    if (!description) newErrors.description = "Please input description.";
    if (description.trim().length > 200)
      newErrors.description = "Descripton can be up to 200 chars or fewer.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    const user = await getItem("user");
    const fd = new FormData();

    fd.append("type", checkedValue!);
    fd.append("title", title!);
    fd.append("category", selCategory!);
    fd.append("location", location!);

    const numericDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    fd.append("date", numericDate);

    fd.append("description", description!);
    fd.append("user", user?._id);

    if (images.length > 0) {
      images.forEach((img, index) => {
        fd.append("postImages", {
          uri: img.uri,
          type: img.mimeType || "image/jpeg",
          name: img.fileName || `image_${Date.now()}_${index}.jpg`,
        } as any);
      });
    }

    let res;
    try {
      showLoading("reportSubmit");
      if (isEditPost) {
        res = await postApi.update(idToUpdate!, fd);
      } else {
        res = await postApi.create(fd);
      }
      showNotification?.({ type: "success", message: res.data.message });
      router.push("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Oops! Something went wrong. Please try again";
      showNotification?.({
        type: "error",
        message,
      });
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

              {reportType.map((r) => (
                <View className="  items-center" key={r.id}>
                  <TouchableOpacity
                    className="flex-row gap-2"
                    onPress={() =>
                      setCheckedValue(checkedValue === r.label ? null : r.label)
                    }
                  >
                    <Checkbox
                      style={{ width: 18, height: 18 }}
                      value={checkedValue === r.label}
                      color={isDarkMode ? "#bbb" : "black"}
                    />
                    <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>
                      {r.sign} {r.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {errors?.checkedValue && (
              <Text className="text-red-600">{errors.checkedValue}</Text>
            )}
          </View>

          <View className="gap-2">
            <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>Title</Text>
            <TextInput
              placeholder="Item title.."
              className={`border ${isDarkMode ? "border-[#f5f5f5]/40 text-[#f5f5f5]  placeholder:text-[#f5f5f5]/50 " : "border-black/40"}  rounded-3xl px-4`}
              value={title}
              onChangeText={setTitle}
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
              setSelected={(val: string) => setSelCategory(val)}
              data={Category}
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
            {errors?.selCategory && (
              <Text className="text-red-600">{errors.selCategory}</Text>
            )}
          </View>

          <View className="gap-2">
            <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>
              {checkedValue} Location
            </Text>
            <TextInput
              placeholder={`Item ${checkedValue ? checkedValue.toLowerCase() + " location" : "location"}`}
              className={`border ${isDarkMode ? "border-[#f5f5f5]/40  placeholder:text-[#f5f5f5]/50 text-[#f5f5f5]" : "border-black/40"}  rounded-3xl px-4`}
              value={location}
              onChangeText={setLocation}
            />
            {errors?.location && (
              <Text className="text-red-600">{errors.location}</Text>
            )}
          </View>
          <View className="gap-2 ">
            <Text className={`${isDarkMode && "text-[#f5f5f5]"}`}>
              {checkedValue} Date
            </Text>
            <View
              className={`border ${isDarkMode ? "border-[#f5f5f5]/40  placeholder:text-[#f5f5f5]/50 text-[#f5f5f5]" : "border-black/40"}  rounded-3xl px-4`}
            >
              <TextInput
                className={`w-[80%] ${isDarkMode && "text-[#f5f5f5]"}`}
                value={date.toDateString()}
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
                value={date}
                display="spinner"
                className="text-[#f5f5f5]"
                onChange={(evt, selDate) => {
                  setShowDatePicker(false);
                  if (selDate) setDate(selDate);
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
              value={description}
              onChangeText={setDescription}
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
              setImages={setImages}
              images={images}
            />
            <DisplayImages images={images} setImages={setImages} />
            <UploadImgBtn images={images} setIsModalOpen={setIsModalOpen} />
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
                {isEditPost ? "Save Changes" : "Submit Report"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
