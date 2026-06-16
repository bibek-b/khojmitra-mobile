import { useState } from "react";
import { authApi } from "@/api/authApi";
import { validateSignup } from "../validations/authFormValidator";
import { useRouter } from "expo-router";
import { useLoaderStore } from "@/store/useLoaderStore";
import { AuthFormPayloadType } from "@/types/auth.types";
import AuthForm from "@/components/AuthForm";
import { setItem } from "@/utils/AsyncStorage";
import registerForPushNotifications from "@/utils/registerForPushNotifications";
import { notificationApi } from "@/api/notificationApi";
import { useToast } from "react-native-toast-notifications";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Keyboard } from "react-native";

export default function SignUpScreen() {
  const { showLoading, hideLoading } = useLoaderStore();
  const [errors, setErrors] = useState<AuthFormPayloadType>({});
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async ({
    fullname,
    email,
    password,
    confirmPassword,
    avatar,
  }: AuthFormPayloadType) => {
    Keyboard.dismiss();
    const isValid = validateSignup(
      { fullname, email, password, confirmPassword },
      setErrors,
    );

    if (!isValid) return;
    const fd = new FormData();
    if (avatar) {
      const isObject = typeof avatar === "object";
      fd.append("userAvatarImg", {
        uri: isObject && avatar.uri,
        type: (isObject && avatar.mimeType) || "image/jpeg",
        name: (isObject && avatar.fileName) || "avatar.jpg",
      } as any);
    }
    fd.append("fullname", fullname || "");
    fd.append("email", email || "");
    fd.append("password", password || "");
    fd.append("confirmPassword", confirmPassword || "");
    try {
      showLoading("SignUp");
      const token = await registerForPushNotifications();

      const res = await authApi.signUp(fd);
      await notificationApi.sendPushToken(res.data.user._id, token!);
      setItem("access_token", res?.data.accessToken);

      router.navigate("/");
    } catch (error: any) {
      const message = getErrorMessage(error);
      toast.show(message, {
        type: "danger",
      });
    } finally {
      hideLoading();
    }
  };
  return <AuthForm title="Sign Up" onSubmit={handleSubmit} errors={errors} />;
}
