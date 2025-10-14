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

export type NotificationType = {
  username: string;
  message: string;
  date: string;
  type: string;
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
} 

export type AddEditReportFormTypes = {
  checkedValue?: string | null;
  title?: string;
  selCategory?: string;
  location?: string;
  date?: Date;
  description?: string;
}

export type ThemeContextType = {
  isDarkMode: boolean;

}
