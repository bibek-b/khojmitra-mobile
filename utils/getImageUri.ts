import { serverUrl } from "@/env/serverUrl";

export const getImageUri = (img: any) => {
    //picked from a device
    if(typeof img === "object" && img.uri){
        return img.uri;
    }

    //Existing Image (from backend)
    if(typeof img === "string"){
        return `${serverUrl}${img}`;
    }

    return ""
}