import { ImgType } from "./image";
import { PostType } from "./post.types";



export interface ReportType {
  _id: string,
  claimType: "Owner" | "Founder",
  post: PostType,
  description?: string,
  images: ImgType[],
  status: string,
  createdAt?:string,
  updatedAt?:string,
}


export interface ReportStoreType {
  reports: ReportType[],
  setReports: (value: ReportType[]) => void;
}

