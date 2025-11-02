import Form from "@/components/Form";
import { authTypes } from "@/types/api/auth.types";
import { AuthSubmitFormPropTypes } from "@/types/common";
import { useState } from "react";

export default function SignInScreen() {
  const [errors, setErrors] = useState<AuthSubmitFormPropTypes>({});
  const handleSubmit = ({email, password}: authTypes) => {
    const newErrors: AuthSubmitFormPropTypes = {};
    if (!password) newErrors.password = "Password is required.";

    if (!email) newErrors.email = "Email is required.";
    else if (!email?.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,4}/))
      newErrors.email = "Invalid email.";

    if (password && password?.trim().length < 8) {
      newErrors.password = "Password length must be 8 chars or greater.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
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
