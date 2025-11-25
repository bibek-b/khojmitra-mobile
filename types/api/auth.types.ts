import { imageType } from "./post.types";

export type authTypes = {
    fullname?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    avatar?: imageType
}