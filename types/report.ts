import { ImgType } from "./image";
import { PostType } from "./post.types";

//setting all ? - using this type for error state also thats why
export type AddEditReportFormTypes = {
  checkedValue?: string | null;
  title?: string;
  selCategory?: string;
  location?: string;
  date?: Date;
  description?: string;
};

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

