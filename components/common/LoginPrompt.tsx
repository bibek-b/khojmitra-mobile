import { LoginPromptPropsType } from "@/types/loginPrompt";
import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";

const LoginPrompt = ({screen}: LoginPromptPropsType) => {
  return (
    <Text className="dark:text-white absolute top-96 left-24 text-lg">
      <Link href={"/screens/signInScreen"} className="text-blue-500">
        Sign in
      </Link>{" "}
      to view your {screen}
    </Text>
  );
};

export default LoginPrompt;
