import Form from "@/components/Form";
import { useContext, useState } from "react";
import { AuthSubmitFormPropTypes } from "@/types/common";
import { authTypes } from "@/types/api/auth.types";
import { NotificationContext } from "@/context/NotificationContext";
import { authApi } from "@/api/authApi";

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
    const newErrors: AuthSubmitFormPropTypes = {};
    if (!fullname) newErrors.fullName = "Full name is required.";

    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required.";

    if (fullname && fullname?.trim().length > 20)
      newErrors.fullName = "Full name can be up to 20 chars or fewer.";

    if (!email) newErrors.email = "Email is required.";
    else if (!email?.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,4}/))
      newErrors.email = "Invalid email.";

    if (
      (password && password?.trim().length < 8) ||
      (confirmPassword && confirmPassword?.trim().length < 8)
    ) {
      newErrors.confirmPassword =
        "Passwords length must be 8 chars or greater.";
    }

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log({avatar})
    const fd = new FormData();
    if(avatar){
      fd.append("file", {
        uri: avatar,
        type: avatar.type || "image/jpeg",
        name: avatar.fileName || "avatar.jpg"
      } as any)
    }
    fd.append("fullname", fullname || "");
    fd.append("email", email || "");
    fd.append("password", password || "");
    fd.append("confirmPassword", confirmPassword || "");
  

    try {
      const res = await authApi.signUp(fd);
      console.log(res.data)
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
