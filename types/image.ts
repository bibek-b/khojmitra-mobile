export type imageType =
  | string
  | {
      uri?: string;
      mimeType?: string;
      fileName?: string;
    };

export type ImagePickerPropTypes = {
  image?: string;
  setImage?: (value: string | null) => void;
};

export type ImagePickerTypes = {
  visible?: boolean;
  onClose?: () => void;
  selectionLimit: number;
  setImages?: React.Dispatch<React.SetStateAction<imageType[]>>;
  setImage?: React.Dispatch<React.SetStateAction<imageType>>;
  singleImage?: boolean;
  images?: imageType[];
  isSignUp?: boolean;
};

export type UploadImgBtnProp = {
  images: imageType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type displayImageProps = {
  images: imageType[];
  setImages: React.Dispatch<React.SetStateAction<imageType[]>>;
};
