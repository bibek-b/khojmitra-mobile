import { useContext, useState } from "react";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { authApi } from "@/api/authApi";
import { validateSignup } from "../validations/authFormValidator";
import { useRouter } from "expo-router";
import { useLoaderStore } from "@/store/useLoaderStore";
import { AuthFormPayloadType } from "@/types/auth.types";
import AuthForm from "@/components/AuthForm";
import { setItem } from "@/utils/AsyncStorage";

export default function SignUpScreen() {
  const { showPopupNotification } = useContext(PopupNotificationContext);
  const { showLoading, hideLoading } = useLoaderStore();
  const [errors, setErrors] = useState<AuthFormPayloadType>({});
  const router = useRouter();

  const handleSubmit = async ({
    fullname,
    email,
    password,
    confirmPassword,
    avatar,
  }: AuthFormPayloadType) => {
    const isValid = validateSignup(
      { fullname, email, password, confirmPassword },
      setErrors
    );

    console.log(avatar)
    if (!isValid) return;
    const fd = new FormData();
    if (avatar) {
      const isObject = typeof avatar === "object";
      fd.append("userAvatarImages", {
        uri: isObject && avatar.uri,
        type: isObject && avatar.mimeType || "image/jpeg",
        name: isObject && avatar.fileName || "avatar.jpg",
      } as any);
    }
    fd.append("fullname", fullname || "");
    fd.append("email", email || "");
    fd.append("password", password || "");
    fd.append("confirmPassword", confirmPassword || "");
    try {
      showLoading('SignUp');
      const res = await authApi.signUp(fd);
        setItem("user", res?.data.user);
            setItem("access_token", res?.data.accessToken);
      showPopupNotification?.({ type: "success", message: res.data.message });
      router.navigate('/');
    } catch (error: any) {
      console.log({error})
      showPopupNotification?.({
        type: "error",
        message: error?.response?.data.message || "Oops! something went wrong. Please try again"
      });
    } finally {
      hideLoading()
    }
  };
  return <AuthForm title="Sign Up" onSubmit={handleSubmit} errors={errors} />;
}
