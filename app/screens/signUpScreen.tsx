import Form from "@/components/Form";
import { useContext, useState } from "react";
import { AuthSubmitFormPropTypes } from "@/types/common";
import { authTypes } from "@/types/api/auth.types";
import { NotificationContext } from "@/context/NotificationContext";
import { authApi } from "@/api/authApi";
import { validateSignup } from "../validations/authFormValidator";

export default function SignUpScreen() {
  const { showNotification } = useContext(NotificationContext);
  const [errors, setErrors] = useState<AuthSubmitFormPropTypes>({});
  const handleSubmit = async ({
    fullname,
    email,
    password,
    confirmPassword,
    avatar,
  }: authTypes) => {
    const isValid = validateSignup(
      { fullname, email, password, confirmPassword },
      setErrors
    );

    if (!isValid) return;

    const fd = new FormData();
    if (avatar) {
      fd.append("file", {
        uri: avatar,
        type: avatar.type || "image/jpeg",
        name: avatar.fileName || "avatar.jpg",
      } as any);
    }
    fd.append("fullname", fullname || "");
    fd.append("email", email || "");
    fd.append("password", password || "");
    fd.append("confirmPassword", confirmPassword || "");

    try {
      const res = await authApi.signUp(fd);
      console.log(res);
      if (res.data.success) {
        showNotification?.({ type: "success", message: res.data.message });
      } else {
        showNotification?.({ type: "error", message: res.data.message });
      }
    } catch (error: any) {
      showNotification?.({
        type: "error",
        message: error?.response?.data.message,
      });
    }
  };
  return <Form title="Sign Up" onSubmit={handleSubmit} errors={errors} />;
}
