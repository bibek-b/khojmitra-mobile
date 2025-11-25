
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
    _id?: string;
    type: "Lost" | "Found" | "";
    title: string;
    category: postCategories;
    location: string;
    date: string;
    images?: string[];
    description: String;
    createdAt?: string;
    updatedAt?:string;
    user: {
      _id: string;
      fullname: string;
    }
};







