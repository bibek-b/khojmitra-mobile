import { AuthFormPayloadType } from "@/types/auth.types";

export const validateSignup = (
  { fullname, email, password, confirmPassword }: AuthFormPayloadType,
  setErrors: any
) => {
  let hasError = false;
  const newErrors: AuthFormPayloadType = {};
  if (!fullname) {
    newErrors.fullname = "Full name is required.";
    hasError = true;
  }

  if (!password) {
    newErrors.password = "Password is required.";
    hasError = true;
  }
  if (!confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required.";
    hasError = true;
  }
  if (fullname && fullname?.trim().length > 20) {
    newErrors.fullname = "Full name can be up to 20 chars or fewer.";
    hasError = true;
  }

  if (!email) {
    newErrors.email = "Email is required.";
    hasError = true;
  } else if (!email?.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,4}/)) {
    newErrors.email = "Invalid email.";
    hasError = true;
  }

  if (
    (password && password?.trim().length < 8) ||
    (confirmPassword && confirmPassword?.trim().length < 8)
  ) {
    newErrors.confirmPassword = "Passwords length must be 8 chars or greater.";
    hasError = true;
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
    hasError = true;
  }

  setErrors(newErrors);
  return !hasError;
};

export const validateSignin = (
  {  email, password }: AuthFormPayloadType,
  setErrors: any
) => {
  let hasError = false;
  const newErrors: AuthFormPayloadType = {};


  if (!password) {
    newErrors.password = "Password is required.";
    hasError = true;
  }

  if (!email) {
    newErrors.email = "Email is required.";
    hasError = true;
  } else if (!email?.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,4}/)) {
    newErrors.email = "Invalid email.";
    hasError = true;
  }

  if (
    (password && password?.trim().length < 8)) {
    newErrors.confirmPassword = "Password length must be 8 chars or greater.";
    hasError = true;
  }


  setErrors(newErrors);
  return !hasError;
};
