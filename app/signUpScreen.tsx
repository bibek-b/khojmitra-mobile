import Form from "@/components/Form";
import { useState } from "react";
import { AuthSubmitFormPropTypes } from "@/types/common";

export default function SignUpScreen() {
  const [errors, setErrors] = useState<AuthSubmitFormPropTypes>({});
  const handleSubmit = (
    fullName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    image?: string
  ) => {
    const newErrors: AuthSubmitFormPropTypes = {};
    if (!fullName) newErrors.fullName = "Full name is required.";

    if (!password) newErrors.password = "password is required.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required.";

    if (fullName && fullName?.trim().length > 20)
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
  };
  return <Form title="Sign Up" onSubmit={handleSubmit} errors={errors} />;
}
