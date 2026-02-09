export type ImgType = {
      uri?: string;
      mimeType?: string;
      fileName?: string;
      publicId?:string;
    };

   

export type ImagePickerPropTypes = {
  image?: string;
  setImage?: (value: string | null) => void;
};

export type ImagePickerTypes = {
  visible?: boolean;
  onClose?: () => void;
  selectionLimit: number;
  setImages?: React.Dispatch<React.SetStateAction<ImgType[]>>;
  setImage?: React.Dispatch<React.SetStateAction<ImgType>>;
  singleImage?: boolean;
  images?: ImgType[];
  isSignUp?: boolean;
};

export type UploadImgBtnProp = {
  images: ImgType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type displayImageProps = {
  images: ImgType[];
  setImages: React.Dispatch<React.SetStateAction<ImgType[]>>;
};
