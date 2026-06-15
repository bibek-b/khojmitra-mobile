import { ImgType } from "./image";

export type updateFeedType = "add" | "delete" | "update";

export enum postCategories {
  "Electronics",
  "Clothes & Accessories",
  "Bags",
  "Books & Documents",
  "Jewelry",
  "Vehicles & Keys",
  "Gadgets & Accessories",
  "Household Items",
  "Personal Items",
  "Pets",
}
export interface PostType  {
    _id?: string;
    type: "Lost" | "Found" | "";
    title: string;
    category: postCategories;
    location: string;
    date: string;
    images?: ImgType[];
    description: string;
    createdAt?: string;
    updatedAt?:string;
    user: {
      _id: string;
      fullname: string;
      avatar?:string;
    },
    status: PostStatus;
};

export interface PostStoreType {
  allPosts: PostType[];
  setAllPosts: (data: PostType[]) => void;
  isEditPost: boolean,
  TrueEditPost(): void;
  FalseEditPost(): void;
  updateFeed: (data: PostType, type: updateFeedType) => void

}

export type PostStatus = "pending" | "resolved" | "unresolved";

//setting all ? - using this type for error state also thats why
export type AddEditPostFormTypes = {
  checkedValue?: string | null;
  title?: string;
  selCategory?: string;
  location?: string;
  date?: Date;
  description?: string;
};







