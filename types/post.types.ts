import { ImgType } from "./image";

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
    }
};

export interface PostStoreType {
  allPosts: PostType[];
  setAllPosts: (data: PostType[]) => void;
  isEditPost: boolean,
  TrueEditPost(): void;
  FalseEditPost(): void;
  addNewPost: (data: PostType) => void

}







