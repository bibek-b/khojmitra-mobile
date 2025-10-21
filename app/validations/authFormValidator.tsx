import { AuthSubmitFormPropTypes } from "@/types/common";
 const AuthFormValidator = ({
  fullName,
  email,
  password,
  confirmPassword,
  image,
}: AuthSubmitFormPropTypes) => {
  if (!fullName || !email || !password || !confirmPassword) {
    return { valid: false, message: "Please fill all the fields!" };
  }
  if (!image) {
    return { valid: false, message: "Please select an profile image." };
  }
  if (fullName?.trim().length < 5) {
    return { valid: false, message: "Full Name must be 5 chars or greater!" };
  }
  if (password.trim().length < 8 || confirmPassword.trim().length < 8) {
    return { valid: false, message: "Passwords must be 5 chars or greater!" };
  }
  

  if (password.trim() !== confirmPassword.trim()) {
    return { valid: false, message: "Passwords do not match!" };
  }

  if(!email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,4}/)){
    return { valid: false, message:"Invalid email."}
  }
};


export default AuthFormValidator;
