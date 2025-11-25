import Form from "@/components/Form";
import { authTypes } from "@/types/api/auth.types";
import { AuthSubmitFormPropTypes } from "@/types/common";
import { useContext, useState } from "react";
import { validateSignin } from "../validations/authFormValidator";
import { NotificationContext } from "@/context/NotificationContext";
import { authApi } from "@/api/authApi";
import { useRouter } from "expo-router";
import { setItem } from "@/utils/AsyncStorage";

export default function SignInScreen() {
  const { showNotification } = useContext(NotificationContext);
  const [errors, setErrors] = useState<AuthSubmitFormPropTypes>({});
  const router = useRouter();

  const handleSubmit = async ({ email, password }: authTypes) => {
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
      showNotification?.({
        type: "error",
        message:
          error?.response?.data.message ||
          error?.data.message ||
          "Something went wrong. please try again",
      });
    }
  };
  return (
    <Form
      title="Sign In"
      onSubmit={handleSubmit}
      errors={errors}
      isSignIn={true}
    />
  );
}
