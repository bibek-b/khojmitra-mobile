import Form from "@/components/AuthForm";
import { useContext, useState } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { authApi } from "@/api/authApi";
import { validateSignup } from "../validations/authFormValidator";
import { useRouter } from "expo-router";
import { useLoaderStore } from "@/store/useLoaderStore";
import { AuthFormPayloadType } from "@/types/auth.types";

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
      fd.append("file", {
        uri: avatar.uri,
        type: avatar.mimeType || "image/jpeg",
        name: avatar.fileName || "avatar.jpg",
      } as any);
    }
    fd.append("fullname", fullname || "");
    fd.append("email", email || "");
    fd.append("password", password || "");
    fd.append("confirmPassword", confirmPassword || "");
console.log(fd)
    try {
      showLoading('SignUp');
      const res = await authApi.signUp(fd);
        showNotification?.({ type: "success", message: res.data.message });
      router.navigate('/screens/signInScreen');
    } catch (error: any) {
      showNotification?.({
        type: "error",
        message: error?.response?.data.message,
      });
    } finally {
      hideLoading()
    }
  };
  return <Form title="Sign Up" onSubmit={handleSubmit} errors={errors} />;
}
