import { ReportStoreType } from "@/types/report";
import { create } from "zustand";

export const useReportStore = create<ReportStoreType>(set => ({
    reports: [],
    setReports: (data) => set({reports: data})
}))