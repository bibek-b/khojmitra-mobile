import React from "react";
import { Animated } from "react-native";

export type AnimatedStyleProp = Animated.AnimatedInterpolation<string | number>;

export type HeaderAnimationPropsType = {
  searchWidth?: AnimatedStyleProp;
  logoAnim?: AnimatedStyleProp;
  showSearchBar?: boolean;
  setShowSearchBar?: (show: boolean) => void;
};

export type AnimateValuePropsType = {
  value: Animated.Value;
  toValue: number;
  duration: number;
  useNativeDriver: boolean;
};

export type PostType = {
  username: string;
  type: string;
  createdAt: string;
  item: string;
  category: string;
  location: string;
  date: string;
  description: string;
  images: string[];
  parent?: string;
};

export type AuthTypes = {
  title: string;
  onSubmit: (
    email: string,
    password: string,
    image?: string,
    fullName?: string,
    confirmPassword?: string
  ) => void;
  isSignIn?: boolean;
  errors?: AuthSubmitFormPropTypes;
};

export type AuthSubmitFormPropTypes = {
  email?: string;
  password?: string;
  image?: string;
  fullName?: string;
  confirmPassword?: string;
};

export type ImagePickerPropTypes = {
  image?: string;
  setImage?: (value: string | null) => void;
};

export type AddEditReportFormTypes = {
  checkedValue?: string | null;
  title?: string;
  selCategory?: string;
  location?: string;
  date?: Date;
  description?: string;
};

export type ThemeContextType = {
  isDarkMode: boolean;
};

export type PickImagesPropsType = {
  selectionLimit?: number;
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
  singleImage?: boolean;
  images: string[];
};

export type ImagePickerModalPropTypes = {
  visible: boolean;
  onClose: () => void;
  selectionLimit: number;
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
  singleImage?: boolean;
  images: string[];
};

export type UploadImgBtnProp = {
  images: string[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DisplayImagesProps = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export type NotificationType = {
  type?: "success" | "error" | "info";
  message?: string;
  visible?: boolean;
};

export type NotificationContextType = {
  notification?: NotificationType ;
  setNotification?: React.Dispatch<React.SetStateAction<NotificationType | undefined>>;
  showNotification?: ({ type, message }: NotificationPayload) => void;
  // hideNotification?: () => void;
};

export type NotificationPayload = {
  type?: "success" | "error" | "info";
  message?: string;
};

export type ProofFormContextType = {
  isFormVisible?: boolean ;
  setIsFormVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  showForm?: () => void;
  hideForm?: () => void;
};

