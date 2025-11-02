enum postCategories {
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
    _id: string;
    fullname: string;
    type: "Lost" | "Found" | "";
    title: string;
    category: postCategories;
    location: string;
    date: string;
    images?: string[];
    description: String;
    createdAt: string;
    updatedAt:string;
    userId: {
      _id: string;
      fullname: string;
    }
};

export type addPost = {
  type: string;
  title: string;
  category: string;
  location: string;
  date: Date;
  description: string;
  images: string[];
}
