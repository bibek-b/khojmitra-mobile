import { useContext, useState } from "react";
import { validateSignin } from "../validations/authFormValidator";
import { NotificationContext } from "@/context/NotificationContext";
import { authApi } from "@/api/authApi";
import { useRouter } from "expo-router";
import { setItem } from "@/utils/AsyncStorage";
import { AuthFormPayloadType } from "@/types/auth.types";
import AuthForm from "@/components/AuthForm";

export default function SignInScreen() {
  const { showNotification } = useContext(NotificationContext);
  const [errors, setErrors] = useState<AuthFormPayloadType>({});
  const router = useRouter();

  const handleSubmit = async ({ email, password }: AuthFormPayloadType) => {
    const isValid = validateSignin({ email, password }, setErrors);
    if (!isValid) return;

    try {
      const res = await authApi.signIn({ email, password });
      setItem("user", res?.data.user);
      setItem("access_token", res?.data.accessToken);

      showNotification?.({
        type: "success",
        message: "Sign in successful",
      });
      router.navigate("/");
    } catch (error: any) {
      console.log(error)
      showNotification?.({
        type: "error",
        message:
          error?.response?.data.mesage ||
          "Oops! Something went wrong. please try again",
      });
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
