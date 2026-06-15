import { useState } from "react";
import { validateSignin } from "../validations/authFormValidator";
import { authApi } from "@/api/authApi";
import { useRouter } from "expo-router";
import { setItem } from "@/utils/AsyncStorage";
import { AuthFormPayloadType } from "@/types/auth.types";
import AuthForm from "@/components/AuthForm";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useToast } from "react-native-toast-notifications";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Keyboard } from "react-native";
import { useUserStore } from "@/store/useUserStore";

export default function SignInScreen() {
  const [errors, setErrors] = useState<AuthFormPayloadType>({});
  const { showLoading, hideLoading } = useLoaderStore();
  const { setUser } = useUserStore();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async ({ email, password }: AuthFormPayloadType) => {
    Keyboard.dismiss();
    const isValid = validateSignin({ email, password }, setErrors);

    if (!isValid) return;

    try {
      showLoading("signIn");
      const res = await authApi.signIn({ email, password });
      const userData = res?.data.user;
      setItem("user", userData);
      setItem("access_token", res?.data.accessToken);

      setUser(userData);
      toast.show("Sign in successful", {
        type: "success",
      });

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
  return (
    <AuthForm
      title="Sign In"
      onSubmit={handleSubmit}
      errors={errors}
      isSignIn={true}
    />
  );
}
