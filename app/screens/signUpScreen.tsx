import { useContext, useState } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { authApi } from "@/api/authApi";
import { validateSignup } from "../validations/authFormValidator";
import { useRouter } from "expo-router";
import { useLoaderStore } from "@/store/useLoaderStore";
import { AuthFormPayloadType } from "@/types/auth.types";
import AuthForm from "@/components/AuthForm";

export default function SignUpScreen() {
  const { showNotification } = useContext(NotificationContext);
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

    if (!isValid) return;

    const fd = new FormData();
    if (avatar) {
      fd.append("userAvatarImages", {
        uri: avatar.uri,
        type: avatar.mimeType || "image/jpeg",
        name: avatar.fileName || "avatar.jpg",
      } as any);
    }
    fd.append("fullname", fullname || "");
    fd.append("email", email || "");
    fd.append("password", password || "");
    fd.append("confirmPassword", confirmPassword || "");
    try {
      showLoading('SignUp');
      const res = await authApi.signUp(fd);
      showNotification?.({ type: "success", message: res.data.message });
      router.navigate('/screens/signInScreen');
    } catch (error: any) {
      console.log({error})
      showNotification?.({
        type: "error",
        message: error?.response?.data.message || "Oops! something went wrong. Please try again"
      });
    } finally {
      hideLoading()
    }
  };
  return <AuthForm title="Sign Up" onSubmit={handleSubmit} errors={errors} />;
}
