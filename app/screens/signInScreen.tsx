import Form from "@/components/Form";
import { authTypes } from "@/types/api/auth.types";
import { AuthSubmitFormPropTypes } from "@/types/common";
import { useState } from "react";
import { validateSignin } from "../validations/authFormValidator";

export default function SignInScreen() {
  const [errors, setErrors] = useState<AuthSubmitFormPropTypes>({});
  const handleSubmit = ({email, password}: authTypes) => {
    const isValid = validateSignin({email, password}, setErrors);
    if(!isValid) return;
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
