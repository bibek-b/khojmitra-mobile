export type authTypes = {
    fullname?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    avatar?: {
        uri: string,
        type: string;
        fileName: string;
    };
}