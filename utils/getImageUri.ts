import { ImgType } from "@/types/image";

export const getImageUri = (img: ImgType) => {
    if(typeof img === "object" && img.uri){
        return img.uri;
    }

    return ""
}