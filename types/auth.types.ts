import { ImgType } from "./image";



//here marking all ? - cause for error state we're using this type so
export type AuthFormPayloadType = {
  email?: string;
  password?: string;
  fullname?: string;
  confirmPassword?: string;
  avatar?: ImgType
};

export type AuthSubmitTypes = {
  title: string;
  onSubmit: (props: AuthFormPayloadType) => void;
  isSignIn?: boolean;
  errors?: AuthFormPayloadType;
};