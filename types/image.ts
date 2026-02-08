export type LocalImgType = {
      uri?: string;
      mimeType?: string;
      fileName?: string;
    };

    export interface ServerImgType {
      url?: string;
    }

export type ImagePickerPropTypes = {
  image?: string;
  setImage?: (value: string | null) => void;
};

export type ImagePickerTypes = {
  visible?: boolean;
  onClose?: () => void;
  selectionLimit: number;
  setImages?: React.Dispatch<React.SetStateAction<LocalImgType[]>>;
  setImage?: React.Dispatch<React.SetStateAction<LocalImgType>>;
  singleImage?: boolean;
  images?: LocalImgType[];
  isSignUp?: boolean;
};

export type UploadImgBtnProp = {
  images: LocalImgType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type displayImageProps = {
  images: LocalImgType[];
  setImages: React.Dispatch<React.SetStateAction<LocalImgType[]>>;
};
