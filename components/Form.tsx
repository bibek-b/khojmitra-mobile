import { useContext, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { AuthTypes } from "@/types/common";
import { ThemeContext } from "@/context/ThemeContext";
import ProfileImage from "./ProfileImage";

export default function Form({ title, onSubmit, errors, isSignIn }: AuthTypes) {
  const [image, setImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [confirmPassword, setConfirmPassword] = useState<string | "">("");

  const { isDarkMode } = useContext(ThemeContext);
  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"} className="flex-1 px-5 gap-4 justify-center">
      <Text className={`text-center text-4xl text-[#1976D2] font-medium`}>
        {title}
      </Text>
      <View className={` rounded-lg shadow px-4 py-10 gap-4 ${isDarkMode ? "bg-[#242424]": "bg-white"}`}>
        {!isSignIn && <ProfileImage  />}

        <View className="gap-4">
          {!isSignIn && (
            <View className="gap-2">
              <Text className={`${isDarkMode ? "text-[#f5f5f5]": "text-black"}`}>Full Name</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                className={`border border-gray-300 px-2 ${isDarkMode ? "text-[#f5f5f5] placeholder:text-[#f5f5f5]": "text-black"} rounded`}
                placeholder="Enter your full name.."
              />
              {errors?.fullName && (
                <Text className="text-red-600">{errors?.fullName}</Text>
              )}
            </View>
          )}
          <View className="gap-2">
            <Text className={`${isDarkMode ? "text-[#f5f5f5]": "text-black"}`}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className={`border border-gray-300 px-2 ${isDarkMode ? "text-[#f5f5f5] placeholder:text-[#f5f5f5]": "text-black"} rounded`}
              placeholder="Enter your email.."
            />
            {errors?.email && (
              <Text className="text-red-600">{errors?.email}</Text>
            )}
          </View>
          <View className="gap-2">
            <Text className={`${isDarkMode ? "text-[#f5f5f5]": "text-black"}`}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              className={`border border-gray-300 px-2 ${isDarkMode ? "text-[#f5f5f5] placeholder:text-[#f5f5f5]": "text-black"} rounded`}
              placeholder="Password.."
            />
            {errors?.password && (
              <Text className="text-red-600">{errors?.password}</Text>
            )}
          </View>

          {!isSignIn && (
            <View className="gap-2">
              <Text className={`${isDarkMode ? "text-[#f5f5f5]": "text-black"}`}>Confirm Password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className={`border border-gray-300 px-2 ${isDarkMode ? "text-[#f5f5f5] placeholder:text-[#f5f5f5]": "text-black"} rounded`}
                placeholder="Confirm password.."
              />
            </View>
          )}
          {errors?.confirmPassword && (
            <Text className="text-red-600">{errors?.confirmPassword}</Text>
          )}
        </View>
        <TouchableOpacity
          className="bg-[#1976D2] rounded"
          onPress={() => {
            if (isSignIn) {
              onSubmit(email, password);
            } else {
              onSubmit(fullName, email, password, confirmPassword, image!);
            }
          }}
        >
          <Text className="text-center text-[#f5f5f5] py-3 text-xl">{title}</Text>
        </TouchableOpacity>
        <Text className={`${isDarkMode ? "text-[#f5f5f5]": "text-black"}`}>
          {isSignIn ? "Don't" : "Already"} have an account?{" "}
          <Link
            href={`/screens/${isSignIn ? "signUpScreen" : "signInScreen"}`}
            className={`${isDarkMode ? "text-[#1976D2]": "text-[#64b4ff]"} underline`}
          >
            Sign {isSignIn ? "Up" : "In"}
          </Link>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}