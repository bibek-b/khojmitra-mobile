import { useContext, useState } from "react";
import { validateSignin } from "../validations/authFormValidator";
import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { authApi } from "@/api/authApi";
import { useRouter } from "expo-router";
import { setItem } from "@/utils/AsyncStorage";
import { AuthFormPayloadType } from "@/types/auth.types";
import AuthForm from "@/components/AuthForm";
import { useLoaderStore } from "@/store/useLoaderStore";
import registerForPushNotifications from "@/utils/registerForPushNotifications";

export default function SignInScreen() {
  const { showPopupNotification } = useContext(PopupNotificationContext);
  const [errors, setErrors] = useState<AuthFormPayloadType>({});
  const { showLoading, hideLoading } = useLoaderStore();
  const router = useRouter();

  const handleSubmit = async ({ email, password }: AuthFormPayloadType) => {
    const isValid = validateSignin({ email, password }, setErrors);
    if (!isValid) return;

    try {
      showLoading("signIn");
      const res = await authApi.signIn({ email, password });
      setItem("user", res?.data.user);
      setItem("access_token", res?.data.accessToken);

      const token = await registerForPushNotifications();

      showPopupNotification?.({
        type: "success",
        message: "Sign in successful",
      });

      router.navigate("/");
    } catch (error: any) {
      console.log({ error });
      showPopupNotification?.({
        type: "error",
        message:
          error?.response?.data?.message ||
          "Oops! Something went wrong. please try again",
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
