export enum activeReportNavEnum {
myPosts ="myPosts" , 
myReports = "myReports",
}

export interface activeReportNavType {
    activeReportNav:activeReportNavEnum  
    setActiveReportNav: (value:activeReportNavEnum ) => void;
}