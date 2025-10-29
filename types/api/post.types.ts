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
  type: "Lost" | "Found" | "";
  title: String;
  category: postCategories;
  location: String;
  date: String;
  images?: String[];
  description: String;
};
