import { imageType } from "./image";

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
export type postType = {
    _id?: string;
    type: "Lost" | "Found" | "";
    title: string;
    category: postCategories;
    location: string;
    date: string;
    images?: imageType[];
    description: string;
    createdAt?: string;
    updatedAt?:string;
    user: {
      _id: string;
      fullname: string;
      avatar?:string;
    }
};

export interface postStore {
  allPosts: postType[],
  setAllPosts: (data: postType[]) => void;
}







