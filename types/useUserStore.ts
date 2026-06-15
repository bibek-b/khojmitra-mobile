export interface UseUserStoreType {
    userId: string,
    fullname: string,
    email: string,
    avatar: string,
    setUser: (value: Partial<UseUserStoreType>) => void;
}